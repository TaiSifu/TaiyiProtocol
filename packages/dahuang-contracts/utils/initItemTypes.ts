import { WorldItems, WorldItems__factory } from '@taiyi/contracts/dist/typechain';
import { generateItemTypes } from "../files/item_types";
import { Signer } from 'ethers';

export async function addItemTypes(items: WorldItems, _types: any) {

    for(var i=0; i<_types.length; i++) {
        process.stdout.write(`\u001B[1000DitemTypes ${Math.round(i*100.0/_types.length)}%`);
        let tx = await items.setTypeName(_types[i].id, _types[i].name);
        await tx.wait();
    }

    process.stdout.write(`\u001B[1000DitemTypes 100%`);
}

export async function initItemTypes(itemsAddress: string, operator: Signer) {
    let items = WorldItems__factory.connect(itemsAddress, operator);
    let types :{[index: string]:any} = generateItemTypes();
    let ids = Object.keys(types);
    let _types = [];
    for(var g=0; g<ids.length; g+=1) {
        let r = types[ids[g]];
        if(r.name == undefined)
            continue;
        _types.push({
            id : ids[g],
            name : r.name
        });
    }

    await addItemTypes(items, _types);

    process.stdout.write(`\u001B[1000D                                                   `);
    process.stdout.write(`\u001B[1000D`);
}
