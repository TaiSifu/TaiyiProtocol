import { Signer, BigNumberish, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { TaiyiDaoImmutable } from "../TaiyiDaoImmutable";
export declare class TaiyiDaoImmutable__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(timelock_: string, sifus_: string, admin_: string, vetoer_: string, votingPeriod_: BigNumberish, votingDelay_: BigNumberish, proposalThresholdBPS_: BigNumberish, quorumVotesBPS_: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<TaiyiDaoImmutable>;
    getDeployTransaction(timelock_: string, sifus_: string, admin_: string, vetoer_: string, votingPeriod_: BigNumberish, votingDelay_: BigNumberish, proposalThresholdBPS_: BigNumberish, quorumVotesBPS_: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): TaiyiDaoImmutable;
    connect(signer: Signer): TaiyiDaoImmutable__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): TaiyiDaoImmutable;
}
