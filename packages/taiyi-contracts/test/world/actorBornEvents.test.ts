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
    ActorMoodAttributes__factory, ActorSocialIdentity__factory, ActorRelationship__factory,
    WorldEventProcessor10001__factory,
    WorldEventProcessor60002__factory,
    WorldEventProcessor60003__factory,
    WorldEventProcessor60004__factory, 
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

describe('角色出生序列事件测试', () => {

    let deployer: SignerWithAddress;
    let taiyiDAO: SignerWithAddress;
    let operator1: SignerWithAddress;
    let operator2: SignerWithAddress;
    let snapshotId: number;

    let contracts: Record<WorldContractName, WorldContract>;
    let eventProcessorAddressBook: {[index: string]:any};

    let worldConstants: WorldConstants;
    let actorAttributesConstants: ActorAttributesConstants;
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
    
    let newActor = async (toWho: SignerWithAddress):Promise<BigNumber> => {
        //deal coin
        await assetDaoli.connect(taiyiDAO).claim(actorPanGu, actorPanGu, BigInt(1000e18));
        await assetDaoli.connect(taiyiDAO).withdraw(actorPanGu, actorPanGu, BigInt(1000e18));
        await assetDaoli.connect(taiyiDAO).approve(actors.address, BigInt(1000e18));
        let _actor = await actors.nextActor();
        await actors.connect(taiyiDAO).mintActor(BigInt(100e18));
        await actors.connect(taiyiDAO).transferFrom(taiyiDAO.address, toWho.address, _actor);
        return _actor;
    }

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
        let worldDeployed = await deployTaiyiWorld(OneAgeVSecond, ActRecoverTimeDay, ZoneResourceGrowTimeDay, ZoneResourceGrowQuantityScale, deployer, taiyiDAO, 
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
        zones = WorldZones__factory.connect(contracts.WorldZones.instance.address, operator1);
        actorAttributesConstants = ActorAttributesConstants__factory.connect(contracts.ActorAttributesConstants.instance.address, operator1);
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
    });

    describe('基本出生序列事件测试', () => {
        let bornTimestamp : any;
        let parseActorURI = async (actor: BigNumber) => {
            let uri = await actors.tokenURI(actor);
            let uriDecode = Buffer.from(uri.substring(29), 'base64').toString('utf-8');
            //console.log(uriDecode);
            return JSON.parse(uriDecode);
        };

        before(reset);
        it('部署出生序列事件', async () => {
            let eventsByPanGu = worldEvents.connect(taiyiDAO);
            const evt10001 = await (await (new WorldEventProcessor10001__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await eventsByPanGu.setEventProcessor(10001, evt10001.address);
            const evt60002 = await (await (new WorldEventProcessor60002__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await eventsByPanGu.setEventProcessor(60002, evt60002.address);
            const evt60003 = await (await (new WorldEventProcessor60003__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await eventsByPanGu.setEventProcessor(60003, evt60003.address);
            const evt60004 = await (await (new WorldEventProcessor60004__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await eventsByPanGu.setEventProcessor(60004, evt60004.address);
        });

        it('配置时间线', async () => {
            expect((await shejiTu.connect(taiyiDAO).addAgeEvent(0, 10001, 1)).wait()).eventually.fulfilled;
            let shejituByPanGu = ShejiTu__factory.connect(shejiTu.address, taiyiDAO);
            await shejituByPanGu.addAgeEvent(0, 10001, 1);
        });

        it('创建新角色', async () => {
            testActor = await newActor(operator1);
        });

        it('角色未授权给社稷图，无法在社稷图出生', async () => {
            await expect(shejiTu.connect(operator1).bornActor(testActor)).to.be.revertedWith("not approved or owner of actor");
        });

        it('角色被授权给社稷图', async () => {
            await actors.connect(operator1).approve(shejiTu.address, testActor);
            //await actors.connect(operator1).setApprovalForAll(shejiTu.address, true);
        });

        it('角色在社稷图出生', async () => {
            const receipt = await (await shejiTu.connect(operator1).bornActor(testActor)).wait();
            bornTimestamp = await blockTimestamp(BigNumber.from(receipt.blockNumber).toHexString().replace("0x0", "0x"));
        });

        it('角色初始化天赋', async () => {
            expect((await talents.connect(operator1).talentActor(testActor)).wait()).eventually.fulfilled;
        });

        it('角色初始化属性', async () => {
            expect((await baseAttributes.connect(operator1).pointActor(testActor)).wait()).eventually.fulfilled;
            expect((await charmAttributes.connect(operator1).pointActor(testActor)).wait()).eventually.fulfilled;
            expect((await coreAttributes.connect(operator1).pointActor(testActor)).wait()).eventually.fulfilled;
            expect((await moodAttributes.connect(operator1).pointActor(testActor)).wait()).eventually.fulfilled;
            expect((await behaviorAttributes.connect(operator1).pointActor(testActor)).wait()).eventually.fulfilled;
        });

        it('角色在社稷图成长1岁', async () => {
            await shejiTu.connect(operator1).grow(testActor, { gasLimit: 5000000 });
            expect(await actorSIDs.balanceOf((await actors.getActor(testActor)).account)).to.equal(2);
        });

        it("给角色命名", async ()=>{
            let nameId = await names.nextName();
            expect((await names.connect(operator1).claim(`小拼`, `李`, testActor)).wait()).eventually.fulfilled;
            expect(await names.ownerOf(nameId)).to.eq((await actors.getActor(testActor)).account);
        });

        it('角色URI-基本', async () => {
            let uriObj = await parseActorURI(testActor);
            //console.log(JSON.stringify(uriObj, null, 2));
        });

        it('角色URI-增加名称模块', async () => {
            expect((await actors.connect(taiyiDAO).registerURIPartModule(names.address)).wait()).eventually.fulfilled;
            let uriObj = await parseActorURI(testActor);
            //console.log(JSON.stringify(uriObj, null, 2));
            expect(await worldConstants.WORLD_MODULE_NAMES()).to.eq(4);
            expect(uriObj.data.m_4.fullName).to.eq("李小拼");
            expect(uriObj.data.m_4.firstName).to.eq("小拼");
            expect(uriObj.data.m_4.lastName).to.eq("李");
        });

        it('角色URI-增加社会身份模块', async () => {
            expect((await actors.connect(taiyiDAO).registerURIPartModule(actorSIDs.address)).wait()).eventually.fulfilled;
            let uriObj = await parseActorURI(testActor);
            //console.log(JSON.stringify(uriObj, null, 2));
            expect(await worldConstants.WORLD_MODULE_SIDS()).to.eq(19);
            expect(uriObj.data.m_19.length).to.eq(2);
            expect(uriObj.data.m_19[0]).to.eq(1);
            expect(uriObj.data.m_19[1]).to.eq(2);
        });

        it('角色URI-增加天赋模块', async () => {
            expect((await actors.connect(taiyiDAO).registerURIPartModule(talents.address)).wait()).eventually.fulfilled;
            let uriObj = await parseActorURI(testActor);
            //console.log(JSON.stringify(uriObj, null, 2));
            expect(await worldConstants.WORLD_MODULE_TALENTS()).to.eq(6);
        });

        it('角色URI-增加基本属性模块', async () => {
            expect((await actors.connect(taiyiDAO).registerURIPartModule(baseAttributes.address)).wait()).eventually.fulfilled;
            let uriObj = await parseActorURI(testActor);
            //console.log(JSON.stringify(uriObj, null, 2));
            expect(await worldConstants.WORLD_MODULE_ATTRIBUTES()).to.eq(5);
            expect(uriObj.data.m_5.HLH).to.eq(100);
        });

        it('角色URI-增加事件模块', async () => {
            expect((await actors.connect(taiyiDAO).registerURIPartModule(worldEvents.address)).wait()).eventually.fulfilled;
            let uriObj = await parseActorURI(testActor);
            //console.log(JSON.stringify(uriObj, null, 2));
            expect(await worldConstants.WORLD_MODULE_EVENTS()).to.eq(2);
            expect(uriObj.data.m_2.age).to.eq(0);
            expect(uriObj.data.m_2.bornTime).to.eq(bornTimestamp);
            expect(uriObj.data.m_2.events.length).to.eq(4);
        });
    });    
});