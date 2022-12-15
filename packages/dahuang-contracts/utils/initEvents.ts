import * as factory from '../typechain';
import { Signer } from 'ethers';
import * as ageEventsData from "../files/ages.json";
import { WorldContractRoute, WorldEvents__factory } from '@taiyi/contracts/dist/typechain';

export async function deployEvents(evtMaps:{[index: string]:any}, route: WorldContractRoute, eventsAddress: string, operator: Signer, deployer: Signer) : Promise<any> {
    let addressBook :{[index: string]:any} = {};
    let events = WorldEvents__factory.connect(eventsAddress, operator);

    //set event processor
    let keys = Object.keys(evtMaps);
    for(var i=0; i<keys.length; i++) {
        process.stdout.write(`\u001B[1000D${Math.round(i*100.0/keys.length)}%`);
        let eventId = keys[i];
        let deployParams = evtMaps[eventId] || [];

        if(eventId != undefined) {
            let factoryFuncStrs = [
                `function gen_factory(deployer, factory, params, rlAddress) { return new factory.WorldEventProcessor${eventId}__factory(deployer).deploy(rlAddress); }`,
                `function gen_factory(deployer, factory, params, rlAddress) { return new factory.WorldEventProcessor${eventId}__factory(deployer).deploy(params[0], rlAddress); }`,
                `function gen_factory(deployer, factory, params, rlAddress) { return new factory.WorldEventProcessor${eventId}__factory(deployer).deploy(params[0], params[1], rlAddress); }`,
                `function gen_factory(deployer, factory, params, rlAddress) { return new factory.WorldEventProcessor${eventId}__factory(deployer).deploy(params[0], params[1], params[2], rlAddress); }`
            ];
            let factoryFun = new Function('return ' + factoryFuncStrs[deployParams.length]);
            const deployTx = await (await factoryFun()(deployer, factory, deployParams, route.address)).deployed();
            addressBook[`WorldEventProcessor${eventId}`] = deployTx.address;

            let tx = await events.setEventProcessor(eventId, deployTx.address);
            //await tx.wait();
        }
    }
    process.stdout.write(`\u001B[1000D`);

    return addressBook;
}

export async function initEvents(route: WorldContractRoute, eventsAddress: string, operator: Signer, deployer: Signer) : Promise<any> {
    let ageEvents :{[index: string]:any} = ageEventsData;
    //events must be included
    let keymaps :{[index: number]:any} = {
        
    };
    //read ages to init events automatically, most for development and debug
    let ages = Object.keys(ageEvents);
    for(var ageId=0; ageId<ages.length; ageId++) {
        let age = ages[ageId];
        let ageEvts = ageEvents[age].event;
        if(ageEvts != undefined) {
            let ageEvtsKeys = Object.keys(ageEvts);
            let evtIds = ageEvtsKeys.map(v=>{
                const value = `${v}`.split('*').map( n => Number(n) );
                return value;
            });

            for(var i=0; i<evtIds.length; i++) {
                keymaps[evtIds[i][0]] = ageEvts[ageEvtsKeys[i]];
            }
        }
    }

    return deployEvents(keymaps, route, eventsAddress, operator, deployer);
}
