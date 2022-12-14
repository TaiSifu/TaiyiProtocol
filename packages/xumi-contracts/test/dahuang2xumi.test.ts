import chai from 'chai';
import asPromised from 'chai-as-promised';
import '@openzeppelin/hardhat-upgrades';
import { ethers, upgrades  } from 'hardhat';
import { BigNumber, BigNumber as EthersBN, BigNumberish, constants } from 'ethers';
import { solidity } from 'ethereum-waffle';
import {
    WorldConstants, WorldContractRoute, WorldContractRoute__factory, 
    Actors, ShejiTu, ActorAttributes, SifusToken, WorldEvents, WorldFungible, ActorNames, ActorTalents, ActorSocialIdentity, 
    WorldZones, ActorCharmAttributes, ActorBehaviorAttributes, ActorCoreAttributes, ActorMoodAttributes, ActorRelationship, 
    Actors__factory, ActorNames__factory, ActorTalents__factory, WorldConstants__factory, WorldFungible__factory, 
    SifusToken__factory, WorldEvents__factory, ShejiTu__factory, WorldZones__factory,
    ActorAttributes__factory, ActorCharmAttributes__factory, ActorBehaviorAttributes__factory, ActorCoreAttributes__factory, 
    ActorMoodAttributes__factory, ActorSocialIdentity__factory, ActorRelationship__factory,
    ActorLocations, WorldItems, WorldBuildings, ActorLocations__factory, WorldItems__factory, WorldBuildings__factory,
    WorldEventProcessor10001__factory, WorldEventProcessor60001__factory, WorldEventProcessor60002__factory, WorldEventProcessor60003__factory,
    WorldEventProcessor60004__factory, WorldEventProcessor50002__factory, WorldEventProcessor60513__factory, ActorTimelineAges, ActorTimelineAges__factory,
    Trigrams, Trigrams__factory, WorldRandom, WorldRandom__factory, WorldYemings, WorldYemings__factory    
} from '@taiyi/contracts/dist/typechain';
import {
    blockNumber,
    blockTimestamp,
} from '@taiyi/contracts/dist/test/utils';
import {
    WorldContractName,
    WorldContract,
    deployTaiyiWorld
} from '@taiyi/contracts/dist/utils';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { 
    ActorXumiAttributes, XumiConstants, XumiConstants__factory, ActorXumiAttributes__factory, 
    WorldEventProcessor1050001__factory,
} from '../typechain';
import { 
    deployXumiWorld, XumiContractName 
} from '../utils';

chai.use(asPromised);
chai.use(solidity);
const { expect } = chai;

const OneAgeVSecond : number = 1;
const ActRecoverTimeDay: number = 60;
const ZoneResourceGrowTimeDay: number = 60;
const ZoneResourceGrowQuantityScale: number = 10*1000; //10.0f
const BaseTravelTime: number = 3000;

describe('大荒到须弥', () => {

    let deployer: SignerWithAddress;
    let taiyiDAO: SignerWithAddress;
    let operator1: SignerWithAddress;
    let operator2: SignerWithAddress;
    let snapshotId: number;

    let contracts: Record<WorldContractName, WorldContract>;
    let eventProcessorAddressBook: {[index: string]:any};

    let worldConstants: WorldConstants;
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
    let actorTimelineAges: ActorTimelineAges;
    let worldYemings: WorldYemings;
    let random: WorldRandom;
    let trigrams: Trigrams;

    let actorPanGu: BigNumber;
    let testActor: BigNumber; 
    let dahuangZone: BigNumber;
    let xumiZone: BigNumber; 
    let enterItem: BigNumber;  

    let evt60513: any;

    ///// 须弥相关
    let xumiContracts: Record<XumiContractName, WorldContract>;
    let xumiEventProcessorAddressBook: {[index: string]:any};

    let xumiConstants: XumiConstants;
    let xumi: ShejiTu;
    let actorXumiAttributes: ActorXumiAttributes;
    let assetEnergy: WorldFungible;

    let evt1050001: any;

    let makeMoney = async (toWho: string, amount: BigNumberish):Promise<void> => { 
        await assetDaoli.connect(taiyiDAO).claim(actorPanGu, actorPanGu, amount);
        await assetDaoli.connect(taiyiDAO).withdraw(actorPanGu, actorPanGu, amount);
        if(toWho != taiyiDAO.address)
            await assetDaoli.connect(taiyiDAO).transfer(toWho, amount);
    };

    let newXumiActor = async (toWho: SignerWithAddress, randomName?:boolean):Promise<BigNumber> => {
        //deal coin
        await makeMoney(taiyiDAO.address, BigInt(1000e18));

        await assetDaoli.connect(taiyiDAO).approve(actors.address, BigInt(1000e18));
        let _actor = await actors.nextActor();
        await actors.connect(taiyiDAO).mintActor(BigInt(100e18));

        if(randomName) {
            let firstName = `${Math.round(Math.random()*100)}`;
            await names.connect(taiyiDAO).claim(firstName, "赛博", _actor);    
        }

        await actors.connect(taiyiDAO).approve(xumi.address, _actor);
        await xumi.connect(taiyiDAO).bornActor(_actor);
        await talents.connect(taiyiDAO).talentActor(_actor);
        await baseAttributes.connect(taiyiDAO).pointActor(_actor);
        await charmAttributes.connect(taiyiDAO).pointActor(_actor);
        await coreAttributes.connect(taiyiDAO).pointActor(_actor);
        await moodAttributes.connect(taiyiDAO).pointActor(_actor);
        await behaviorAttributes.connect(taiyiDAO).pointActor(_actor);
        await actorXumiAttributes.connect(taiyiDAO).pointActor(_actor);

        if(toWho.address != taiyiDAO.address)
            await actors.connect(taiyiDAO).transferFrom(taiyiDAO.address, toWho.address, _actor);
        return _actor;
    }

    let newDahuangActor = async (toWho: SignerWithAddress, randomName?:boolean):Promise<BigNumber> => {
        //deal coin
        await makeMoney(taiyiDAO.address, BigInt(1000e18));

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

        //Deploy Dahuang world
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
        woods = WorldFungible__factory.connect(contracts.AssetWood.instance.address, operator1);
        fabrics = WorldFungible__factory.connect(contracts.AssetFabric.instance.address, operator1);
        prestiges = WorldFungible__factory.connect(contracts.AssetPrestige.instance.address, operator1);
        zones = WorldZones__factory.connect(contracts.WorldZones.instance.address, operator1);
        worldYemings = WorldYemings__factory.connect(contracts.WorldYemings.instance.address, operator1);
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
        actorTimelineAges = ActorTimelineAges__factory.connect(contracts.ActorTimelineAges.instance.address, operator1);
        random = WorldRandom__factory.connect(contracts.WorldRandom.instance.address, operator1);
        trigrams = Trigrams__factory.connect(contracts.Trigrams.instance.address, operator1);

        actorPanGu = await worldConstants.ACTOR_PANGU();
        //set PanGu as YeMing for test
        await worldYemings.connect(taiyiDAO).setYeMing(actorPanGu, taiyiDAO.address); //fake address for test

        //bind timeline to a zone
        dahuangZone = await zones.nextZone();
        await zones.connect(taiyiDAO).claim(actorPanGu, "大荒", shejiTu.address, actorPanGu);
        await shejiTu.connect(deployer).setStartZone(dahuangZone);

        //born PanGu
        await actors.connect(taiyiDAO).approve(shejiTu.address, actorPanGu);
        await shejiTu.connect(taiyiDAO).bornActor(actorPanGu);

        //部署大荒出生序列
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
        await shejiTu.connect(deployer).addAgeEvent(0, 10001, 1);

        //Deploy Xumi world
        let xumiWorldDeployed = await deployXumiWorld(worldContractRoute, worldConstants, actors, actorLocations,
            zones, baseAttributes, talents, trigrams, random, worldItems, worldEvents, operator1, taiyiDAO, 
            {},
            false);
        xumiContracts = xumiWorldDeployed.worldContracts;
        xumiEventProcessorAddressBook = xumiWorldDeployed.eventProcessorAddressBook;

        xumiConstants = XumiConstants__factory.connect(xumiContracts.XumiConstants.instance.address, operator1);
        xumi = ShejiTu__factory.connect(xumiContracts.XumiProxy.instance.address, operator1);
        actorXumiAttributes = ActorXumiAttributes__factory.connect(xumiContracts.ActorXumiAttributes.instance.address, operator1);
        assetEnergy = WorldFungible__factory.connect(xumiContracts.AssetEnergy.instance.address, operator1);

        //register actors uri modules
        await actors.connect(taiyiDAO).registerURIPartModule(names.address);
        await actors.connect(taiyiDAO).registerURIPartModule(actorSIDs.address);
        await actors.connect(taiyiDAO).registerURIPartModule(talents.address);
        await actors.connect(taiyiDAO).registerURIPartModule(shejiTu.address);
        await actors.connect(taiyiDAO).registerURIPartModule(xumi.address);
        await actors.connect(taiyiDAO).registerURIPartModule(worldEvents.address);

        testActor = await newDahuangActor(operator1, true);
    });

    describe('配置须弥域', () => {
        it(`配置须弥操作员`, async ()=>{
            let newActor = await newDahuangActor(operator1);
            await worldYemings.connect(taiyiDAO).setYeMing(newActor, xumi.address);
            await actors.approve(xumi.address, newActor);
            expect((await xumi.initOperator(newActor)).wait()).eventually.fulfilled;
            expect(await worldYemings.isYeMing(await xumi.operator())).to.eq(true);
            expect(await actors.ownerOf(await xumi.operator())).to.eq(xumi.address);
        });

        it(`噎明铸造新区域绑定须弥时间线`, async ()=>{
            xumiZone = await zones.nextZone();
            expect((await zones.connect(taiyiDAO).claim(actorPanGu, "须弥域", xumi.address, await xumi.operator())).wait()).eventually.fulfilled;    
            expect(await zones.ownerOf(xumiZone)).to.eq((await actors.getActor(await xumi.operator())).account);
            expect((await xumi.setStartZone(xumiZone)).wait()).eventually.fulfilled;
            expect(await xumi.startZone()).to.eq(xumiZone);
        });
    });

    describe('出生在大荒', () => {

        it(`部署大荒事件线`, async ()=>{
            let evt50002 = await (await (new WorldEventProcessor50002__factory(operator1)).deploy(worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(50002, evt50002.address);
            evt60513 = await (await (new WorldEventProcessor60513__factory(operator1)).deploy(worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(60513, evt60513.address);

            await evt60513.setTargetZoneId(xumiZone);
            expect(await evt60513.targetZone()).to.eq(xumiZone);

            await shejiTu.connect(deployer).addAgeEvent(1, 50002, 1); 
            await shejiTu.connect(deployer).addAgeEvent(2, 60001, 1); 
        });

        it(`成长到0岁`, async ()=>{
            await actors.approve(shejiTu.address, testActor);
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 0
            //console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
        });

        it(`没有道具无法激活查看紫金米事件`, async ()=>{
            await expect(shejiTu.activeTrigger(60513, testActor, [1], [])).to.be.revertedWith("ERC721: owner query for nonexistent token");
        });

        it(`成长到1岁`, async ()=>{
            enterItem = await worldItems.nextItemId();
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 1
            //console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
        });

        it(`捡到紫金米`, async ()=>{
            expect(await worldItems.itemTypes(enterItem)).to.eq(50);
            expect(await worldItems.ownerOf(enterItem)).to.eq((await actors.getActor(testActor)).account);
        });

        it(`非道具持有者无法激活查看紫金米事件`, async ()=>{
            await expect(shejiTu.connect(taiyiDAO).activeTrigger(60513, actorPanGu, [enterItem], [])).to.be.revertedWith("item is not belongs to actor");
        });

        it(`查看紫金米`, async ()=>{
            expect(await evt60513.checkOccurrence(testActor, 0)).to.eq(true);
            expect((await shejiTu.activeTrigger(60513, testActor, [enterItem], [])).wait()).eventually.fulfilled;
            //console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
        });

        it(`破碎虚空，传送到须弥域`, async ()=>{
            let currentLc = await actorLocations.actorLocations(testActor);
            expect(currentLc[0]).to.eq(xumiZone);
        });

        it(`年龄检查`, async ()=>{
            expect(await worldEvents.ages(testActor)).to.eq(0);
            expect(await actorTimelineAges.actorTimelineLastAges(testActor, shejiTu.address)).to.eq(1);
        });

        it(`不能再在大荒成长`, async ()=>{
            await expect(shejiTu.grow(testActor, { gasLimit: 5000000 })).to.be.revertedWith("not in current timeline");
        });
    });
    ///////////////////////////////////////////////////////////////////////////////////////////
    describe('生长在须弥', () => {

        it(`部署须弥事件线`, async ()=>{
            evt1050001 = await (await (new WorldEventProcessor1050001__factory(operator1)).deploy(worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(1050001, evt1050001.address);

            await evt1050001.setTargetZoneId(dahuangZone);
            expect(await evt1050001.targetZone()).to.eq(dahuangZone);
        });

        it(`出生`, async ()=>{
            await actorXumiAttributes.pointActor(testActor);

            await actors.approve(xumi.address, testActor);
            await assetEnergy.approveActor(testActor, await xumi.operator(), BigInt(1000e18));

            await xumi.grow(testActor, { gasLimit: 5000000 }); //age 0
            //console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
        });

        it(`成长到1岁`, async ()=>{
            await xumi.grow(testActor, { gasLimit: 5000000 }); //age 1
            //console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
        });

        it(`未达到2岁不能回大荒`, async ()=>{
            expect(await evt1050001.checkOccurrence(testActor, 0)).to.eq(false);
        });

        it(`成长到2岁`, async ()=>{
            await xumi.grow(testActor, { gasLimit: 5000000 }); //age 2
            //console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
        });

        it(`直接激活回大荒事件`, async ()=>{
            expect(await evt1050001.checkOccurrence(testActor, 0)).to.eq(true);
            expect((await xumi.activeTrigger(1050001, testActor, [], [])).wait()).eventually.fulfilled;
            //console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
        });

        it(`破碎虚空，传送回大荒`, async ()=>{
            let currentLc = await actorLocations.actorLocations(testActor);
            expect(currentLc[0]).to.eq(dahuangZone);
        });

        it(`年龄检查`, async ()=>{
            expect(await worldEvents.ages(testActor)).to.eq(1);
            expect(await actorTimelineAges.actorTimelineLastAges(testActor, xumi.address)).to.eq(2);
        });

        it(`不能再在须弥成长`, async ()=>{
            await expect(xumi.grow(testActor, { gasLimit: 5000000 })).to.be.revertedWith("not in current timeline");
        });
    });
    ///////////////////////////////////////////////////////////////////////////////////////////
    describe('回大荒', () => {
        it(`在大荒成长到2岁`, async ()=>{
            await actors.approve(shejiTu.address, testActor);
            expect((await shejiTu.grow(testActor, { gasLimit: 5000000 })).wait()).eventually.fulfilled;
            expect(await worldEvents.ages(testActor)).to.eq(2);
            //console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
        });
    });
});