import chai from 'chai';
import asPromised from 'chai-as-promised';
import '@openzeppelin/hardhat-upgrades';
import { ethers, upgrades  } from 'hardhat';
import { BigNumber, BigNumber as EthersBN, constants } from 'ethers';
import { solidity } from 'ethereum-waffle';
import {
    WorldConstants, WorldContractRoute, WorldContractRoute__factory, 
    Actors, ShejiTu, ActorAttributes, SifusToken, WorldEvents, WorldFungible, ActorNames, ActorTalents, ActorSocialIdentity, 
    WorldZones, ActorRelationship,  Actors__factory, ActorNames__factory, ActorTalents__factory, WorldConstants__factory, WorldFungible__factory, 
    SifusToken__factory, WorldEvents__factory, ShejiTu__factory, WorldZones__factory, ActorAttributes__factory, 
    ActorSocialIdentity__factory, ActorRelationship__factory, WorldYemings, WorldYemings__factory, WorldRandom, 
    ActorLocations, Trigrams, WorldRandom__factory, ActorLocations__factory, Trigrams__factory, WorldItems, WorldItems__factory,
} from '@taiyi/contracts/dist/typechain';
import {
    blockNumber,
    blockTimestamp,
} from '@taiyi/contracts/dist/test/utils';
import {
    TaiyiContractName,
    WorldContract,
    deployTaiyiWorld
} from '@taiyi/contracts/dist/utils';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import {
    DahuangConstants, DahuangConstants__factory, ActorCharmAttributes, ActorBehaviorAttributes, ActorCoreAttributes, 
    ActorMoodAttributes, ActorCharmAttributes__factory, ActorBehaviorAttributes__factory, ActorCoreAttributes__factory,
    ActorMoodAttributes__factory, WorldBuildings, WorldBuildings__factory, 
    WorldEventProcessor10001__factory, WorldEventProcessor60002__factory, WorldEventProcessor60003__factory, 
    WorldEventProcessor60004__factory, WorldEventProcessor60001__factory, WorldEventProcessor70000__factory, 
    WorldEventProcessor60505__factory, WorldEventProcessor60506__factory, WorldEventProcessor60509__factory, 
    WorldEventProcessor60507__factory, WorldEventProcessor60511__factory, WorldEventProcessor60512__factory,
    WorldEventProcessor60510__factory,
    WorldEventProcessor60005__factory,
} from '../../typechain';
import { DahuangContractName, deployDahuangWorld } from '../../utils';

chai.use(asPromised);
chai.use(solidity);
const { expect } = chai;

const OneAgeVSecond : number = 1;
const ActRecoverTimeDay: number = 60;
const ZoneResourceGrowTimeDay: number = 60;
const ZoneResourceGrowQuantityScale: number = 10*1000; //10.0f
const BaseTravelTime: number = 60;
const BaseBuildTime: number = 60;

describe('??????????????????????????????', () => {

    let deployer: SignerWithAddress;
    let taiyiDAO: SignerWithAddress;
    let operator1: SignerWithAddress;
    let operator2: SignerWithAddress;
    let snapshotId: number;

    let taiyiContracts: Record<TaiyiContractName, WorldContract>;
    let eventProcessorAddressBook: {[index: string]:any};
    let contracts: Record<DahuangContractName, WorldContract>;

    //taiyi basic
    let worldConstants: WorldConstants;
    let worldContractRoute: WorldContractRoute;
    let sifusToken: SifusToken;
    let actors: Actors;
    let names: ActorNames;
    let talents: ActorTalents;
    let shejiTu: ShejiTu;
    let actorSIDs: ActorSocialIdentity;
    let assetDaoli: WorldFungible;
    let zones: WorldZones;
    let baseAttributes: ActorAttributes;
    let charmAttributes: ActorCharmAttributes;
    let behaviorAttributes: ActorBehaviorAttributes;
    let coreAttributes: ActorCoreAttributes;
    let moodAttributes: ActorMoodAttributes;
    let actorRelationship: ActorRelationship;
    let worldEvents: WorldEvents;
    let worldYemings: WorldYemings;
    let worldRandom: WorldRandom;
    let actorLocations: ActorLocations;
    let trigrams: Trigrams;
    let worldItems: WorldItems;

    //dahuang
    let dahuangConstants: DahuangConstants;
    let golds: WorldFungible;
    let woods: WorldFungible;
    let fabrics: WorldFungible;
    let prestiges: WorldFungible;
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
            let firstName = `??????${Math.round(Math.random()*100)}`;
            await names.connect(taiyiDAO).claim(firstName, "???", _actor);    
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

        //Deploy taiyi basic
        const timestamp = await blockTimestamp(BigNumber.from(await blockNumber()).toHexString().replace("0x0", "0x"));
        taiyiContracts = await deployTaiyiWorld(timestamp, deployer, taiyiDAO, false);

        sifusToken = SifusToken__factory.connect(taiyiContracts.SifusToken.instance.address, operator1);
        worldConstants = WorldConstants__factory.connect(taiyiContracts.WorldConstants.instance.address, operator1);
        worldContractRoute = WorldContractRoute__factory.connect(taiyiContracts.WorldContractRoute.instance.address, operator1);
        actors = Actors__factory.connect(taiyiContracts.Actors.instance.address, operator1);
        assetDaoli = WorldFungible__factory.connect(taiyiContracts.AssetDaoli.instance.address, operator1);
        names = ActorNames__factory.connect(taiyiContracts.ActorNames.instance.address, operator1);
        zones = WorldZones__factory.connect(taiyiContracts.WorldZones.instance.address, operator1);
        worldYemings = WorldYemings__factory.connect(taiyiContracts.WorldYemings.instance.address, operator1);
        baseAttributes = ActorAttributes__factory.connect(taiyiContracts.ActorAttributes.instance.address, operator1);
        actorSIDs = ActorSocialIdentity__factory.connect(taiyiContracts.ActorSocialIdentity.instance.address, operator1);
        worldRandom = WorldRandom__factory.connect(taiyiContracts.WorldRandom.instance.address, operator1);
        actorLocations = ActorLocations__factory.connect(taiyiContracts.ActorLocations.instance.address, operator1);
        trigrams = Trigrams__factory.connect(taiyiContracts.Trigrams.instance.address, operator1);
        worldItems = WorldItems__factory.connect(taiyiContracts.WorldItems.instance.address, operator1);

        //Deploy dahuang world
        let worldDeployed = await deployDahuangWorld(OneAgeVSecond, ActRecoverTimeDay, ZoneResourceGrowTimeDay, ZoneResourceGrowQuantityScale,
            worldContractRoute, worldConstants, actors, actorLocations, worldYemings, zones, baseAttributes, trigrams, 
            worldRandom, worldItems, actorSIDs, 
            deployer, taiyiDAO, 
            {
                isTest: true,
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

        dahuangConstants = DahuangConstants__factory.connect(contracts.DahuangConstants.instance.address, operator1);
        talents = ActorTalents__factory.connect(contracts.ActorTalents.instance.address, operator1);
        worldEvents = WorldEvents__factory.connect(contracts.WorldEvents.instance.address, operator1);
        shejiTu = ShejiTu__factory.connect(contracts.ShejiTuProxy.instance.address, operator1);
        golds = WorldFungible__factory.connect(contracts.AssetGold.instance.address, operator1);
        woods = WorldFungible__factory.connect(contracts.AssetWood.instance.address, operator1);
        fabrics = WorldFungible__factory.connect(contracts.AssetFabric.instance.address, operator1);
        prestiges = WorldFungible__factory.connect(contracts.AssetPrestige.instance.address, operator1);
        charmAttributes = ActorCharmAttributes__factory.connect(contracts.ActorCharmAttributes.instance.address, operator1);
        behaviorAttributes = ActorBehaviorAttributes__factory.connect(contracts.ActorBehaviorAttributes.instance.address, operator1);
        coreAttributes = ActorCoreAttributes__factory.connect(contracts.ActorCoreAttributes.instance.address, operator1);
        moodAttributes = ActorMoodAttributes__factory.connect(contracts.ActorMoodAttributes.instance.address, operator1);
        actorRelationship = ActorRelationship__factory.connect(contracts.ActorRelationship.instance.address, operator1);
        worldBuildings = WorldBuildings__factory.connect(contracts.WorldBuildings.instance.address, operator1);

        actorPanGu = await worldConstants.ACTOR_PANGU();
        //set PanGu as YeMing for test
        await worldYemings.connect(taiyiDAO).setYeMing(actorPanGu, taiyiDAO.address); //fake address for test

        //bind timeline to a zone
        let zoneId = await zones.nextZone();
        await zones.connect(taiyiDAO).claim(actorPanGu, "??????", shejiTu.address, actorPanGu);
        await shejiTu.connect(deployer).setStartZone(zoneId);

        //born PanGu
        await actors.connect(taiyiDAO).approve(shejiTu.address, actorPanGu);
        await shejiTu.connect(taiyiDAO).bornActor(actorPanGu);

        //register actors uri modules
        await actors.connect(taiyiDAO).registerURIPartModule(names.address);
        await actors.connect(taiyiDAO).registerURIPartModule(actorSIDs.address);
        await actors.connect(taiyiDAO).registerURIPartModule(shejiTu.address);

        //??????????????????
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
        const evt60005 = await (await (new WorldEventProcessor60005__factory(deployer)).deploy(worldContractRoute.address)).deployed();
        await eventsByPanGu.setEventProcessor(60005, evt60005.address);

        //???????????????????????????
        await shejiTu.connect(deployer).addAgeEvent(0, 10001, 1);
        await shejiTu.connect(deployer).addAgeEvent(1, 60001, 1);
        await shejiTu.connect(deployer).addAgeEvent(2, 60001, 1);
        await shejiTu.connect(deployer).addAgeEvent(3, 60001, 1);
        await shejiTu.connect(deployer).addAgeEvent(4, 60001, 1);
        await shejiTu.connect(deployer).addAgeEvent(5, 60001, 1);

        testActor = await newActor(operator1, true);
    });

    describe('????????????????????????????????????', () => {
        let evt70000:any;
        let evt60505:any;
        let newZone: any;
        before(reset);
        it(`??????????????????`, async ()=>{
            //??????????????????
            evt70000 = await (await (new WorldEventProcessor70000__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(70000, evt70000.address);
            evt60505 = await (await (new WorldEventProcessor60505__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(60505, evt60505.address);
        });

        it(`??????????????????????????????`, async ()=>{
            expect(await evt70000.checkOccurrence(testActor, 0)).to.eq(false);
            await expect(shejiTu.connect(operator1).activeTrigger(70000, testActor, [0], ["??????"])).to.be.revertedWith("event check occurrence failed.");
        });

        it(`?????????????????????`, async ()=>{
            expect(await evt70000.checkOccurrence(actorPanGu, 0)).to.eq(true);
            newZone = await zones.nextZone();
            await actors.connect(taiyiDAO).approve(shejiTu.address, actorPanGu);
            expect((await shejiTu.connect(taiyiDAO).activeTrigger(70000, actorPanGu, [0], ["??????"])).wait()).eventually.fulfilled;
        });

        it(`???????????????????????????`, async ()=>{
            await actors.approve(shejiTu.address, testActor);
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 0

            expect(await behaviorAttributes.attributesScores(await dahuangConstants.ATTR_ACT(), testActor)).to.eq(0);
            expect(await evt60505.checkOccurrence(testActor, 0)).to.eq(false);
        });

        it(`???????????????`, async ()=>{
            await behaviorAttributes.recoverAct(testActor);
            expect(await behaviorAttributes.attributesScores(await dahuangConstants.ATTR_ACT(), testActor)).to.eq(10);
        });

        it(`?????????????????????????????????`, async ()=>{
            expect(await evt60505.checkOccurrence(testActor, 0)).to.eq(true);
            await expect(shejiTu.activeTrigger(60505, testActor, [newZone], [])).to.be.revertedWith("must collect at actor located zone");
            //console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
        });

        it(`???????????????????????????????????????`, async ()=>{
            expect(await evt60505.checkOccurrence(testActor, 0)).to.eq(true);
            let lcs = await actorLocations.actorLocations(testActor);
            await shejiTu.activeTrigger(60505, testActor, [lcs[1]], []);
            //console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
        });
    });

    describe('?????????????????????????????????', () => {
        let evt70000:any;
        let evt60505:any;
        let evt60506:any;
        let evt60509:any;
        let evt60510:any;
        let newZone: any;
        let newVillage: any;
        before(reset);
        it(`??????????????????`, async ()=>{
            evt70000 = await (await (new WorldEventProcessor70000__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(70000, evt70000.address);
            evt60505 = await (await (new WorldEventProcessor60505__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(60505, evt60505.address);
            evt60506 = await (await (new WorldEventProcessor60506__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(60506, evt60506.address);
            evt60509 = await (await (new WorldEventProcessor60509__factory(deployer)).deploy(BaseTravelTime, worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(60509, evt60509.address);
            //??????????????????
            evt60510 = await (await (new WorldEventProcessor60510__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(60510, evt60510.address);
        });

        it(`??????????????????`, async ()=>{
            await worldItems.connect(taiyiDAO).setTypeName(8, "?????????");
        });

        it(`??????????????????`, async ()=>{
            expect(await evt70000.checkOccurrence(actorPanGu, 0)).to.eq(true);
            newZone = await zones.nextZone();
            await actors.connect(taiyiDAO).approve(shejiTu.address, actorPanGu);
            await shejiTu.connect(taiyiDAO).activeTrigger(70000, actorPanGu, [0], ["??????"]);
        });

        it(`??????????????????`, async ()=>{
            await actors.approve(shejiTu.address, testActor);
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 0

            await behaviorAttributes.recoverAct(testActor);
            expect(await behaviorAttributes.attributesScores(await dahuangConstants.ATTR_ACT(), testActor)).to.eq(10);

            while((await golds.balanceOfActor(testActor)).lt(BigInt(1e18)) || (await woods.balanceOfActor(testActor)).lt(BigInt(1e18))) {
                console.log("make assets...");
                await ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
                await behaviorAttributes.recoverAct(testActor);
                let lcs = await actorLocations.actorLocations(testActor);
                await shejiTu.activeTrigger(60505, testActor, [lcs[1]], []);
            }
        });

        it(`?????????????????????`, async ()=>{
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 1
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 2
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 3
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 4
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 5
        });

        it(`????????????`, async ()=>{
            await ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
            await behaviorAttributes.recoverAct(testActor);
            expect(await behaviorAttributes.attributesScores(await dahuangConstants.ATTR_ACT(), testActor)).to.eq(20);
        });

        it(`?????????????????????`, async ()=>{
            expect(await evt60506.checkOccurrence(testActor, 0)).to.eq(true);
        });

        it(`???????????????????????????????????????`, async ()=>{
            await expect(shejiTu.activeTrigger(60506, testActor, [], ["?????????"])).to.be.revertedWith("transfer amount exceeds allowance");
        });

        it(`??????????????????-?????????`, async ()=>{
            newVillage = await zones.nextZone();
            await prestiges.approveActor(testActor, await shejiTu.operator(), BigInt(1000e18));
            await shejiTu.activeTrigger(60506, testActor, [], ["?????????"]);
            expect(await zones.names(newVillage)).to.eq("?????????");
            expect(await zones.ownerOf(newVillage)).to.eq((await actors.getActor(testActor)).account);
        })

        it(`????????????????????????`, async ()=>{
            expect(await evt60509.checkOccurrence(testActor, 0)).to.eq(false);
            let currentLc = await actorLocations.actorLocations(testActor);
            await expect(shejiTu.activeTrigger(60509, testActor, [currentLc[1], newZone], [])).to.be.revertedWith("event check occurrence failed.");
        })

        it(`????????????`, async ()=>{
            await ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
            await behaviorAttributes.recoverAct(testActor);
            expect(await behaviorAttributes.attributesScores(await dahuangConstants.ATTR_ACT(), testActor)).to.eq(20);
        });

        it(`??????????????????-??????`, async ()=>{
            let currentLc = await actorLocations.actorLocations(testActor);
            let lA = currentLc[1];
            await shejiTu.activeTrigger(60509, testActor, [lA, newVillage], []);
            currentLc = await actorLocations.actorLocations(testActor);
            expect(currentLc[0]).to.eq(lA);
            expect(currentLc[1]).to.eq(newVillage);
        })

        it(`??????????????????-??????????????????`, async ()=>{
            expect(await actorLocations.isActorLocked(testActor)).to.eq(true);
            //finish call can success but no effect
            expect((await actorLocations.finishActorTravel(testActor)).wait()).eventually.fulfilled;
            expect(await actorLocations.isActorLocked(testActor)).to.eq(true);
        });

        it(`??????????????????-??????????????????`, async ()=>{
            await ethers.provider.send('evm_increaseTime', [BaseTravelTime]);
            expect((await actorLocations.finishActorTravel(testActor)).wait()).eventually.fulfilled;
            expect(await actorLocations.isActorLocked(testActor)).to.eq(false);
            let currentLc = await actorLocations.actorLocations(testActor);
            expect(currentLc[0]).to.eq(newVillage);
            expect(currentLc[1]).to.eq(newVillage);
        });

        // it(`??????????????????????????????`, async ()=>{
        //     expect(await evt60510.checkOccurrence(testActor, 0)).to.eq(false);
        //     await expect(await shejiTu.activeTrigger(60510, testActor, [8], [])).to.be.revertedWith("event check occurrence failed.");
        // })

        it(`????????????`, async ()=>{
            await ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
            await behaviorAttributes.recoverAct(testActor);
            expect(await behaviorAttributes.attributesScores(await dahuangConstants.ATTR_ACT(), testActor)).to.eq(20);
        });

        it(`????????????-?????????????????????`, async ()=>{
            await expect(shejiTu.activeTrigger(60510, testActor, [8], [])).to.be.revertedWith("transfer amount exceeds allowance");
        });

        it(`????????????`, async ()=>{
            await golds.approveActor(testActor, await shejiTu.operator(), BigInt(1000e18));
            await woods.approveActor(testActor, await shejiTu.operator(), BigInt(1000e18));

            let newItem = await worldItems.nextItemId();
            expect((await shejiTu.activeTrigger(60510, testActor, [8], [])).wait()).eventually.fulfilled;
            expect(await worldItems.itemTypes(newItem)).to.eq(8);
            expect(await worldItems.itemWears(newItem)).to.eq(100);
            expect(await worldItems.itemShapes(newItem)).to.eq(0);
            expect(await worldItems.ownerOf(newItem)).to.eq((await actors.getActor(testActor)).account);
            //console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
        });
    });

    describe('????????????????????????', () => {
        let evt60507:any;
        before(reset);

        it(`????????????????????????`, async ()=>{
            evt60507 = await (await (new WorldEventProcessor60507__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(60507, evt60507.address);
        });

        it(`??????????????????`, async ()=>{
            await worldItems.connect(taiyiDAO).setTypeName(7, "???????????????");
        });

        it(`?????????????????????`, async ()=>{
            await actors.approve(shejiTu.address, testActor);
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 0
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 1
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 2
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 3
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 4
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 5
        });

        it(`????????????`, async ()=>{
            await ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
            await behaviorAttributes.recoverAct(testActor);
            expect(await behaviorAttributes.attributesScores(await dahuangConstants.ATTR_ACT(), testActor)).to.eq(20);
        });

        it(`?????????????????????`, async ()=>{
            expect(await prestiges.balanceOfActor(testActor)).to.gte(BigInt(10e18));
            expect(await evt60507.checkOccurrence(testActor, 0)).to.eq(true);
        });

        it(`???????????????????????????????????????`, async ()=>{
            await expect(shejiTu.activeTrigger(60507, testActor, [7], [], { gasLimit: 5000000 })).to.be.revertedWith("transfer amount exceeds allowance");
        });

        it(`????????????????????????`, async ()=>{
            await prestiges.approveActor(testActor, await shejiTu.operator(), BigInt(1000e18));

            let newItem = await worldItems.nextItemId();
            expect((await shejiTu.activeTrigger(60507, testActor, [7], [], { gasLimit: 5000000 })).wait()).eventually.fulfilled;

            expect(await worldItems.balanceOf(operator1.address)).to.eq(0); //not in operator but account
            expect(await worldItems.balanceOf((await actors.getActor(testActor)).account)).to.eq(1);
            expect(await worldItems.ownerOf(newItem)).to.eq((await actors.getActor(testActor)).account);
            //console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
        });
    });

    describe('????????????????????????', () => {
        let evt60511:any;
        before(reset);

        it(`????????????????????????`, async ()=>{
            evt60511 = await (await (new WorldEventProcessor60511__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(60511, evt60511.address);
        });

        it(`??????????????????`, async ()=>{
            await worldItems.connect(taiyiDAO).setTypeName(20, "???????????????");
        });

        it(`?????????????????????`, async ()=>{
            await actors.approve(shejiTu.address, testActor);
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 0
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 1
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 2
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 3
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 4
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 5
        });

        it(`????????????`, async ()=>{
            await ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
            await behaviorAttributes.recoverAct(testActor);
            expect(await behaviorAttributes.attributesScores(await dahuangConstants.ATTR_ACT(), testActor)).to.eq(20);
        });

        it(`?????????????????????`, async ()=>{
            expect(await prestiges.balanceOfActor(testActor)).to.gte(BigInt(5e18));
            expect(await evt60511.checkOccurrence(testActor, 0)).to.eq(true);
        });

        it(`???????????????????????????????????????`, async ()=>{
            await expect(shejiTu.activeTrigger(60511, testActor, [20], [], { gasLimit: 5000000 })).to.be.revertedWith("transfer amount exceeds allowance");
        });

        it(`??????????????????`, async ()=>{
            await prestiges.approveActor(testActor, await shejiTu.operator(), BigInt(1000e18));

            let newItem = await worldItems.nextItemId();
            expect((await shejiTu.activeTrigger(60511, testActor, [20], [], { gasLimit: 5000000 })).wait()).eventually.fulfilled;

            expect(await worldItems.balanceOf(operator1.address)).to.eq(0); //not in operator but account
            expect(await worldItems.balanceOf((await actors.getActor(testActor)).account)).to.eq(1);
            expect(await worldItems.ownerOf(newItem)).to.eq((await actors.getActor(testActor)).account);
            //console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
        });
    });

    describe('??????????????????', () => {
        let evt70000:any;
        let evt60505:any;
        let evt60506:any;
        let evt60509:any;
        let evt60511:any;
        let evt60512:any;
        let newZone: any;
        let newVillage: any;
        let newItem: any;
        let newBuildingZone: any;
        before(reset);

        it(`????????????????????????`, async ()=>{
            evt70000 = await (await (new WorldEventProcessor70000__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(70000, evt70000.address);
            evt60505 = await (await (new WorldEventProcessor60505__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(60505, evt60505.address);
            evt60506 = await (await (new WorldEventProcessor60506__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(60506, evt60506.address);
            evt60509 = await (await (new WorldEventProcessor60509__factory(deployer)).deploy(BaseTravelTime, worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(60509, evt60509.address);
            evt60511 = await (await (new WorldEventProcessor60511__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(60511, evt60511.address);
            evt60512 = await (await (new WorldEventProcessor60512__factory(deployer)).deploy(BaseBuildTime, worldContractRoute.address)).deployed();
            await worldEvents.connect(taiyiDAO).setEventProcessor(60512, evt60512.address);
        });

        it(`????????????????????????`, async ()=>{
            await worldItems.connect(taiyiDAO).setTypeName(20, "???????????????");
            //??????????????????
            await worldBuildings.connect(taiyiDAO).setTypeName(1, "?????????"); //20-19
        });

        it(`??????????????????`, async ()=>{
            expect(await evt70000.checkOccurrence(actorPanGu, 0)).to.eq(true);
            newZone = await zones.nextZone();
            await actors.connect(taiyiDAO).approve(shejiTu.address, actorPanGu);
            await shejiTu.connect(taiyiDAO).activeTrigger(70000, actorPanGu, [0], ["??????"]);
        });

        it(`?????????????????????`, async ()=>{
            await actors.approve(shejiTu.address, testActor);
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 0
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 1
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 2
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 3
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 4
            await shejiTu.grow(testActor, { gasLimit: 5000000 }); //age 5
        });

        it(`??????????????????`, async ()=>{
            while(
                (await golds.balanceOfActor(testActor)).lt(BigInt(95e18)) ||
                (await woods.balanceOfActor(testActor)).lt(BigInt(350e18)) ||
                (await fabrics.balanceOfActor(testActor)).lt(BigInt(350e18)))
            {
                console.log("make assets...");
                await ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
                await behaviorAttributes.recoverAct(testActor);
                let lcs = await actorLocations.actorLocations(testActor);
                await shejiTu.activeTrigger(60505, testActor, [lcs[1]], []);
            }
        });

        it(`????????????`, async ()=>{
            await ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
            await behaviorAttributes.recoverAct(testActor);
            expect(await behaviorAttributes.attributesScores(await dahuangConstants.ATTR_ACT(), testActor)).to.eq(20);
        });

        it(`??????????????????-?????????`, async ()=>{
            newVillage = await zones.nextZone();
            await prestiges.approveActor(testActor, await shejiTu.operator(), BigInt(1000e18));
            await shejiTu.activeTrigger(60506, testActor, [], ["?????????"]);
            expect(await zones.names(newVillage)).to.eq("?????????");
            expect(await zones.ownerOf(newVillage)).to.eq((await actors.getActor(testActor)).account);
        })

        it(`????????????`, async ()=>{
            await ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
            await behaviorAttributes.recoverAct(testActor);
            expect(await behaviorAttributes.attributesScores(await dahuangConstants.ATTR_ACT(), testActor)).to.eq(20);
        });

        it(`??????????????????`, async ()=>{
            let currentLc = await actorLocations.actorLocations(testActor);
            let lA = currentLc[1];
            await shejiTu.activeTrigger(60509, testActor, [lA, newVillage], []);
            await ethers.provider.send('evm_increaseTime', [BaseTravelTime]);
            expect((await actorLocations.finishActorTravel(testActor)).wait()).eventually.fulfilled;
            expect(await actorLocations.isActorLocked(testActor)).to.eq(false);
            currentLc = await actorLocations.actorLocations(testActor);
            expect(currentLc[0]).to.eq(newVillage);
            expect(currentLc[1]).to.eq(newVillage);
        })

        it(`??????????????????`, async ()=>{
            expect(await prestiges.balanceOfActor(testActor)).to.gte(BigInt(5e18));
            expect(await evt60511.checkOccurrence(testActor, 0)).to.eq(true);
            await prestiges.approveActor(testActor, await shejiTu.operator(), BigInt(1000e18));

            newItem = await worldItems.nextItemId();
            expect((await shejiTu.activeTrigger(60511, testActor, [20], [], { gasLimit: 5000000 })).wait()).eventually.fulfilled;

            expect(await worldItems.balanceOf(operator1.address)).to.eq(0); //not in operator but account
            expect(await worldItems.balanceOf((await actors.getActor(testActor)).account)).to.eq(1);
            expect(await worldItems.ownerOf(newItem)).to.eq((await actors.getActor(testActor)).account);
        });

        it(`????????????`, async ()=>{
            await ethers.provider.send('evm_increaseTime', [ActRecoverTimeDay]);
            await behaviorAttributes.recoverAct(testActor);
            expect(await behaviorAttributes.attributesScores(await dahuangConstants.ATTR_ACT(), testActor)).to.eq(20);
        });

        it(`????????????`, async ()=>{
            expect(await prestiges.balanceOfActor(testActor)).to.gte(BigInt(150e18));
            expect(await evt60511.checkOccurrence(testActor, 0)).to.eq(true);
        });

        it(`???????????????????????????????????????`, async ()=>{
            await expect(shejiTu.activeTrigger(60512, testActor, [newItem], [])).to.be.revertedWith("transfer amount exceeds allowance");

            let actorYeMing = await shejiTu.operator();
            await golds.approveActor(testActor, actorYeMing, BigInt(1000e18));
            await woods.approveActor(testActor, actorYeMing, BigInt(1000e18));
            await fabrics.approveActor(testActor, actorYeMing, BigInt(1000e18));
        });

        it(`???????????????`, async ()=>{
            newBuildingZone = await zones.nextZone();
            expect((await shejiTu.activeTrigger(60512, testActor, [newItem], [])).wait()).eventually.fulfilled;

            await expect(worldItems.ownerOf(newItem)).to.be.revertedWith("ERC721: owner query for nonexistent token");
            let currentLc = await actorLocations.actorLocations(testActor);
            expect(currentLc[0]).to.eq(newBuildingZone);
            expect(await zones.ownerOf(newBuildingZone)).to.eq((await actors.getActor(testActor)).account);
            expect(await worldBuildings.buildingTypes(newBuildingZone)).to.eq(1);
            expect(await actorLocations.isActorLocked(testActor)).to.eq(true);
            //console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
        });

        it(`??????????????????`, async ()=>{
            expect(await actorLocations.isActorLocked(testActor)).to.eq(true);
            let currentLc = await actorLocations.actorLocations(testActor);
            expect(currentLc[0]).to.eq(newBuildingZone);
        });

        it(`???????????????`, async ()=>{
            expect(await zones.ownerOf(newBuildingZone)).to.eq((await actors.getActor(testActor)).account);
            expect(await worldBuildings.buildingTypes(newBuildingZone)).to.eq(1);
        });
    });
});