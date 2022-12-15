import { ActorSocialIdentity, ActorSocialIdentity__factory } from '@taiyi/contracts/dist/typechain';
import * as sidNames from "../files/sids.json";
import { BigNumber, Signer } from 'ethers';

export async function setSIDNames(sids: ActorSocialIdentity, names: any) {

    for(var i=0; i<names.length; i++) {
        process.stdout.write(`\u001B[1000DSIDName ${Math.round(i*100.0/names.length)}%`);
        let tx = await sids.setSIDName(names[i].id, names[i].name);
        //await tx.wait();
    }

    process.stdout.write(`\u001B[1000DSIDName 100%`);
}

export async function initSIDNames(sidsAddress: string, operator: Signer) {
    let sids = ActorSocialIdentity__factory.connect(sidsAddress, operator);
    let _sidNames :{[index: string]:any} = sidNames;
    let ids = Object.keys(sidNames);
    let _names = [];
    for(var g=0; g<ids.length; g+=1) {
        let r = _sidNames[ids[g]];
        if(r.name == undefined)
            continue;
        _names.push({
            id : ids[g],
            name : r.name
        });
    }

    await setSIDNames(sids, _names);

    process.stdout.write(`\u001B[1000D                                                   `);
    process.stdout.write(`\u001B[1000D`);
}
