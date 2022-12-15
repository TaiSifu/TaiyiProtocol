import chai from 'chai';
import asPromised from 'chai-as-promised';
import '@openzeppelin/hardhat-upgrades';
import { ethers, upgrades  } from 'hardhat';
import { BigNumber, BigNumber as EthersBN, constants } from 'ethers';
import { solidity } from 'ethereum-waffle';
import {
    WorldConstants, WorldContractRoute, WorldContractRoute__factory, Actors, ShejiTu, ActorAttributes, SifusToken, 
    WorldEvents, WorldFungible, ActorNames, ActorTalents, ActorSocialIdentity, WorldZones, Actors__factory, 
    ActorNames__factory, WorldConstants__factory, WorldFungible__factory, SifusToken__factory, ShejiTu__factory,
    WorldZones__factory, ActorAttributes__factory, ActorSocialIdentity__factory, WorldYemings, WorldYemings__factory, 
    WorldRandom, WorldRandom__factory, ActorLocations, ActorLocations__factory, Trigrams, Trigrams__factory,
} from '../../typechain';
import {
    blockNumber,
    blockTimestamp,
} from '../utils';
import {
    TaiyiContractName,
    WorldContract,
    deployTaiyiWorld,
    deployShejiTu,
    deployWorldEvents,
    deployActorTalents,
} from '../../utils';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

chai.use(asPromised);
chai.use(solidity);
const { expect } = chai;

const OneAgeVSecond : number = 1;

describe('角色属性测试', () => {

    let deployer: SignerWithAddress;
    let taiyiDAO: SignerWithAddress;
    let operator1: SignerWithAddress;
    let operator2: SignerWithAddress;
    let snapshotId: number;

    let contracts: Record<TaiyiContractName, WorldContract>;

    let worldConstants: WorldConstants;

    let worldContractRoute: WorldContractRoute;
    let sifusToken: SifusToken;
    let actors: Actors;
    let names: ActorNames;
    let actorTalents: ActorTalents;
    let shejiTu: ShejiTu;
    let shejiTuImpl: ShejiTu;
    let actorSIDs: ActorSocialIdentity;
    let assetDaoli: WorldFungible;
    let worldZones: WorldZones;
    let actorAttributes: ActorAttributes;
    let worldEvents: WorldEvents;
    let worldYemings: WorldYemings;
    let worldRandom: WorldRandom;
    let actorLocations: ActorLocations;
    let trigrams: Trigrams;

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

        //Deploy world
        const timestamp = await blockTimestamp(BigNumber.from(await blockNumber()).toHexString().replace("0x0", "0x"));
        contracts = await deployTaiyiWorld(timestamp, deployer, taiyiDAO, false);

        sifusToken = SifusToken__factory.connect(contracts.SifusToken.instance.address, operator1);
        worldConstants = WorldConstants__factory.connect(contracts.WorldConstants.instance.address, operator1);
        worldContractRoute = WorldContractRoute__factory.connect(contracts.WorldContractRoute.instance.address, operator1);
        actors = Actors__factory.connect(contracts.Actors.instance.address, operator1);
        assetDaoli = WorldFungible__factory.connect(contracts.AssetDaoli.instance.address, operator1);
        names = ActorNames__factory.connect(contracts.ActorNames.instance.address, operator1);
        worldZones = WorldZones__factory.connect(contracts.WorldZones.instance.address, operator1);
        worldYemings = WorldYemings__factory.connect(contracts.WorldYemings.instance.address, operator1);
        actorAttributes = ActorAttributes__factory.connect(contracts.ActorAttributes.instance.address, operator1);
        actorSIDs = ActorSocialIdentity__factory.connect(contracts.ActorSocialIdentity.instance.address, operator1);
        worldRandom = WorldRandom__factory.connect(contracts.WorldRandom.instance.address, operator1);
        actorLocations = ActorLocations__factory.connect(contracts.ActorLocations.instance.address, operator1);
        trigrams = Trigrams__factory.connect(contracts.Trigrams.instance.address, operator1);

        //deploy all basic modules pre shejitu
        let routeByPanGu = WorldContractRoute__factory.connect(worldContractRoute.address, taiyiDAO);
        worldEvents = await deployWorldEvents(OneAgeVSecond, FAKE_MODULE_EVENTS, worldContractRoute, deployer); //moduleId for test
        await routeByPanGu.registerModule(FAKE_MODULE_EVENTS, worldEvents.address);
        actorTalents = await deployActorTalents(FAKE_MODULE_TALENTS, routeByPanGu, deployer); //moduleId for test
        await routeByPanGu.registerModule(FAKE_MODULE_TALENTS, actorTalents.address);
            
        let shejiTuPkg = await deployShejiTu("测试", "所在时间线：测试", FAKE_MODULE_TIMELINE, actors, actorLocations, worldZones, actorAttributes,
            worldEvents, actorTalents, trigrams, worldRandom, deployer);
        shejiTu = ShejiTu__factory.connect(shejiTuPkg[0].address, deployer);
        shejiTuImpl = ShejiTu__factory.connect(shejiTuPkg[2].address, deployer);
        await routeByPanGu.registerModule(FAKE_MODULE_TIMELINE, shejiTu.address);

        //set timeline YeMing
        let shejiTuOperator = await actors.nextActor();
        await actors.connect(deployer).mintActor(0);
        await actors.connect(deployer).approve(shejiTu.address, shejiTuOperator);
        await shejiTu.connect(deployer).initOperator(shejiTuOperator);
        await worldYemings.connect(taiyiDAO).setYeMing(shejiTuOperator, shejiTu.address);
    
        //set PanGu as YeMing for test
        actorPanGu = await worldConstants.ACTOR_PANGU();
        await worldYemings.connect(taiyiDAO).setYeMing(actorPanGu, taiyiDAO.address); //fake address for test

        //bind timeline to a zone
        let zoneId = await worldZones.nextZone();
        await worldZones.connect(taiyiDAO).claim(actorPanGu, "测试区域", shejiTu.address, actorPanGu);
        await shejiTu.connect(deployer).setStartZone(zoneId);

        testActor = await newActor(operator1);
    });

    beforeEach(async () => {
        snapshotId = await ethers.provider.send('evm_snapshot', []);
    });

    afterEach(async () => {
        await ethers.provider.send('evm_revert', [snapshotId]);
    });

    it('基础属性集', async () => {
        let HLH = await worldConstants.ATTR_HLH();

        //should not point
        await expect(actorAttributes.connect(taiyiDAO).pointActor(testActor)).to.be.revertedWith('not approved or owner of actor');

        expect((await actorAttributes.connect(operator1).pointActor(testActor)).wait()).eventually.fulfilled;
        let _hlh = await actorAttributes.attributesScores(HLH, testActor);
        expect(_hlh).to.be.equal(100);
    });
});