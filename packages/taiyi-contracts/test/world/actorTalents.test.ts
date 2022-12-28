import chai from 'chai';
import asPromised from 'chai-as-promised';
import '@openzeppelin/hardhat-upgrades';
import { ethers, upgrades  } from 'hardhat';
import { BigNumber, BigNumber as EthersBN, constants } from 'ethers';
import { solidity } from 'ethereum-waffle';
import {
    WorldConstants, WorldContractRoute, WorldContractRoute__factory, Actors, ShejiTu, ShejiTu__factory, 
    ActorAttributes, SifusToken, SifusDescriptor__factory, WorldEvents, WorldZones, WorldYemings, 
    WorldRandom, ActorLocations, ActorTalents, Trigrams, ActorNames, AssetDaoli, ShejiTuProxy,
} from '../../typechain';
import {
    blockNumber,
    blockTimestamp,
    deploySifusToken,
    populateDescriptor,
} from '../utils';
import {
    deployWorldConstants,
    deployWorldContractRoute,
    deployActors,
    deployWorldRandom,
    deployActorAttributes,
    deployAssetDaoli,
    deployShejiTu,
    deployWorldEvents,
    deployActorLocations,
    deployWorldZones,
    deployWorldYemings,
    deployActorTalents,
    deployTrigrams,
    deployActorNames
} from '../../utils';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

chai.use(asPromised);
chai.use(solidity);
const { expect } = chai;

const OneAgeVSecond : number = 1;

describe('角色天赋测试', () => {

    let deployer: SignerWithAddress;
    let taiyiDAO: SignerWithAddress;
    let operator1: SignerWithAddress;
    let operator2: SignerWithAddress;
    let snapshotId: number;

    let sifusToken: SifusToken;

    let worldConstants: WorldConstants;
    let worldContractRoute: WorldContractRoute;
    let actors: Actors;
    let worldRandom: WorldRandom;
    let worldYemings: WorldYemings;
    let worldEvents: WorldEvents;
    let assetDaoli: AssetDaoli;
    let shejiTu: ShejiTu; //proxy
    let shejiTuImpl: ShejiTu;
    let actorAttributes: ActorAttributes;
    let worldZones: WorldZones;
    let actorLocations: ActorLocations;
    let actorTalents: ActorTalents;
    let trigrams: Trigrams;
    let names: ActorNames;

    let actorPanGu: BigNumber;
    let testActor: BigNumber;
    
    const FAKE_MODULE_EVENTS = 101;
    const FAKE_MODULE_TIMELINE = 102;
    const FAKE_MODULE_TALENTS = 103;

    let newActor = async (toWho: SignerWithAddress, randomName?:boolean):Promise<BigNumber> => {
        //deal coin
        await assetDaoli.connect(taiyiDAO).claim(actorPanGu, actorPanGu, BigInt(1000e18));
        await assetDaoli.connect(taiyiDAO).withdraw(actorPanGu, actorPanGu, BigInt(1000e18));
        await assetDaoli.connect(taiyiDAO).approve(actors.address, BigInt(1000e18));
        let _actor = await actors.nextActor();
        await actors.connect(taiyiDAO).mintActor(BigInt(100e18));

        if(randomName) {
            let firstName = `小拼${Math.round(Math.random()*100)}`;
            await names.connect(taiyiDAO).claim(firstName, "李", _actor);    
        }

        await actors.connect(taiyiDAO).approve(shejiTu.address, _actor);
        await shejiTu.connect(taiyiDAO).bornActor(_actor);

        if(toWho.address != taiyiDAO.address)
            await actors.connect(taiyiDAO).transferFrom(taiyiDAO.address, toWho.address, _actor);
        return _actor;
    }

    let parseActorURI = async (actor: BigNumber) => {
        let uri = await actors.tokenURI(actor);
        let uriDecode = Buffer.from(uri.substring(29), 'base64').toString('utf-8');
        //console.log(uriDecode);
        return JSON.parse(uriDecode);
    };

    async function reset() {
        if (snapshotId) {
            await ethers.provider.send('evm_revert', [snapshotId]);
            snapshotId = await ethers.provider.send('evm_snapshot', []);
            return;
        }    
        snapshotId = await ethers.provider.send('evm_snapshot', []);
    }

    before(async () => {
        [deployer, taiyiDAO, operator1, operator2] = await ethers.getSigners();

        //Deploy Constants
        worldConstants = await deployWorldConstants(deployer);

        //Deploy WorldContractRoute
        worldContractRoute = await deployWorldContractRoute(deployer);

        //Deploy Taiyi Daoli ERC20
        assetDaoli = await deployAssetDaoli(worldConstants, worldContractRoute, deployer);

        //Deploy Actors
        const timestamp = await blockTimestamp(BigNumber.from(await blockNumber()).toHexString().replace("0x0", "0x"));
        actors = await deployActors(taiyiDAO.address, timestamp, assetDaoli.address, worldContractRoute, deployer);
        await worldContractRoute.registerActors(actors.address);

        //PanGu should be mint at first, or you can not register any module
        actorPanGu = await worldConstants.ACTOR_PANGU();
        expect(actorPanGu).to.eq(1);
        expect(await actors.nextActor()).to.eq(actorPanGu);
        await actors.connect(taiyiDAO).mintActor(0);

        //Deploy SifusToken
        sifusToken = await deploySifusToken(worldContractRoute.address, deployer, taiyiDAO.address, deployer.address);
        const descriptor = await sifusToken.descriptor();
        await populateDescriptor(SifusDescriptor__factory.connect(descriptor, deployer));

        //Deploy ActorNames
        names = await deployActorNames(worldContractRoute, deployer);
        await worldContractRoute.connect(taiyiDAO).registerModule(await worldConstants.WORLD_MODULE_NAMES(), names.address);

        //deploy all basic modules pre shejitu
        let routeByPanGu = WorldContractRoute__factory.connect(worldContractRoute.address, taiyiDAO);
        worldRandom = await deployWorldRandom(deployer);
        await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_RANDOM(), worldRandom.address);
        worldYemings = await deployWorldYemings(taiyiDAO.address, deployer);
        await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_YEMINGS(), worldYemings.address)
        actorAttributes = await deployActorAttributes(routeByPanGu, deployer);
        await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_ATTRIBUTES(), actorAttributes.address)
        worldEvents = await deployWorldEvents(OneAgeVSecond, FAKE_MODULE_EVENTS, worldContractRoute, deployer); //moduleId for test
        await routeByPanGu.registerModule(FAKE_MODULE_EVENTS, worldEvents.address);
        actorLocations = await deployActorLocations(routeByPanGu, deployer);
        await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_ACTOR_LOCATIONS(), actorLocations.address);
        worldZones = await deployWorldZones(worldContractRoute, deployer);
        await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_ZONES(), worldZones.address);
        actorTalents = await deployActorTalents(FAKE_MODULE_TALENTS, routeByPanGu, deployer); //moduleId for test
        await routeByPanGu.registerModule(FAKE_MODULE_TALENTS, actorTalents.address);
        trigrams = await deployTrigrams(routeByPanGu, deployer);
        await routeByPanGu.registerModule(await worldConstants.WORLD_MODULE_TRIGRAMS(), trigrams.address);
            
        let shejiTuPkg = await deployShejiTu("测试", "所在时间线：测试", FAKE_MODULE_TIMELINE, actors, actorLocations, worldZones, actorAttributes,
            worldEvents, actorTalents, trigrams, worldRandom, deployer);
        shejiTu = ShejiTu__factory.connect((shejiTuPkg[0] as ShejiTuProxy).address, deployer);
        shejiTuImpl = ShejiTu__factory.connect((shejiTuPkg[2] as ShejiTu).address, deployer);
        await routeByPanGu.registerModule(FAKE_MODULE_TIMELINE, shejiTu.address);

        //set timeline YeMing
        let shejiTuOperator = await actors.nextActor();
        await actors.mintActor(0);
        await actors.approve(shejiTu.address, shejiTuOperator);
        await shejiTu.initOperator(shejiTuOperator);
        await worldYemings.connect(taiyiDAO).setYeMing(shejiTuOperator, shejiTu.address);
    
        //set PanGu as YeMing for test
        await worldYemings.connect(taiyiDAO).setYeMing(actorPanGu, taiyiDAO.address); //fake address for test

        //bind timeline to a zone
        let zoneId = await worldZones.nextZone();
        await worldZones.connect(taiyiDAO).claim(actorPanGu, "测试区域", shejiTu.address, actorPanGu);
        await shejiTu.connect(deployer).setStartZone(zoneId);

        //born PanGu
        await actors.connect(taiyiDAO).approve(shejiTu.address, actorPanGu);
        await shejiTu.connect(taiyiDAO).bornActor(actorPanGu);

        //register actors uri modules
        await actors.connect(taiyiDAO).registerURIPartModule(names.address);
        await actors.connect(taiyiDAO).registerURIPartModule(shejiTu.address);
    });

    beforeEach(async () => {
        snapshotId = await ethers.provider.send('evm_snapshot', []);
    });

    afterEach(async () => {
        await ethers.provider.send('evm_revert', [snapshotId]);
    });

    it('非盘古无权设计角色天赋', async () => {
        await expect(actorTalents.setTalent(0, "Good Man", "Born as good man", [], [])).to.be.revertedWith('only PanGu');
    });

    it('盘古设计角色天赋', async () => {
        let talentsByDAO = actorTalents.connect(taiyiDAO);
        let W_MODULE_ATTRIBUTES = await worldConstants.WORLD_MODULE_ATTRIBUTES();
        let HLH = await worldConstants.ATTR_HLH();
        await talentsByDAO.setTalent(1010, "Good Man", "Born as good man", [HLH, BigNumber.from(10)], [W_MODULE_ATTRIBUTES, 20]);

        expect(await talentsByDAO.talentNames(1010)).to.eq("Good Man");
        expect(await talentsByDAO.talentDescriptions(1010)).to.eq("Born as good man");
        expect((await talentsByDAO.talentAttributeModifiers(1010)).length).to.eq(2);
        expect((await talentsByDAO.talentAttributeModifiers(1010))[0]).to.eq(HLH);
        expect((await talentsByDAO.talentAttributeModifiers(1010))[1]).to.eq(10);
        expect(await talentsByDAO.talentAttrPointsModifiers(1010, W_MODULE_ATTRIBUTES)).to.eq(20);
    });

    it('角色天赋互斥', async () => {
        let talentsByDAO = actorTalents.connect(taiyiDAO);
        let W_MODULE_ATTRIBUTES = await worldConstants.WORLD_MODULE_ATTRIBUTES();
        let HLH = await worldConstants.ATTR_HLH();
        await expect(talentsByDAO.setTalentExclusive(1010, [1002, 1020])).to.be.revertedWith('talent have not set');

        await talentsByDAO.setTalent(1010, "Good Man", "Born as good man", [HLH, BigNumber.from(10)], [W_MODULE_ATTRIBUTES, 20]);
        await talentsByDAO.setTalentExclusive(1010, [1002, 1020]);

        expect((await talentsByDAO.talentExclusivity(1010)).length).to.eq(2);
        expect((await talentsByDAO.talentExclusivity(1010))[0]).to.eq(1002);
        expect((await talentsByDAO.talentExclusivity(1010))[1]).to.eq(1020);
    });

    it('对角色赋予天赋', async () => {
        let actor = await newActor(operator1, true);

        let talentsByDAO = actorTalents.connect(taiyiDAO);
        let W_MODULE_ATTRIBUTES = await worldConstants.WORLD_MODULE_ATTRIBUTES();
        let HLH = await worldConstants.ATTR_HLH();
        await talentsByDAO.setTalent(1010, "Good Man", "Born as good man", [HLH, BigNumber.from(10)], [W_MODULE_ATTRIBUTES, 20]);
        await talentsByDAO.setTalentExclusive(1010, [1002, 1020]);

        //should not talent actor by any one except owner or appoved.
        await expect(talentsByDAO.talentActor(actor, actor)).to.be.revertedWith('only YeMing');
        await talentsByDAO.talentActor(actorPanGu, actor);
        let actTlts = await actorTalents.actorTalents(actor);
        if(actTlts.length >= 1) {
            expect(actTlts[0]).to.eq(1010);
            expect(await actorTalents.actorAttributePointBuy(actor, W_MODULE_ATTRIBUTES)).to.be.eq(120);
        }
        else {
            expect(await actorTalents.actorAttributePointBuy(actor, W_MODULE_ATTRIBUTES)).to.be.eq(100);
        }
    });
});