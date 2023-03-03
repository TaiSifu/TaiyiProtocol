import { WorldContractRoute } from '@taiyi/contracts/dist/typechain';
import { Signer } from 'ethers';
export declare function deployEvents(evtMaps: {
    [index: string]: any;
}, route: WorldContractRoute, eventsAddress: string, operator: Signer, deployer: Signer): Promise<any>;
export declare function initEvents(route: WorldContractRoute, eventsAddress: string, operator: Signer, deployer: Signer): Promise<any>;
