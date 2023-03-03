import { Signer } from 'ethers';
import { WorldContractRoute } from '@taiyi/contracts/dist/typechain';
export declare function deployEvents(evtMaps: {
    [index: string]: any;
}, route: WorldContractRoute, eventsAddress: string, operator: Signer, deployer: Signer): Promise<any>;
export declare function initEvents(route: WorldContractRoute, eventsAddress: string, operator: Signer, deployer: Signer): Promise<any>;
