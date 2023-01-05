import { WorldConstants, ShejiTu, ShejiTu__factory } from '@taiyi/contracts/dist/typechain';
import * as zonesData from "../files/zones.json";
import { Signer } from 'ethers';

export async function addZones(timeline: ShejiTu, _zones: any) {

    for(var i=0; i<_zones.length; i++) {
        process.stdout.write(`\u001B[1000Dzone ${Math.round(i*100.0/_zones.length)}%`);
        let tx = await timeline.activeTrigger(70000, 0, [_zones[i].parentZone], [_zones[i].name]);        
        await tx.wait();
    }

    process.stdout.write(`\u001B[1000Dzone 100%`);
}

export async function initZones(worldConst: WorldConstants, timelineAddress: string, operator: Signer) {
    let timeline = ShejiTu__factory.connect(timelineAddress, operator);
    let ACTOR_PANGU = await worldConst.ACTOR_PANGU();
    let zones :{[index: string]:any} = zonesData;
    let ids = Object.keys(zones);
    for(var g=0; g<ids.length; g+=15) {
        let names = [];
        for(var i=g; i<(g+15); i++) {
            if(i>=ids.length)
                break;
            process.stdout.write(`\u001B[1000Dzone ${Math.round(i*100.0/ids.length)}%`);
            let z = zones[ids[i]];
            if(z.name == undefined)
                break;
            names.push(z.name);
        }
        if(names.length > 0) {
            let tx = await timeline.activeTrigger(70000, ACTOR_PANGU, [0], names);
            await tx.wait();
        }
    }

    process.stdout.write(`\u001B[1000D                                                   `);
    process.stdout.write(`\u001B[1000D`);
}
