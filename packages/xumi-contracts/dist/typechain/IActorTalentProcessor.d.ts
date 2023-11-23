/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface IActorTalentProcessorInterface extends ethers.utils.Interface {
  functions: {
    "checkOccurrence(uint256,uint256)": FunctionFragment;
    "process(uint256,uint256,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "checkOccurrence",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "process",
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "checkOccurrence",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "process", data: BytesLike): Result;

  events: {};
}

export class IActorTalentProcessor extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: IActorTalentProcessorInterface;

  functions: {
    checkOccurrence(
      _actor: BigNumberish,
      _age: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    "checkOccurrence(uint256,uint256)"(
      _actor: BigNumberish,
      _age: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    process(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _age: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "process(uint256,uint256,uint256)"(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _age: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  checkOccurrence(
    _actor: BigNumberish,
    _age: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  "checkOccurrence(uint256,uint256)"(
    _actor: BigNumberish,
    _age: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  process(
    _operator: BigNumberish,
    _actor: BigNumberish,
    _age: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "process(uint256,uint256,uint256)"(
    _operator: BigNumberish,
    _actor: BigNumberish,
    _age: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    checkOccurrence(
      _actor: BigNumberish,
      _age: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "checkOccurrence(uint256,uint256)"(
      _actor: BigNumberish,
      _age: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    process(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _age: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "process(uint256,uint256,uint256)"(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _age: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    checkOccurrence(
      _actor: BigNumberish,
      _age: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "checkOccurrence(uint256,uint256)"(
      _actor: BigNumberish,
      _age: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    process(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _age: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "process(uint256,uint256,uint256)"(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _age: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    checkOccurrence(
      _actor: BigNumberish,
      _age: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "checkOccurrence(uint256,uint256)"(
      _actor: BigNumberish,
      _age: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    process(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _age: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "process(uint256,uint256,uint256)"(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _age: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
