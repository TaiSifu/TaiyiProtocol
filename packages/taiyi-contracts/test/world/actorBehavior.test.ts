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
    ActorMoodAttributes__factory, ActorSocialIdentity__factory, ActorRelationship__factory, ActorCharmAttributesConstants, ActorCoreAttributesConstants, ActorMoodAttributesConstants, ActorBehaviorAttributesConstants, ActorCharmAttributesConstants__factory, ActorCoreAttributesConstants__factory, ActorMoodAttributesConstants__factory, ActorBehaviorAttributesConstants__factory, ActorLocations, WorldItems, WorldBuildings, ActorLocations__factory, WorldItems__factory, WorldBuildings__factory, WorldEventProcessor10001__factory, WorldEventProcessor60002__factory, WorldEventProcessor60003__factory, WorldEventProcessor60004__factory, WorldEventProcessor60001__factory, WorldEventProcessor70000__factory, WorldEventProcessor60505__factory, WorldEventProcessor60506__factory, WorldEventProcessor60509__factory, WorldEventProcessor60507__factory,
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
import { WorldEventProcessor60510__factory } from '../../typechain/factories/WorldEventProcessor60510__factory';

chai.use(asPromised);
chai.use(solidity);
const { expect } = chai;

const OneAgeVSecond : number = 1;
const ActRecoverTimeDay: number = 60;
const ZoneResourceGrowTimeDay: number = 60;
const ZoneResourceGrowQuantityScale: number = 10*1000; //10.0f
const BaseTravelTime: number = 60;
const BaseBuildTime: number = 60;

describe('主动事件角色行为测试', () => {

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
        await talents.connect(taiyiDAO).talentActor(_actor);
        await baseAttributes.connect(taiyiDAO).pointActor(_actor);
        await charmAttributes.connect(taiyiDAO).pointActor(_actor);
        await coreAttributes.connect(taiyiDAO).pointActor(_actor);
        await moodAttributes.connect(taiyiDAO).pointActor(_actor);
        await behaviorAttributes.connect(taiyiDAO).pointActor(_actor);

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

        //部署出生序列
        let eventsByPanGu = worldEvents.connect(taiyiDAO);
        const evt10001 = await (await (new WorldEventProcessor10001__factory(deployer)).deploy(worldContractRoute.address)).deployed();
        await eventsByPanGu.setEventProcessor(10001, evt10001.address);
        const evt60001 = await (await (new WorldEventProcessor60001__factory(deployer)).deploy(worldContractRoute.address)).deployed();
        await eventsByPanGu.setEventProcessor(60001, evt60001.address);
        const evt60002 = await (await (new WorldEventProcessor60002__factory(deployer)).deploy(worldContractRoute.address)).deployed();
        await eventsByPanGu.setEventProcessor(60002, evt60002.address);
        const evt60003 = await (await (new WorldEventProcessor60003__factory(deployer)).deploy(worldContractRoute.address)).deployed();
        await eventsByPanGu.setEventProcessor(60003, evt60003.address);
        const evt60004 = await (await (new WorldEventProcessor60004__factory(deployer)).deploy(worldContractRoute.address)).deployed();
        await eventsByPanGu.setEventProcessor(60004, evt60004.address);

        //配置时间线出生事件
        await shejiTu.connect(taiyiDAO).addAgeEvent(0, 10001, 1);
        await shejiTu.connect(taiyiDAO).addAgeEvent(1, 60001, 1);
        await shejiTu.connect(taiyiDAO).addAgeEvent(2, 60001, 1);
        await shejiTu.connect(taiyiDAO).addAgeEvent(3, 60001, 1);
        await shejiTu.connect(taiyiDAO).addAgeEvent(4, 60001, 1);
        await shejiTu.connect(taiyiDAO).addAgeEvent(5, 60001, 1);

        testActor = await newActor(operator1, true);
    });

    describe('创建新区域和基础资源采集', () => {
        let evt70000:any;
        let evt60505:any;
        let newZone: any;
        before(reset);
        it(`部署区域事件`, async ()=>{
            //区域专用事件
            evt70000 = await (await (new WorldEventProcessor70000__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(70000, evt70000.address);
            evt60505 = await (await (new WorldEventProcessor60505__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(60505, evt60505.address);
        });

        it(`非盘古无权创建新区域`, async ()=>{
            expect(await evt70000.checkOccurrence(testActor, 0)).to.eq(false);
            await expect(shejiTu.connect(operator1).activeTrigger(70000, testActor, [0], ["北京"])).to.be.revertedWith("event check occurrence failed.");
        });

        it(`盘古创建新区域`, async ()=>{
            expect(await evt70000.checkOccurrence(actorPanGu, 0)).to.eq(true);
            newZone = await zones.nextZone();
            await actors.connect(taiyiDAO).approve(shejiTu.address, actorPanGu);
            expect((await shejiTu.connect(taiyiDAO).activeTrigger(70000, actorPanGu, [0], ["北京"])).wait()).eventually.fulfilled;
        });

        it(`行动力不够不能采集`, async ()=>{
            await actors.approve(shejiTu.address, testActor);
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 0

            expect(await behaviorAttributes.attributesScores(await actorBehaviorAttributesConstants.ACT(), testActor)).to.eq(0);
            expect(await evt60505.checkOccurrence(testActor, 0)).to.eq(false);
        });

        it(`恢复行动力`, async ()=>{
            await behaviorAttributes.recoverAct(testActor);
            expect(await behaviorAttributes.attributesScores(await actorBehaviorAttributesConstants.ACT(), testActor)).to.eq(10);
        });

        it(`采集资源`, async ()=>{
            expect(await evt60505.checkOccurrence(testActor, 0)).to.eq(true);
            await shejiTu.activeTrigger(60505, testActor, [newZone], []);
            //console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
        });
    });

    describe('创建村庄和获取基础工具', () => {
        let evt70000:any;
        let evt60505:any;
        let evt60506:any;
        let evt60509:any;
        let evt60510:any;
        let newZone: any;
        let newVillage: any;
        before(reset);
        it(`部署区域事件`, async ()=>{
            evt70000 = await (await (new WorldEventProcessor70000__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(70000, evt70000.address);
            evt60505 = await (await (new WorldEventProcessor60505__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(60505, evt60505.address);
            evt60506 = await (await (new WorldEventProcessor60506__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(60506, evt60506.address);
            evt60509 = await (await (new WorldEventProcessor60509__factory(deployer)).deploy(BaseTravelTime, worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(60509, evt60509.address);
            //制作工具事件
            evt60510 = await (await (new WorldEventProcessor60510__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(60510, evt60510.address);
        });

        it(`设置初级工具`, async ()=>{
            await worldItems.connect(taiyiDAO).setTypeName(8, "木工箱");
        });

        it(`创建测试区域`, async ()=>{
            expect(await evt70000.checkOccurrence(actorPanGu, 0)).to.eq(true);
            newZone = await zones.nextZone();
            await actors.connect(taiyiDAO).approve(shejiTu.address, actorPanGu);
            await shejiTu.connect(taiyiDAO).activeTrigger(70000, actorPanGu, [0], ["北京"]);
        });

        it(`采集一些资源`, async ()=>{
            await actors.approve(shejiTu.address, testActor);
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 0

            await behaviorAttributes.recoverAct(testActor);
            expect(await behaviorAttributes.attributesScores(await actorBehaviorAttributesConstants.ACT(), testActor)).to.eq(10);

            while((await golds.balanceOfActor(testActor)).lt(BigInt(1e18)) || (await woods.balanceOfActor(testActor)).lt(BigInt(1e18))) {
                console.log("make assets...");
                await ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
                await behaviorAttributes.recoverAct(testActor);
                await shejiTu.activeTrigger(60505, testActor, [newZone], []);
            }
        });

        it(`成长到有效年龄`, async ()=>{
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 1
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 2
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 3
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 4
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 5
        });

        it(`恢复体力`, async ()=>{
            await ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
            await behaviorAttributes.recoverAct(testActor);
            expect(await behaviorAttributes.attributesScores(await actorBehaviorAttributesConstants.ACT(), testActor)).to.eq(20);
        });

        it(`体力和威望检查`, async ()=>{
            expect(await evt60506.checkOccurrence(testActor, 0)).to.eq(true);
        });

        it(`未授权威望消耗不能创建村庄`, async ()=>{
            await expect(shejiTu.activeTrigger(60506, testActor, [], ["太乙村"])).to.be.revertedWith("transfer amount exceeds allowance");
        });

        it(`创建一个村庄-太乙村`, async ()=>{
            newVillage = await zones.nextZone();
            await prestiges.approveActor(testActor, await shejiTu.ACTOR_YEMING(), BigInt(1000e18));
            await shejiTu.activeTrigger(60506, testActor, [], ["太乙村"]);
            expect(await zones.names(newVillage)).to.eq("太乙村");
            expect(await zones.ownerOf(newVillage)).to.eq((await actors.getActor(testActor)).account);
        })

        it(`体力不够不能移动`, async ()=>{
            expect(await evt60509.checkOccurrence(testActor, 0)).to.eq(false);
            let currentLc = await actorLocations.actorLocations(testActor);
            await expect(shejiTu.activeTrigger(60509, testActor, [currentLc[1], newZone], [])).to.be.revertedWith("event check occurrence failed.");
        })

        it(`恢复体力`, async ()=>{
            await ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
            await behaviorAttributes.recoverAct(testActor);
            expect(await behaviorAttributes.attributesScores(await actorBehaviorAttributesConstants.ACT(), testActor)).to.eq(20);
        });

        it(`移动到太乙村-开始`, async ()=>{
            let currentLc = await actorLocations.actorLocations(testActor);
            let lA = currentLc[1];
            await shejiTu.activeTrigger(60509, testActor, [lA, newVillage], []);
            currentLc = await actorLocations.actorLocations(testActor);
            expect(currentLc[0]).to.eq(lA);
            expect(currentLc[1]).to.eq(newVillage);
        })

        it(`移动到太乙村-移动时间未到`, async ()=>{
            expect(await actorLocations.isActorLocked(testActor)).to.eq(true);
            //finish call can success but no effect
            expect((await actorLocations.finishActorTravel(testActor)).wait()).eventually.fulfilled;
            expect(await actorLocations.isActorLocked(testActor)).to.eq(true);
        });

        it(`移动到太乙村-移动时间达到`, async ()=>{
            await ethers.provider.send('evm_increaseTime', [BaseTravelTime]);
            expect((await actorLocations.finishActorTravel(testActor)).wait()).eventually.fulfilled;
            expect(await actorLocations.isActorLocked(testActor)).to.eq(false);
            let currentLc = await actorLocations.actorLocations(testActor);
            expect(currentLc[0]).to.eq(newVillage);
            expect(currentLc[1]).to.eq(newVillage);
        });

        // it(`体力不够不能制作工具`, async ()=>{
        //     expect(await evt60510.checkOccurrence(testActor, 0)).to.eq(false);
        //     await expect(await shejiTu.activeTrigger(60510, testActor, [8], [])).to.be.revertedWith("event check occurrence failed.");
        // })

        it(`恢复体力`, async ()=>{
            await ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
            await behaviorAttributes.recoverAct(testActor);
            expect(await behaviorAttributes.attributesScores(await actorBehaviorAttributesConstants.ACT(), testActor)).to.eq(20);
        });

        it(`制作工具-未授权资源消耗`, async ()=>{
            await expect(shejiTu.activeTrigger(60510, testActor, [8], [])).to.be.revertedWith("transfer amount exceeds allowance");
        });

        it(`制作工具`, async ()=>{
            await golds.approveActor(testActor, await shejiTu.ACTOR_YEMING(), BigInt(1000e18));
            await woods.approveActor(testActor, await shejiTu.ACTOR_YEMING(), BigInt(1000e18));

            let newItem = await worldItems.nextItemId();
            expect((await shejiTu.activeTrigger(60510, testActor, [8], [])).wait()).eventually.fulfilled;
            expect(await worldItems.itemTypes(newItem)).to.eq(8);
            expect(await worldItems.itemWears(newItem)).to.eq(100);
            expect(await worldItems.itemShapes(newItem)).to.eq(0);
            expect(await worldItems.ownerOf(newItem)).to.eq((await actors.getActor(testActor)).account);
            //console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
        });
    });

    describe('申领商会初级资格 ', () => {
        let evt60507:any;
        before(reset);

        it(`部署商会资格事件`, async ()=>{
            evt60507 = await (await (new WorldEventProcessor60507__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(60507, evt60507.address);
        });

        it(`设置商会资格`, async ()=>{
            await worldItems.connect(taiyiDAO).setTypeName(7, "公输坊资格");
        });

        it(`成长到有效年龄`, async ()=>{
            await actors.approve(shejiTu.address, testActor);
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 0
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 1
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 2
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 3
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 4
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 5
        });

        it(`恢复体力`, async ()=>{
            await ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
            await behaviorAttributes.recoverAct(testActor);
            expect(await behaviorAttributes.attributesScores(await actorBehaviorAttributesConstants.ACT(), testActor)).to.eq(20);
        });

        it(`体力和威望检查`, async ()=>{
            expect(await prestiges.balanceOfActor(testActor)).to.gte(BigInt(10e18));
            expect(await evt60507.checkOccurrence(testActor, 0)).to.eq(true);
        });

        it(`未授权威望消耗不能申领资格`, async ()=>{
            await expect(shejiTu.activeTrigger(60507, testActor, [7], [], { gasLimit: 5000000 })).to.be.revertedWith("transfer amount exceeds allowance");
        });

        it(`申领商会初级资格`, async ()=>{
            await prestiges.approveActor(testActor, await shejiTu.ACTOR_YEMING(), BigInt(1000e18));

            let newItem = await worldItems.nextItemId();
            expect((await shejiTu.activeTrigger(60507, testActor, [7], [], { gasLimit: 5000000 })).wait()).eventually.fulfilled;

            expect(await worldItems.balanceOf(operator1.address)).to.eq(0); //not in operator but account
            expect(await worldItems.balanceOf((await actors.getActor(testActor)).account)).to.eq(1);
            expect(await worldItems.ownerOf(newItem)).to.eq((await actors.getActor(testActor)).account);
            //console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
        });
    });

});