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

interface ITrigramsInterface extends ethers.utils.Interface {
  functions: {
    "actorTrigrams(uint256)": FunctionFragment;
    "addActorTrigrams(uint256,uint256,uint256[])": FunctionFragment;
    "moduleID()": FunctionFragment;
    "tokenJSON(uint256)": FunctionFragment;
    "tokenSVG(uint256,uint256,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "actorTrigrams",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "addActorTrigrams",
    values: [BigNumberish, BigNumberish, BigNumberish[]]
  ): string;
  encodeFunctionData(functionFragment: "moduleID", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "tokenJSON",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenSVG",
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "actorTrigrams",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addActorTrigrams",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "moduleID", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "tokenJSON", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "tokenSVG", data: BytesLike): Result;

  events: {
    "TrigramsOut(uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "TrigramsOut"): EventFragment;
}

export class ITrigrams extends Contract {
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

  interface: ITrigramsInterface;

  functions: {
    actorTrigrams(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    "actorTrigrams(uint256)"(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    addActorTrigrams(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _trigramsData: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "addActorTrigrams(uint256,uint256,uint256[])"(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _trigramsData: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    moduleID(overrides?: CallOverrides): Promise<[BigNumber]>;

    "moduleID()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    tokenJSON(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    "tokenJSON(uint256)"(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    tokenSVG(
      _actor: BigNumberish,
      _startY: BigNumberish,
      _lineHeight: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string, BigNumber] & { _endY: BigNumber }>;

    "tokenSVG(uint256,uint256,uint256)"(
      _actor: BigNumberish,
      _startY: BigNumberish,
      _lineHeight: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string, BigNumber] & { _endY: BigNumber }>;
  };

  actorTrigrams(
    _actor: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  "actorTrigrams(uint256)"(
    _actor: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  addActorTrigrams(
    _operator: BigNumberish,
    _actor: BigNumberish,
    _trigramsData: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "addActorTrigrams(uint256,uint256,uint256[])"(
    _operator: BigNumberish,
    _actor: BigNumberish,
    _trigramsData: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  moduleID(overrides?: CallOverrides): Promise<BigNumber>;

  "moduleID()"(overrides?: CallOverrides): Promise<BigNumber>;

  tokenJSON(_actor: BigNumberish, overrides?: CallOverrides): Promise<string>;

  "tokenJSON(uint256)"(
    _actor: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  tokenSVG(
    _actor: BigNumberish,
    _startY: BigNumberish,
    _lineHeight: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[string, BigNumber] & { _endY: BigNumber }>;

  "tokenSVG(uint256,uint256,uint256)"(
    _actor: BigNumberish,
    _startY: BigNumberish,
    _lineHeight: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[string, BigNumber] & { _endY: BigNumber }>;

  callStatic: {
    actorTrigrams(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    "actorTrigrams(uint256)"(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    addActorTrigrams(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _trigramsData: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    "addActorTrigrams(uint256,uint256,uint256[])"(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _trigramsData: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    moduleID(overrides?: CallOverrides): Promise<BigNumber>;

    "moduleID()"(overrides?: CallOverrides): Promise<BigNumber>;

    tokenJSON(_actor: BigNumberish, overrides?: CallOverrides): Promise<string>;

    "tokenJSON(uint256)"(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    tokenSVG(
      _actor: BigNumberish,
      _startY: BigNumberish,
      _lineHeight: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string, BigNumber] & { _endY: BigNumber }>;

    "tokenSVG(uint256,uint256,uint256)"(
      _actor: BigNumberish,
      _startY: BigNumberish,
      _lineHeight: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string, BigNumber] & { _endY: BigNumber }>;
  };

  filters: {
    TrigramsOut(
      actor: BigNumberish | null,
      trigram: BigNumberish | null
    ): TypedEventFilter<
      [BigNumber, BigNumber],
      { actor: BigNumber; trigram: BigNumber }
    >;
  };

  estimateGas: {
    actorTrigrams(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "actorTrigrams(uint256)"(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    addActorTrigrams(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _trigramsData: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "addActorTrigrams(uint256,uint256,uint256[])"(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _trigramsData: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    moduleID(overrides?: CallOverrides): Promise<BigNumber>;

    "moduleID()"(overrides?: CallOverrides): Promise<BigNumber>;

    tokenJSON(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "tokenJSON(uint256)"(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    tokenSVG(
      _actor: BigNumberish,
      _startY: BigNumberish,
      _lineHeight: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "tokenSVG(uint256,uint256,uint256)"(
      _actor: BigNumberish,
      _startY: BigNumberish,
      _lineHeight: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    actorTrigrams(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "actorTrigrams(uint256)"(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    addActorTrigrams(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _trigramsData: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "addActorTrigrams(uint256,uint256,uint256[])"(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _trigramsData: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    moduleID(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "moduleID()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    tokenJSON(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "tokenJSON(uint256)"(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    tokenSVG(
      _actor: BigNumberish,
      _startY: BigNumberish,
      _lineHeight: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "tokenSVG(uint256,uint256,uint256)"(
      _actor: BigNumberish,
      _startY: BigNumberish,
      _lineHeight: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}