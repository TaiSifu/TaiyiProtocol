import * as eventsData from "../files/ages.json";
import { BigNumber, Signer } from 'ethers';
import { ShejiTu, ShejiTu__factory} from "@taiyi/contracts/dist/typechain";

export async function addTimeline(timeline: ShejiTu, age: BigNumber, ageEvts: any) {

    for(var i=0; i<ageEvts.length; i++) {
        process.stdout.write(`\u001B[1000Dage ${age} ${Math.round(i*100.0/ageEvts.length)}%`);
        let tx = await timeline.addAgeEvent(age, ageEvts[i][0], `${ageEvts[i][1]}`);
        //await tx.wait();
    }

    process.stdout.write(`\u001B[1000Dage ${age} 100%`);
}

export async function initTimeline(timelineAddress: string, operator: Signer) {
    let timeline = ShejiTu__factory.connect(timelineAddress, operator);
    let events :{[index: string]:any} = eventsData;
    //read age list to init events in certain age automatically, most for development and debug
    let ages = Object.keys(events);
    for(var ageId=0; ageId<ages.length; ageId++) {
        let age = ages[ageId];
        let ageEvts = events[age].event;
        if(ageEvts != undefined) {
            let ageEvtsKeys = Object.keys(ageEvts);
            let evtIds = ageEvtsKeys.map(v=>{
                const value = `${v}`.split('*').map( n => Number(n) );
                if(value.length==1) value.push(1);
                value[1] = Math.round(value[1]*100); //avoid fractional part, make to 3 precision int
                return value;
            });

            for(var i=0; i<evtIds.length; i++) {
                process.stdout.write(`\u001B[1000Dage ${age} ${Math.round(i*100.0/evtIds.length)}%`);
                let tx = await timeline.addAgeEvent(age, evtIds[i][0], `${evtIds[i][1]}`);
                //await tx.wait();
            }
        }
    }

    process.stdout.write(`\u001B[1000D                                                   `);
    process.stdout.write(`\u001B[1000D`);
}
