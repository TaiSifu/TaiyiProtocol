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

interface WorldDeadActorsInterface extends ethers.utils.Interface {
  functions: {
    "addDead(uint256,uint256)": FunctionFragment;
    "deadActors(uint256)": FunctionFragment;
    "deadNum()": FunctionFragment;
    "moduleID()": FunctionFragment;
    "tokenJSON(uint256)": FunctionFragment;
    "tokenSVG(uint256,uint256,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "addDead",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "deadActors",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "deadNum", values?: undefined): string;
  encodeFunctionData(functionFragment: "moduleID", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "tokenJSON",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenSVG",
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "addDead", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "deadActors", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "deadNum", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "moduleID", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "tokenJSON", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "tokenSVG", data: BytesLike): Result;

  events: {};
}

export class WorldDeadActors extends Contract {
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

  interface: WorldDeadActorsInterface;

  functions: {
    addDead(
      _operator: BigNumberish,
      _actor: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "addDead(uint256,uint256)"(
      _operator: BigNumberish,
      _actor: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    deadActors(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    "deadActors(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    deadNum(overrides?: CallOverrides): Promise<[BigNumber]>;

    "deadNum()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    moduleID(overrides?: CallOverrides): Promise<[BigNumber]>;

    "moduleID()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    tokenJSON(arg0: BigNumberish, overrides?: CallOverrides): Promise<[string]>;

    "tokenJSON(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    tokenSVG(
      arg0: BigNumberish,
      startY: BigNumberish,
      arg2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string, BigNumber] & { endY: BigNumber }>;

    "tokenSVG(uint256,uint256,uint256)"(
      arg0: BigNumberish,
      startY: BigNumberish,
      arg2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string, BigNumber] & { endY: BigNumber }>;
  };

  addDead(
    _operator: BigNumberish,
    _actor: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "addDead(uint256,uint256)"(
    _operator: BigNumberish,
    _actor: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  deadActors(arg0: BigNumberish, overrides?: CallOverrides): Promise<boolean>;

  "deadActors(uint256)"(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  deadNum(overrides?: CallOverrides): Promise<BigNumber>;

  "deadNum()"(overrides?: CallOverrides): Promise<BigNumber>;

  moduleID(overrides?: CallOverrides): Promise<BigNumber>;

  "moduleID()"(overrides?: CallOverrides): Promise<BigNumber>;

  tokenJSON(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

  "tokenJSON(uint256)"(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  tokenSVG(
    arg0: BigNumberish,
    startY: BigNumberish,
    arg2: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[string, BigNumber] & { endY: BigNumber }>;

  "tokenSVG(uint256,uint256,uint256)"(
    arg0: BigNumberish,
    startY: BigNumberish,
    arg2: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[string, BigNumber] & { endY: BigNumber }>;

  callStatic: {
    addDead(
      _operator: BigNumberish,
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "addDead(uint256,uint256)"(
      _operator: BigNumberish,
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    deadActors(arg0: BigNumberish, overrides?: CallOverrides): Promise<boolean>;

    "deadActors(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    deadNum(overrides?: CallOverrides): Promise<BigNumber>;

    "deadNum()"(overrides?: CallOverrides): Promise<BigNumber>;

    moduleID(overrides?: CallOverrides): Promise<BigNumber>;

    "moduleID()"(overrides?: CallOverrides): Promise<BigNumber>;

    tokenJSON(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

    "tokenJSON(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    tokenSVG(
      arg0: BigNumberish,
      startY: BigNumberish,
      arg2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string, BigNumber] & { endY: BigNumber }>;

    "tokenSVG(uint256,uint256,uint256)"(
      arg0: BigNumberish,
      startY: BigNumberish,
      arg2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string, BigNumber] & { endY: BigNumber }>;
  };

  filters: {};

  estimateGas: {
    addDead(
      _operator: BigNumberish,
      _actor: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "addDead(uint256,uint256)"(
      _operator: BigNumberish,
      _actor: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    deadActors(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "deadActors(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    deadNum(overrides?: CallOverrides): Promise<BigNumber>;

    "deadNum()"(overrides?: CallOverrides): Promise<BigNumber>;

    moduleID(overrides?: CallOverrides): Promise<BigNumber>;

    "moduleID()"(overrides?: CallOverrides): Promise<BigNumber>;

    tokenJSON(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "tokenJSON(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    tokenSVG(
      arg0: BigNumberish,
      startY: BigNumberish,
      arg2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "tokenSVG(uint256,uint256,uint256)"(
      arg0: BigNumberish,
      startY: BigNumberish,
      arg2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addDead(
      _operator: BigNumberish,
      _actor: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "addDead(uint256,uint256)"(
      _operator: BigNumberish,
      _actor: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    deadActors(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "deadActors(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    deadNum(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "deadNum()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    moduleID(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "moduleID()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    tokenJSON(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "tokenJSON(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    tokenSVG(
      arg0: BigNumberish,
      startY: BigNumberish,
      arg2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "tokenSVG(uint256,uint256,uint256)"(
      arg0: BigNumberish,
      startY: BigNumberish,
      arg2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}