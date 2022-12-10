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
    ActorMoodAttributes__factory, ActorSocialIdentity__factory, ActorRelationship__factory, ActorCharmAttributesConstants, ActorCoreAttributesConstants, ActorMoodAttributesConstants, ActorBehaviorAttributesConstants, ActorCharmAttributesConstants__factory, ActorCoreAttributesConstants__factory, ActorMoodAttributesConstants__factory, ActorBehaviorAttributesConstants__factory,
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

describe('角色属性测试', () => {

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
    let zones: WorldZones;
    let baseAttributes: ActorAttributes;
    let charmAttributes: ActorCharmAttributes;
    let behaviorAttributes: ActorBehaviorAttributes;
    let coreAttributes: ActorCoreAttributes;
    let moodAttributes: ActorMoodAttributes;
    let actorRelationship: ActorRelationship;
    let worldEvents: WorldEvents;

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
        shejiTu = ShejiTu__factory.connect(contracts.ShejituProxy.instance.address, operator1);
        golds = WorldFungible__factory.connect(contracts.AssetGold.instance.address, operator1);
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

        actorPanGu = await worldConstants.ACTOR_PANGU();
        //set PanGu as YeMing for test
        await worldContractRoute.connect(taiyiDAO).setYeMing(actorPanGu, taiyiDAO.address); //fake address for test

        //bind timeline to a zone
        let zoneId = await zones.nextZone();
        await zones.connect(taiyiDAO).claim(actorPanGu, "大荒", shejiTu.address, actorPanGu);
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
        //set one talent to test
        let W_MODULE_ATTRIBUTES = await worldConstants.WORLD_MODULE_ATTRIBUTES();
        let HLH = await actorAttributesConstants.HLH();
        await talents.connect(taiyiDAO).setTalent(1010, "Good Man", "Born as good man", [HLH, BigNumber.from(10)], [W_MODULE_ATTRIBUTES, 20]);

        //should not point
        await expect(baseAttributes.connect(taiyiDAO).pointActor(testActor)).to.be.revertedWith('not approved or owner of actor');
        //can not point with out talents initialized
        await expect(baseAttributes.pointActor(testActor)).to.be.revertedWith('talents have not initiated');

        await talents.connect(operator1).talentActor(testActor);
        let actTlts = await talents.actorTalents(testActor);

        expect((await baseAttributes.pointActor(testActor)).wait()).eventually.fulfilled;
        let _hlh = await baseAttributes.attributesScores(HLH, testActor);
        if(actTlts.length >= 1)
            expect(_hlh).to.be.equal(120);
        else
            expect(_hlh).to.be.equal(100);
    });

    it('外貌属性集', async () => {
        //set one talent to test
        let W_MODULE_CHARM_ATTRIBUTES = await worldConstants.WORLD_MODULE_CHARM_ATTRIBUTES();
        let MEL = await actorCharmAttributesConstants.MEL();
        await talents.connect(taiyiDAO).setTalent(1010, "Good Man", "Born as good man", [MEL, BigNumber.from(10)], [W_MODULE_CHARM_ATTRIBUTES, 20]);

        //should not point
        await expect(charmAttributes.connect(taiyiDAO).pointActor(testActor)).to.be.revertedWith('not approved or owner of actor');
        //can not point with out talents initialized
        await expect(charmAttributes.pointActor(testActor)).to.be.revertedWith('talents have not initiated');

        await talents.connect(operator1).talentActor(testActor);
        let actTlts = await talents.actorTalents(testActor);

        expect((await charmAttributes.pointActor(testActor)).wait()).eventually.fulfilled;
        let _mel = await charmAttributes.attributesScores(MEL, testActor);
        if(actTlts.length >= 1)
            expect(_mel).to.be.equal(120);
        else
            expect(_mel).to.be.equal(100);
    });

    it('核心属性集', async () => {
        //set one talent to test
        let W_MODULE_CORE_ATTRIBUTES = await worldConstants.WORLD_MODULE_CORE_ATTRIBUTES();
        let DIL = await actorCoreAttributesConstants.DIL();
        let GEG = await actorCoreAttributesConstants.GEG();
        let LIM = await actorCoreAttributesConstants.LIM();
        let LVL = await actorCoreAttributesConstants.LVL();
        let TIZ = await actorCoreAttributesConstants.TIZ();
        let WUX = await actorCoreAttributesConstants.WUX();
        await talents.connect(taiyiDAO).setTalent(1010, "Good Man", "Born as good man", [DIL, BigNumber.from(1), DIL, BigNumber.from(-1)], [W_MODULE_CORE_ATTRIBUTES, 20]);

        //should not point
        await expect(coreAttributes.connect(taiyiDAO).pointActor(testActor)).to.be.revertedWith('not approved or owner of actor');
        //can not point with out talents initialized
        await expect(coreAttributes.pointActor(testActor)).to.be.revertedWith('talents have not initiated');

        await talents.connect(operator1).talentActor(testActor);
        let actTlts = await talents.actorTalents(testActor);

        expect((await coreAttributes.pointActor(testActor)).wait()).eventually.fulfilled;
        let _dil = await coreAttributes.attributesScores(DIL, testActor);
        let _geg = await coreAttributes.attributesScores(GEG, testActor);
        let _lim = await coreAttributes.attributesScores(LIM, testActor);
        let _lvl = await coreAttributes.attributesScores(LVL, testActor);
        let _tiz = await coreAttributes.attributesScores(TIZ, testActor);
        let _wux = await coreAttributes.attributesScores(WUX, testActor);
        if(actTlts.length >= 1)
            expect(_dil.add(_geg).add(_lim).add(_lvl).add(_tiz).add(_wux)).to.be.equal(120);
        else
            expect(_dil.add(_geg).add(_lim).add(_lvl).add(_tiz).add(_wux)).to.be.equal(100);
    });

    it('情绪属性集', async () => {
        //set one talent to test
        let W_MODULE_MOOD_ATTRIBUTES = await worldConstants.WORLD_MODULE_MOOD_ATTRIBUTES();
        let XIQ = await actorMoodAttributesConstants.XIQ();
        await talents.connect(taiyiDAO).setTalent(1010, "Good Man", "Born as good man", [XIQ, BigNumber.from(10)], [W_MODULE_MOOD_ATTRIBUTES, 20]);

        //should not point
        await expect(moodAttributes.connect(taiyiDAO).pointActor(testActor)).to.be.revertedWith('not approved or owner of actor');
        //can not point with out talents initialized
        await expect(moodAttributes.pointActor(testActor)).to.be.revertedWith('talents have not initiated');

        await talents.connect(operator1).talentActor(testActor);
        let actTlts = await talents.actorTalents(testActor);

        expect((await moodAttributes.pointActor(testActor)).wait()).eventually.fulfilled;
        let _xiq = await moodAttributes.attributesScores(XIQ, testActor);
        if(actTlts.length >= 1)
            expect(_xiq).to.be.equal(120);
        else
            expect(_xiq).to.be.equal(100);
    });

    it('行为属性集', async () => {
        //set one talent to test
        let W_MODULE_BEHAVIOR_ATTRIBUTES = await worldConstants.WORLD_MODULE_BEHAVIOR_ATTRIBUTES();
        let ACT = await actorBehaviorAttributesConstants.ACT();
        await talents.connect(taiyiDAO).setTalent(1010, "Good Man", "Born as good man", [ACT, BigNumber.from(10)], [W_MODULE_BEHAVIOR_ATTRIBUTES, 20]);

        //should not point
        await expect(behaviorAttributes.connect(taiyiDAO).pointActor(testActor)).to.be.revertedWith('not approved or owner of actor');
        //can not point with out talents initialized
        await expect(behaviorAttributes.pointActor(testActor)).to.be.revertedWith('talents have not initiated');

        await talents.connect(operator1).talentActor(testActor);
        let actTlts = await talents.actorTalents(testActor);

        expect((await behaviorAttributes.pointActor(testActor)).wait()).eventually.fulfilled;
        let _act = await behaviorAttributes.attributesScores(ACT, testActor);
        expect(_act).to.be.equal(0);
    });
});