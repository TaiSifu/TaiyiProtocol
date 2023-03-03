import { Signer, BigNumberish, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { TaiyiDaoProxy } from "../TaiyiDaoProxy";
export declare class TaiyiDaoProxy__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(timelock_: string, sifus_: string, vetoer_: string, admin_: string, implementation_: string, votingPeriod_: BigNumberish, votingDelay_: BigNumberish, proposalThresholdBPS_: BigNumberish, quorumVotesBPS_: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<TaiyiDaoProxy>;
    getDeployTransaction(timelock_: string, sifus_: string, vetoer_: string, admin_: string, implementation_: string, votingPeriod_: BigNumberish, votingDelay_: BigNumberish, proposalThresholdBPS_: BigNumberish, quorumVotesBPS_: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): TaiyiDaoProxy;
    connect(signer: Signer): TaiyiDaoProxy__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): TaiyiDaoProxy;
}
