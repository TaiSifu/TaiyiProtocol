import chai from 'chai';
import asPromised from 'chai-as-promised';
import '@openzeppelin/hardhat-upgrades';
import { ethers, upgrades  } from 'hardhat';
import { BigNumber, BigNumber as EthersBN, constants } from 'ethers';
import { solidity } from 'ethereum-waffle';
import {
    WorldConstants, ActorAttributesConstants,
    WorldContractRoute, WorldContractRoute__factory, 
    Actors, ShejiTu, ActorAttributes, SifusToken, WorldEvents, WorldFungible, ActorNames, ActorTalents, ActorSocialIdentity, 
    WorldZones, ActorCharmAttributes, ActorBehaviorAttributes, ActorCoreAttributes, ActorMoodAttributes, ActorRelationship, 
    Actors__factory, ActorNames__factory, ActorTalents__factory, WorldConstants__factory, WorldFungible__factory, 
    SifusToken__factory, WorldEvents__factory, ShejiTu__factory, WorldZones__factory, ActorAttributesConstants__factory, 
    ActorAttributes__factory, ActorCharmAttributes__factory, ActorBehaviorAttributes__factory, ActorCoreAttributes__factory, 
    ActorMoodAttributes__factory, ActorSocialIdentity__factory, ActorRelationship__factory, ActorCharmAttributesConstants, 
    ActorCoreAttributesConstants, ActorMoodAttributesConstants, ActorBehaviorAttributesConstants, ActorCharmAttributesConstants__factory, 
    ActorCoreAttributesConstants__factory, ActorMoodAttributesConstants__factory, ActorBehaviorAttributesConstants__factory, 
    ActorLocations, WorldItems, WorldBuildings, ActorLocations__factory, WorldItems__factory, WorldBuildings__factory, 
} from '../../typechain';
import {
    blockNumber,
    blockTimestamp,
    deploySifusToken,
    populateDescriptor,
} from '../utils';
import {
    WorldContractName,
    WorldContract,
    deployTaiyiWorld
} from '../../utils';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

chai.use(asPromised);
chai.use(solidity);
const { expect } = chai;

const OneAgeVSecond : number = 1;
const ActRecoverTimeDay: number = 60;
const ZoneResourceGrowTimeDay: number = 60;
const ZoneResourceGrowQuantityScale: number = 10*1000; //10.0f

describe('角色天赋测试', () => {

    let deployer: SignerWithAddress;
    let taiyiDAO: SignerWithAddress;
    let operator1: SignerWithAddress;
    let operator2: SignerWithAddress;
    let snapshotId: number;

    let contracts: Record<WorldContractName, WorldContract>;
    let eventProcessorAddressBook: {[index: string]:any};

    let worldConstants: WorldConstants;
    let actorAttributesConstants: ActorAttributesConstants;
    let actorCharmAttributesConstants: ActorCharmAttributesConstants;
    let actorCoreAttributesConstants: ActorCoreAttributesConstants;
    let actorMoodAttributesConstants: ActorMoodAttributesConstants;
    let actorBehaviorAttributesConstants: ActorBehaviorAttributesConstants;

    let worldContractRoute: WorldContractRoute;
    let sifusToken: SifusToken;
    let actors: Actors;
    let names: ActorNames;
    let talents: ActorTalents;
    let shejiTu: ShejiTu;
    let actorSIDs: ActorSocialIdentity;
    let assetDaoli: WorldFungible;
    let golds: WorldFungible;
    let woods: WorldFungible;
    let fabrics: WorldFungible;
    let prestiges: WorldFungible;
    let zones: WorldZones;
    let baseAttributes: ActorAttributes;
    let charmAttributes: ActorCharmAttributes;
    let behaviorAttributes: ActorBehaviorAttributes;
    let coreAttributes: ActorCoreAttributes;
    let moodAttributes: ActorMoodAttributes;
    let actorRelationship: ActorRelationship;
    let worldEvents: WorldEvents;
    let actorLocations : ActorLocations;
    let worldItems : WorldItems;
    let worldBuildings: WorldBuildings;

    let actorPanGu: BigNumber;
    let testActor: BigNumber;    

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
        let worldDeployed = await deployTaiyiWorld(timestamp, OneAgeVSecond, ActRecoverTimeDay, ZoneResourceGrowTimeDay, ZoneResourceGrowQuantityScale, deployer, taiyiDAO, 
            {
                noSIDNames : true,
                noTalents : true,
                noTalentProcessors : true,
                noRelations : true,
                noItemTypes : true,
                noBuildingTypes : true,
                noEventProcessors : true,
                noTimelineEvents : true,
                noZones : true
            }, false);
        contracts = worldDeployed.worldContracts;
        eventProcessorAddressBook = worldDeployed.eventProcessorAddressBook;

        sifusToken = SifusToken__factory.connect(contracts.SifusToken.instance.address, operator1);
        worldConstants = WorldConstants__factory.connect(contracts.WorldConstants.instance.address, operator1);
        worldContractRoute = WorldContractRoute__factory.connect(contracts.WorldContractRoute.instance.address, operator1);
        actors = Actors__factory.connect(contracts.Actors.instance.address, operator1);
        assetDaoli = WorldFungible__factory.connect(contracts.AssetDaoli.instance.address, operator1);
        names = ActorNames__factory.connect(contracts.ActorNames.instance.address, operator1);
        talents = ActorTalents__factory.connect(contracts.ActorTalents.instance.address, operator1);
        worldEvents = WorldEvents__factory.connect(contracts.WorldEvents.instance.address, operator1);
        shejiTu = ShejiTu__factory.connect(contracts.Shejitu.instance.address, operator1);
        golds = WorldFungible__factory.connect(contracts.AssetGold.instance.address, operator1);
        woods = WorldFungible__factory.connect(contracts.AssetWood.instance.address, operator1);
        fabrics = WorldFungible__factory.connect(contracts.AssetFabric.instance.address, operator1);
        prestiges = WorldFungible__factory.connect(contracts.AssetPrestige.instance.address, operator1);
        zones = WorldZones__factory.connect(contracts.WorldZones.instance.address, operator1);
        actorAttributesConstants = ActorAttributesConstants__factory.connect(contracts.ActorAttributesConstants.instance.address, operator1);
        actorCharmAttributesConstants = ActorCharmAttributesConstants__factory.connect(contracts.ActorCharmAttributesConstants.instance.address, operator1);
        actorCoreAttributesConstants = ActorCoreAttributesConstants__factory.connect(contracts.ActorCoreAttributesConstants.instance.address, operator1);
        actorMoodAttributesConstants = ActorMoodAttributesConstants__factory.connect(contracts.ActorMoodAttributesConstants.instance.address, operator1);
        actorBehaviorAttributesConstants = ActorBehaviorAttributesConstants__factory.connect(contracts.ActorBehaviorAttributesConstants.instance.address, operator1);
        baseAttributes = ActorAttributes__factory.connect(contracts.ActorAttributes.instance.address, operator1);
        charmAttributes = ActorCharmAttributes__factory.connect(contracts.ActorCharmAttributes.instance.address, operator1);
        behaviorAttributes = ActorBehaviorAttributes__factory.connect(contracts.ActorBehaviorAttributes.instance.address, operator1);
        coreAttributes = ActorCoreAttributes__factory.connect(contracts.ActorCoreAttributes.instance.address, operator1);
        moodAttributes = ActorMoodAttributes__factory.connect(contracts.ActorMoodAttributes.instance.address, operator1);
        actorSIDs = ActorSocialIdentity__factory.connect(contracts.ActorSocialIdentity.instance.address, operator1);
        actorRelationship = ActorRelationship__factory.connect(contracts.ActorRelationship.instance.address, operator1);
        actorLocations = ActorLocations__factory.connect(contracts.ActorLocations.instance.address, operator1);
        worldItems = WorldItems__factory.connect(contracts.WorldItems.instance.address, operator1);
        worldBuildings = WorldBuildings__factory.connect(contracts.WorldBuildings.instance.address, operator1);

        actorPanGu = await worldConstants.ACTOR_PANGU();
        //set PanGu as YeMing for test
        await worldContractRoute.connect(taiyiDAO).setYeMing(actorPanGu, taiyiDAO.address); //fake address for test

        //register actors uri modules
        await actors.connect(taiyiDAO).registerURIPartModule(names.address);
        await actors.connect(taiyiDAO).registerURIPartModule(actorSIDs.address);
        await actors.connect(taiyiDAO).registerURIPartModule(talents.address);
        await actors.connect(taiyiDAO).registerURIPartModule(baseAttributes.address);
        await actors.connect(taiyiDAO).registerURIPartModule(worldEvents.address);
    });

    beforeEach(async () => {
        snapshotId = await ethers.provider.send('evm_snapshot', []);
    });

    afterEach(async () => {
        await ethers.provider.send('evm_revert', [snapshotId]);
    });

    it('非盘古无权设计角色天赋', async () => {
        await expect(talents.setTalent(0, "Good Man", "Born as good man", [], [])).to.be.revertedWith('only PanGu');
    });

    it('盘古设计角色天赋', async () => {
        let talentsByDAO = talents.connect(taiyiDAO);
        let W_MODULE_CORE_ATTRIBUTES = await worldConstants.WORLD_MODULE_CORE_ATTRIBUTES();
        let XIQ = await actorMoodAttributesConstants.XIQ();
        await talentsByDAO.setTalent(1010, "Good Man", "Born as good man", [XIQ, BigNumber.from(10)], [W_MODULE_CORE_ATTRIBUTES, 20]);

        expect(await talentsByDAO.talentNames(1010)).to.eq("Good Man");
        expect(await talentsByDAO.talentDescriptions(1010)).to.eq("Born as good man");
        expect((await talentsByDAO.talentAttributeModifiers(1010)).length).to.eq(2);
        expect((await talentsByDAO.talentAttributeModifiers(1010))[0]).to.eq(XIQ);
        expect((await talentsByDAO.talentAttributeModifiers(1010))[1]).to.eq(10);
        expect(await talentsByDAO.talentAttrPointsModifiers(1010, W_MODULE_CORE_ATTRIBUTES)).to.eq(20);
    });

    it('角色天赋互斥', async () => {
        let talentsByDAO = talents.connect(taiyiDAO);
        let W_MODULE_CORE_ATTRIBUTES = await worldConstants.WORLD_MODULE_CORE_ATTRIBUTES();
        let XIQ = await actorMoodAttributesConstants.XIQ();
        await expect(talentsByDAO.setTalentExclusive(1010, [1002, 1020])).to.be.revertedWith('talent have not set');

        await talentsByDAO.setTalent(1010, "Good Man", "Born as good man", [XIQ, BigNumber.from(10)], [W_MODULE_CORE_ATTRIBUTES, 20]);
        await talentsByDAO.setTalentExclusive(1010, [1002, 1020]);

        expect((await talentsByDAO.talentExclusivity(1010)).length).to.eq(2);
        expect((await talentsByDAO.talentExclusivity(1010))[0]).to.eq(1002);
        expect((await talentsByDAO.talentExclusivity(1010))[1]).to.eq(1020);
    });

    it('对角色赋予天赋', async () => {
        let actor = await newActor(operator1, true);

        let talentsByDAO = talents.connect(taiyiDAO);
        let W_MODULE_CORE_ATTRIBUTES = await worldConstants.WORLD_MODULE_CORE_ATTRIBUTES();
        let XIQ = await actorMoodAttributesConstants.XIQ();
        await talentsByDAO.setTalent(1010, "Good Man", "Born as good man", [XIQ, BigNumber.from(10)], [W_MODULE_CORE_ATTRIBUTES, 20]);
        await talentsByDAO.setTalentExclusive(1010, [1002, 1020]);

        //should not talent actor by any one except owner or appoved.
        await expect(talentsByDAO.talentActor(actor)).to.be.revertedWith('not approved or owner of actor');
        await talents.talentActor(actor);
        let actTlts = await talents.actorTalents(actor);
        if(actTlts.length >= 1) {
            expect(actTlts[0]).to.eq(1010);
            expect(await talents.actorAttributePointBuy(actor, W_MODULE_CORE_ATTRIBUTES)).to.be.eq(120);
        }
        else {
            expect(await talents.actorAttributePointBuy(actor, W_MODULE_CORE_ATTRIBUTES)).to.be.eq(100);
        }
    });
});