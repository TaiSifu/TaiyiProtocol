import { WorldBuildings, WorldBuildings__factory } from '../typechain';
import { generateBuildingTypes } from "../files/building_types";
import { Signer } from 'ethers';

export async function addBuildingTypes(buildings: WorldBuildings, _types: any) {

    for(var i=0; i<_types.length; i++) {
        process.stdout.write(`\u001B[1000DBuildingTypes ${Math.round(i*100.0/_types.length)}%`);
        let tx = await buildings.setTypeName(_types[i].id, _types[i].name);
        //await tx.wait();
    }

    process.stdout.write(`\u001B[1000DitemTypes 100%`);
}

export async function initBuildingTypes(buildingsAddress: string, operator: Signer) {
    let buildings = WorldBuildings__factory.connect(buildingsAddress, operator);
    let types :{[index: string]:any} = generateBuildingTypes();
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

    await addBuildingTypes(buildings, _types);

    process.stdout.write(`\u001B[1000D                                                   `);
    process.stdout.write(`\u001B[1000D`);
}
