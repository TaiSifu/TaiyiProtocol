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
    ActorPrelifes, ActorPrelifes__factory,
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
    WorldEventProcessor10001__factory,
    WorldEventProcessor60002__factory,
    WorldEventProcessor60003__factory,
    WorldEventProcessor60004__factory,
    WorldEventProcessor10012__factory,
    WorldEventProcessor10002__factory,
    WorldEventProcessor10009__factory,
    WorldEventProcessor10014__factory,
    WorldEventProcessor10000__factory,
    WorldEventProcessor60508__factory,
} from '../../typechain';
import { DahuangContractName, deployDahuangWorld } from '../../utils';

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
    let actorPrelifes: ActorPrelifes;
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
            let firstName = `小拼${Math.round(Math.random()*100)}`;
            await names.connect(taiyiDAO).claim(firstName, "李", _actor);    
        }

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
        actorPrelifes = ActorPrelifes__factory.connect(taiyiContracts.ActorPrelifes.instance.address, operator1);

        //Deploy dahuang world
        let worldDeployed = await deployDahuangWorld(OneAgeVSecond, ActRecoverTimeDay, ZoneResourceGrowTimeDay, ZoneResourceGrowQuantityScale,
            worldContractRoute, worldConstants, actors, actorLocations, worldYemings, zones, baseAttributes, trigrams, 
            worldRandom, worldItems, actorSIDs, 
            deployer, taiyiDAO, 
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

        dahuangConstants = DahuangConstants__factory.connect(contracts.DahuangConstants.instance.address, operator1);
        talents = ActorTalents__factory.connect(contracts.ActorTalents.instance.address, operator1);
        worldEvents = WorldEvents__factory.connect(contracts.WorldEvents.instance.address, operator1);
        shejiTu = ShejiTu__factory.connect(contracts.ShejituProxy.instance.address, operator1);
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
        await zones.connect(taiyiDAO).claim(actorPanGu, "大荒", shejiTu.address, actorPanGu);
        await shejiTu.connect(deployer).setStartZone(zoneId);

        //born PanGu
        await actors.connect(taiyiDAO).approve(shejiTu.address, actorPanGu);
        await shejiTu.connect(taiyiDAO).bornActor(actorPanGu);
    });

    describe('基本出生序列事件测试', () => {
        let bornTimestamp : any;
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
            expect((await shejiTu.connect(deployer).addAgeEvent(0, 10001, 1)).wait()).eventually.fulfilled;
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

        it('角色在社稷图首次成长（0岁生日）', async () => {
            await shejiTu.connect(operator1).grow(testActor, { gasLimit: 5000000 });
            expect(await worldEvents.ages(testActor)).to.eq(0);
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
            expect(await worldConstants.WORLD_MODULE_NAMES()).to.eq(2);
            expect(uriObj.data.m_2.fullName).to.eq("李小拼");
            expect(uriObj.data.m_2.firstName).to.eq("小拼");
            expect(uriObj.data.m_2.lastName).to.eq("李");
        });

        it('角色URI-增加社会身份模块', async () => {
            expect((await actors.connect(taiyiDAO).registerURIPartModule(actorSIDs.address)).wait()).eventually.fulfilled;
            let uriObj = await parseActorURI(testActor);
            //console.log(JSON.stringify(uriObj, null, 2));
            expect(await worldConstants.WORLD_MODULE_SIDS()).to.eq(6);
            expect(uriObj.data.m_6.length).to.eq(2);
            expect(uriObj.data.m_6[0]).to.eq(1);
            expect(uriObj.data.m_6[1]).to.eq(2);
        });

        it('角色URI-增加时间线模块', async () => {
            expect((await actors.connect(taiyiDAO).registerURIPartModule(shejiTu.address)).wait()).eventually.fulfilled;
            let uriObj = await parseActorURI(testActor);
            //console.log(JSON.stringify(uriObj, null, 2));
            expect(await worldConstants.WORLD_MODULE_ATTRIBUTES()).to.eq(13);
            expect(uriObj.data.m_200.m_13.HLH).to.eq(100);
            expect(await dahuangConstants.WORLD_MODULE_TALENTS()).to.eq(202);
            expect(await dahuangConstants.WORLD_MODULE_EVENTS()).to.eq(201);
            expect(uriObj.data.m_200.m_201.age).to.eq(0);
            expect(uriObj.data.m_200.m_201.bornTime).to.eq(bornTimestamp);
            expect(uriObj.data.m_200.m_201.events.length).to.eq(4);
        });
    });    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    describe('10012出生事件测试-男孩情况', () => {
        let evt10012 : any;
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
            evt10012 = await (await (new WorldEventProcessor10012__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await eventsByPanGu.setEventProcessor(10012, evt10012.address);
        });

        it('配置时间线', async () => {
            await shejiTu.connect(deployer).addAgeEvent(0, 10001, 1);
        });

        it('创建角色在社稷图出生', async () => {
            testActor = await newActor(operator1);
            await actors.connect(operator1).approve(shejiTu.address, testActor);
            await shejiTu.connect(operator1).bornActor(testActor);

            await talents.connect(operator1).talentActor(testActor);
            await baseAttributes.connect(operator1).pointActor(testActor);
            await charmAttributes.connect(operator1).pointActor(testActor);
            await coreAttributes.connect(operator1).pointActor(testActor);
            await moodAttributes.connect(operator1).pointActor(testActor);
            await behaviorAttributes.connect(operator1).pointActor(testActor);
            //grow brithday
            await shejiTu.connect(operator1).grow(testActor, { gasLimit: 5000000 });
        });

        it('男孩不会发生10012事件', async () => {
            expect(await evt10012.checkOccurrence(testActor, 0)).to.eq(false);
        });
    });    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    describe('10012出生事件测试-女孩情况', () => {
        let evt10009 : any;
        let evt10012 : any;
        let should10009 : any;
        let girl: any;
        before(reset);
        it('部署出生序列事件', async () => {
            let eventsByPanGu = worldEvents.connect(taiyiDAO);
            const evt10002 = await (await (new WorldEventProcessor10002__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await eventsByPanGu.setEventProcessor(10002, evt10002.address);
            evt10009 = await (await (new WorldEventProcessor10009__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await eventsByPanGu.setEventProcessor(10009, evt10009.address);
            const evt60002 = await (await (new WorldEventProcessor60002__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await eventsByPanGu.setEventProcessor(60002, evt60002.address);
            const evt60003 = await (await (new WorldEventProcessor60003__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await eventsByPanGu.setEventProcessor(60003, evt60003.address);
            const evt60004 = await (await (new WorldEventProcessor60004__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await eventsByPanGu.setEventProcessor(60004, evt60004.address);
            evt10012 = await (await (new WorldEventProcessor10012__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await eventsByPanGu.setEventProcessor(10012, evt10012.address);

            //register actors uri modules
            await actors.connect(taiyiDAO).registerURIPartModule(names.address);
            await actors.connect(taiyiDAO).registerURIPartModule(actorSIDs.address);
            await actors.connect(taiyiDAO).registerURIPartModule(shejiTu.address);
        });

        it('配置10012操作角色', async () => {
            let newOne = await newActor(deployer);
            await actors.connect(deployer).approve(evt10012.address, newOne);
            await evt10012.initOperator(newOne);
            expect(await evt10012.eventOperator()).to.eq(newOne);
            expect(await actors.ownerOf(newOne)).to.eq(evt10012.address);
        });

        it('配置时间线', async () => {
            await shejiTu.connect(deployer).addAgeEvent(0, 10002, 1);
            await shejiTu.connect(deployer).addAgeEvent(1, 10009, 1);
            await shejiTu.connect(deployer).addAgeEvent(2, 10012, 1);
        });

        it('创建角色在社稷图出生', async () => {
            testActor = await newActor(operator1, true);
            await actors.connect(operator1).approve(shejiTu.address, testActor);
            await shejiTu.connect(operator1).bornActor(testActor);

            await talents.connect(operator1).talentActor(testActor);
            await baseAttributes.connect(operator1).pointActor(testActor);
            await charmAttributes.connect(operator1).pointActor(testActor);
            await coreAttributes.connect(operator1).pointActor(testActor);
            await moodAttributes.connect(operator1).pointActor(testActor);
            await behaviorAttributes.connect(operator1).pointActor(testActor);
            //grow brithday
            await shejiTu.connect(operator1).grow(testActor, { gasLimit: 5000000 });
        });

        it('前置事件：10009', async () => {
            should10009 = await evt10009.checkOccurrence(testActor, 0);
            await shejiTu.connect(operator1).grow(testActor, { gasLimit: 5000000 }); //age 1
            if(should10009) {
                console.log("前置事件10009已经发生");
                expect(await worldEvents.actorEventCount(testActor, 10009)).to.eq(1);
            }
            else
                console.log("前置事件10009没有发生");
        });

        it('10012容错性检查', async () => {
            //should not claim
            expect(await actors.balanceOf(operator1.address)).to.eq(1);
            await expect(evt10012.connect(operator1).claimActor(testActor)).to.be.revertedWith('no actors need to claim.');
            if(should10009 == false)
                expect(await evt10012.checkOccurrence(testActor, 0)).to.eq(false);
        });

        it('10012时间线资金检查', async () => {
            if(should10009) {
                //no daoli
                expect(await evt10012.checkOccurrence(testActor, 0)).to.eq(false);
                //transfer daoli to yeming
                await assetDaoli.connect(taiyiDAO).transfer((await actors.getActor(await shejiTu.operator())).account, BigInt(500e18));
                expect(await evt10012.checkOccurrence(testActor, 0)).to.eq(true);
            }
        });

        it('10012事件', async () => {
            girl = await actors.nextActor();
            await shejiTu.connect(operator1).grow(testActor, { gasLimit: 5000000 }); //age 2
            if(should10009) {
                console.log("事件10012已经发生");
                expect(await actors.ownerOf(girl)).to.eq(evt10012.address);
                expect(await worldEvents.actorEventCount(testActor, 10012)).to.eq(1);
            }
        });

        it('提取10012事件的新人', async () => {
            if(should10009) {
                expect((await evt10012.connect(operator1).claimActor(testActor)).wait()).eventually.fulfilled;
                expect(await actors.ownerOf(girl)).to.eq(operator1.address);
                expect(await actors.balanceOf(operator1.address)).to.eq(2);
            }
        });

        it('10012事件新人关系检查', async () => {
            if(should10009) {
                expect(await actorRelationship.actorRelations(testActor, girl)).to.eq(5);
                expect(await actorRelationship.actorRelations(girl, testActor)).to.eq(5);
                expect((await actorRelationship.actorRelationPeople(girl, 5)).length).to.eq(1);
                expect((await actorRelationship.actorRelationPeople(girl, 5))[0]).to.eq(testActor);
            }
        });

        it('角色URI', async () => {
            //console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
        });
    });    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    describe('10014出生事件测试-男孩情况', () => {
        let evt10014 : any;
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
            evt10014 = await (await (new WorldEventProcessor10014__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await eventsByPanGu.setEventProcessor(10014, evt10014.address);
        });

        it('配置时间线', async () => {
            await shejiTu.connect(deployer).addAgeEvent(0, 10001, 1);
        });

        it('创建角色在社稷图出生', async () => {
            testActor = await newActor(operator1);
            await actors.connect(operator1).approve(shejiTu.address, testActor);
            await shejiTu.connect(operator1).bornActor(testActor);

            await talents.connect(operator1).talentActor(testActor);
            await baseAttributes.connect(operator1).pointActor(testActor);
            await charmAttributes.connect(operator1).pointActor(testActor);
            await coreAttributes.connect(operator1).pointActor(testActor);
            await moodAttributes.connect(operator1).pointActor(testActor);
            await behaviorAttributes.connect(operator1).pointActor(testActor);
            //grow brithday
            await shejiTu.connect(operator1).grow(testActor, { gasLimit: 5000000 });
        });

        it('男孩不会发生10014事件', async () => {
            expect(await evt10014.checkOccurrence(testActor, 0)).to.eq(false);
        });
    });    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    describe('10014出生事件测试-女孩情况', () => {
        let evt10009 : any;
        let evt10014 : any;
        let should10009 : any;
        let girl: any;
        before(reset);
        it('部署出生序列事件', async () => {
            let eventsByPanGu = worldEvents.connect(taiyiDAO);
            const evt10002 = await (await (new WorldEventProcessor10002__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await eventsByPanGu.setEventProcessor(10002, evt10002.address);
            evt10009 = await (await (new WorldEventProcessor10009__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await eventsByPanGu.setEventProcessor(10009, evt10009.address);
            const evt60002 = await (await (new WorldEventProcessor60002__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await eventsByPanGu.setEventProcessor(60002, evt60002.address);
            const evt60003 = await (await (new WorldEventProcessor60003__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await eventsByPanGu.setEventProcessor(60003, evt60003.address);
            const evt60004 = await (await (new WorldEventProcessor60004__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await eventsByPanGu.setEventProcessor(60004, evt60004.address);
            evt10014 = await (await (new WorldEventProcessor10014__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await eventsByPanGu.setEventProcessor(10014, evt10014.address);

            //register actors uri modules
            await actors.connect(taiyiDAO).registerURIPartModule(names.address);
            await actors.connect(taiyiDAO).registerURIPartModule(actorSIDs.address);
            await actors.connect(taiyiDAO).registerURIPartModule(shejiTu.address);
        });

        it('配置10014操作角色', async () => {
            let newOne = await newActor(deployer);
            await actors.connect(deployer).approve(evt10014.address, newOne);
            await evt10014.initOperator(newOne);
            expect(await evt10014.eventOperator()).to.eq(newOne);
            expect(await actors.ownerOf(newOne)).to.eq(evt10014.address);
        });

        it('配置时间线', async () => {
            await shejiTu.connect(deployer).addAgeEvent(0, 10002, 1);
            await shejiTu.connect(deployer).addAgeEvent(1, 10009, 1);
            await shejiTu.connect(deployer).addAgeEvent(2, 10014, 1);
        });

        it('创建角色在社稷图出生', async () => {
            testActor = await newActor(operator1, true);
            await actors.connect(operator1).approve(shejiTu.address, testActor);
            await shejiTu.connect(operator1).bornActor(testActor);

            await talents.connect(operator1).talentActor(testActor);
            await baseAttributes.connect(operator1).pointActor(testActor);
            await charmAttributes.connect(operator1).pointActor(testActor);
            await coreAttributes.connect(operator1).pointActor(testActor);
            await moodAttributes.connect(operator1).pointActor(testActor);
            await behaviorAttributes.connect(operator1).pointActor(testActor);
            //grow brithday
            await shejiTu.connect(operator1).grow(testActor, { gasLimit: 5000000 });
        });

        it('前置事件：10009', async () => {
            should10009 = await evt10009.checkOccurrence(testActor, 0);
            await shejiTu.connect(operator1).grow(testActor, { gasLimit: 5000000 }); //age 1
            if(should10009) {
                console.log("前置事件10009已经发生");
                expect(await worldEvents.actorEventCount(testActor, 10009)).to.eq(1);
            }
            else
                console.log("前置事件10009没有发生");
        });

        it('10014容错性检查', async () => {
            //should not claim
            expect(await actors.balanceOf(operator1.address)).to.eq(1);
            await expect(evt10014.connect(operator1).claimActor(testActor)).to.be.revertedWith('no actors need to claim.');
            if(should10009 == false)
                expect(await evt10014.checkOccurrence(testActor, 0)).to.eq(false);
        });

        it('10014时间线资金检查', async () => {
            if(should10009) {
                //no daoli
                expect(await evt10014.checkOccurrence(testActor, 0)).to.eq(false);
                //transfer daoli to yeming
                await assetDaoli.connect(taiyiDAO).transfer((await actors.getActor(await shejiTu.operator())).account, BigInt(500e18));
                expect(await evt10014.checkOccurrence(testActor, 0)).to.eq(true);
            }
        });

        it('10014事件', async () => {
            girl = await actors.nextActor();
            await shejiTu.connect(operator1).grow(testActor, { gasLimit: 5000000 }); //age 2
            if(should10009) {
                console.log("事件10014已经发生");
                expect(await actors.ownerOf(girl)).to.eq(evt10014.address);
                expect(await worldEvents.actorEventCount(testActor, 10014)).to.eq(1);
            }
        });

        it('提取10014事件的新人', async () => {
            if(should10009) {
                expect((await evt10014.connect(operator1).claimActor(testActor)).wait()).eventually.fulfilled;
                expect(await actors.ownerOf(girl)).to.eq(operator1.address);
                expect(await actors.balanceOf(operator1.address)).to.eq(2);
            }
        });

        it('10014事件新人关系检查', async () => {
            if(should10009) {
                expect(await actorRelationship.actorRelations(testActor, girl)).to.eq(3);
                expect(await actorRelationship.actorRelations(girl, testActor)).to.eq(3);
                expect((await actorRelationship.actorRelationPeople(girl, 3)).length).to.eq(1);
                expect((await actorRelationship.actorRelationPeople(girl, 3))[0]).to.eq(testActor);
            }
        });

        it('角色URI', async () => {
            //console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
        });
    });    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    describe('60508出生事件测试', () => {
        let evt60508 : any;
        let newOne : any;
        before(reset);
        it('部署出生序列事件', async () => {
            let eventsByPanGu = worldEvents.connect(taiyiDAO);
            const evt10002 = await (await (new WorldEventProcessor10002__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await eventsByPanGu.setEventProcessor(10002, evt10002.address);
            const evt60002 = await (await (new WorldEventProcessor60002__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await eventsByPanGu.setEventProcessor(60002, evt60002.address);
            const evt60003 = await (await (new WorldEventProcessor60003__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await eventsByPanGu.setEventProcessor(60003, evt60003.address);
            const evt60004 = await (await (new WorldEventProcessor60004__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await eventsByPanGu.setEventProcessor(60004, evt60004.address);
            //死亡
            const evt10000 = await (await (new WorldEventProcessor10000__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await eventsByPanGu.setEventProcessor(10000, evt10000.address);
            //转世
            evt60508 = await (await (new WorldEventProcessor60508__factory(deployer)).deploy(worldContractRoute.address)).deployed();
            await eventsByPanGu.setEventProcessor(60508, evt60508.address);

            //register actors uri modules
            await actors.connect(taiyiDAO).registerURIPartModule(names.address);
            await actors.connect(taiyiDAO).registerURIPartModule(actorSIDs.address);
            await actors.connect(taiyiDAO).registerURIPartModule(shejiTu.address);
        });

        it('配置60508操作角色', async () => {
            let newOne = await newActor(deployer);
            await actors.connect(deployer).approve(evt60508.address, newOne);
            await evt60508.initOperator(newOne);
            expect(await evt60508.eventOperator()).to.eq(newOne);
            expect(await actors.ownerOf(newOne)).to.eq(evt60508.address);
        });

        it('配置时间线', async () => {
            await shejiTu.connect(deployer).addAgeEvent(0, 10002, 1);
            await shejiTu.connect(deployer).addAgeEvent(1, 10000, 1);
        });

        it('创建角色在社稷图出生', async () => {
            testActor = await newActor(operator1, true);
            await actors.connect(operator1).approve(shejiTu.address, testActor);
            await shejiTu.connect(operator1).bornActor(testActor);

            await talents.connect(operator1).talentActor(testActor);
            await baseAttributes.connect(operator1).pointActor(testActor);
            await charmAttributes.connect(operator1).pointActor(testActor);
            await coreAttributes.connect(operator1).pointActor(testActor);
            await moodAttributes.connect(operator1).pointActor(testActor);
            await behaviorAttributes.connect(operator1).pointActor(testActor);
            //grow brithday
            await shejiTu.connect(operator1).grow(testActor, { gasLimit: 5000000 });
        });

        it('60508容错性检查', async () => {
            //should not claim
            expect(await actors.balanceOf(operator1.address)).to.eq(1);
            await expect(evt60508.connect(operator1).claimActor(testActor)).to.be.revertedWith('no actors need to claim.');
        });

        it('角色活着情况下60508不会发生', async () => {
            expect(await evt60508.checkOccurrence(testActor, 0)).to.eq(false);
            await shejiTu.connect(operator1).grow(testActor, { gasLimit: 5000000 }); //age 1, dead
            expect(await worldEvents.ages(testActor)).to.eq(1);
            expect(await baseAttributes.attributesScores(await worldConstants.ATTR_HLH(), testActor)).to.eq(0);
        });

        it('60508时间线资金检查', async () => {
            //no daoli
            expect(await evt60508.checkOccurrence(testActor, 0)).to.eq(false);
            //transfer daoli to yeming
            await assetDaoli.connect(taiyiDAO).transfer((await actors.getActor(await shejiTu.operator())).account, BigInt(500e18));
            expect(await evt60508.checkOccurrence(testActor, 0)).to.eq(true);
        });

        it('60508事件', async () => {
            newOne = await actors.nextActor();
            await shejiTu.connect(operator1).activeTrigger(60508, testActor, [], []);
            expect(await actors.ownerOf(newOne)).to.eq(evt60508.address);
            expect(await worldEvents.actorEventCount(testActor, 60508)).to.eq(1);
        });

        it('提取60508事件的新人', async () => {
            expect((await evt60508.connect(operator1).claimActor(testActor)).wait()).eventually.fulfilled;
            expect(await actors.ownerOf(newOne)).to.eq(operator1.address);
            expect(await actors.balanceOf(operator1.address)).to.eq(2);
        });

        it('60508事件新人关系检查', async () => {
            expect(await actorPrelifes.preLifes(newOne)).to.eq(testActor);
            expect(await actorPrelifes.postLifes(testActor)).to.eq(newOne);
        });

        it('角色URI', async () => {
            //console.log(JSON.stringify(await parseActorURI(testActor), null, 2));
        });
    });    
});