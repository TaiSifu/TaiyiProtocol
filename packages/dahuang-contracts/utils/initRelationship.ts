import { ActorRelationship, ActorRelationship__factory } from '@taiyi/contracts/dist/typechain';
import * as relationData from "../files/relationships.json";
import { Signer } from 'ethers';

export async function addRelations(relationship: ActorRelationship, _relations: any) {

    for(var i=0; i<_relations.length; i++) {
        process.stdout.write(`\u001B[1000DRelations ${Math.round(i*100.0/_relations.length)}%`);
        let tx = await relationship.setRelation(_relations[i].id, _relations[i].name);
        await tx.wait();
    }

    process.stdout.write(`\u001B[1000DRelations 100%`);
}

export async function initRelations(relationshipAddress: string, operator: Signer) {
    let relationship = ActorRelationship__factory.connect(relationshipAddress, operator);
    let _relationData :{[index: string]:any} = relationData;
    let ids = Object.keys(_relationData);
    let _relations = [];
    for(var g=0; g<ids.length; g+=1) {
        let r = _relationData[ids[g]];
        if(r.name == undefined)
            continue;
        _relations.push({
            id : ids[g],
            name : r.name
        });
    }

    await addRelations(relationship, _relations);

    process.stdout.write(`\u001B[1000D                                                   `);
    process.stdout.write(`\u001B[1000D`);
}
