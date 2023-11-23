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

interface ActorBehaviorAttributesInterface extends ethers.utils.Interface {
  functions: {
    "ACT_RECOVER_TIME_DAY()": FunctionFragment;
    "applyModified(uint256,int256[])": FunctionFragment;
    "attributeLabels(uint256)": FunctionFragment;
    "attributesScores(uint256,uint256)": FunctionFragment;
    "canRecoverAct(uint256)": FunctionFragment;
    "characterPointsInitiated(uint256)": FunctionFragment;
    "getActorMaxRecoverAct(uint256)": FunctionFragment;
    "lastActRecoverTimeStamps(uint256)": FunctionFragment;
    "moduleID()": FunctionFragment;
    "pointActor(uint256,uint256)": FunctionFragment;
    "recoverAct(uint256)": FunctionFragment;
    "setAttributes(uint256,uint256,uint256[])": FunctionFragment;
    "tokenJSON(uint256)": FunctionFragment;
    "tokenSVG(uint256,uint256,uint256)": FunctionFragment;
    "tokenURI(uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "ACT_RECOVER_TIME_DAY",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "applyModified",
    values: [BigNumberish, BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "attributeLabels",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "attributesScores",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "canRecoverAct",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "characterPointsInitiated",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getActorMaxRecoverAct",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "lastActRecoverTimeStamps",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "moduleID", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "pointActor",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "recoverAct",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setAttributes",
    values: [BigNumberish, BigNumberish, BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenJSON",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenSVG",
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenURI",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "ACT_RECOVER_TIME_DAY",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "applyModified",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "attributeLabels",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "attributesScores",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "canRecoverAct",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "characterPointsInitiated",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getActorMaxRecoverAct",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "lastActRecoverTimeStamps",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "moduleID", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pointActor", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "recoverAct", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setAttributes",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "tokenJSON", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "tokenSVG", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "tokenURI", data: BytesLike): Result;

  events: {
    "ActRecovered(uint256,uint256)": EventFragment;
    "Created(address,uint256,uint256[])": EventFragment;
    "Updated(address,uint256,uint256[])": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ActRecovered"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Created"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Updated"): EventFragment;
}

export class ActorBehaviorAttributes extends Contract {
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

  interface: ActorBehaviorAttributesInterface;

  functions: {
    ACT_RECOVER_TIME_DAY(overrides?: CallOverrides): Promise<[BigNumber]>;

    "ACT_RECOVER_TIME_DAY()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    applyModified(
      _actor: BigNumberish,
      _modifiers: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<[BigNumber[], boolean]>;

    "applyModified(uint256,int256[])"(
      _actor: BigNumberish,
      _modifiers: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<[BigNumber[], boolean]>;

    attributeLabels(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    "attributeLabels(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    attributesScores(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "attributesScores(uint256,uint256)"(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    canRecoverAct(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    "canRecoverAct(uint256)"(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    characterPointsInitiated(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    "characterPointsInitiated(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    getActorMaxRecoverAct(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "getActorMaxRecoverAct(uint256)"(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    lastActRecoverTimeStamps(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "lastActRecoverTimeStamps(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    moduleID(overrides?: CallOverrides): Promise<[BigNumber]>;

    "moduleID()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    pointActor(
      _operator: BigNumberish,
      _actor: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "pointActor(uint256,uint256)"(
      _operator: BigNumberish,
      _actor: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    recoverAct(
      _actor: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "recoverAct(uint256)"(
      _actor: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setAttributes(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _attributes: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "setAttributes(uint256,uint256,uint256[])"(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _attributes: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

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

    tokenURI(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    "tokenURI(uint256)"(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;
  };

  ACT_RECOVER_TIME_DAY(overrides?: CallOverrides): Promise<BigNumber>;

  "ACT_RECOVER_TIME_DAY()"(overrides?: CallOverrides): Promise<BigNumber>;

  applyModified(
    _actor: BigNumberish,
    _modifiers: BigNumberish[],
    overrides?: CallOverrides
  ): Promise<[BigNumber[], boolean]>;

  "applyModified(uint256,int256[])"(
    _actor: BigNumberish,
    _modifiers: BigNumberish[],
    overrides?: CallOverrides
  ): Promise<[BigNumber[], boolean]>;

  attributeLabels(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  "attributeLabels(uint256)"(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  attributesScores(
    arg0: BigNumberish,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "attributesScores(uint256,uint256)"(
    arg0: BigNumberish,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  canRecoverAct(
    _actor: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  "canRecoverAct(uint256)"(
    _actor: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  characterPointsInitiated(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  "characterPointsInitiated(uint256)"(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  getActorMaxRecoverAct(
    _actor: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "getActorMaxRecoverAct(uint256)"(
    _actor: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  lastActRecoverTimeStamps(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "lastActRecoverTimeStamps(uint256)"(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  moduleID(overrides?: CallOverrides): Promise<BigNumber>;

  "moduleID()"(overrides?: CallOverrides): Promise<BigNumber>;

  pointActor(
    _operator: BigNumberish,
    _actor: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "pointActor(uint256,uint256)"(
    _operator: BigNumberish,
    _actor: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  recoverAct(
    _actor: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "recoverAct(uint256)"(
    _actor: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setAttributes(
    _operator: BigNumberish,
    _actor: BigNumberish,
    _attributes: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "setAttributes(uint256,uint256,uint256[])"(
    _operator: BigNumberish,
    _actor: BigNumberish,
    _attributes: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

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

  tokenURI(_actor: BigNumberish, overrides?: CallOverrides): Promise<string>;

  "tokenURI(uint256)"(
    _actor: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  callStatic: {
    ACT_RECOVER_TIME_DAY(overrides?: CallOverrides): Promise<BigNumber>;

    "ACT_RECOVER_TIME_DAY()"(overrides?: CallOverrides): Promise<BigNumber>;

    applyModified(
      _actor: BigNumberish,
      _modifiers: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<[BigNumber[], boolean]>;

    "applyModified(uint256,int256[])"(
      _actor: BigNumberish,
      _modifiers: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<[BigNumber[], boolean]>;

    attributeLabels(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    "attributeLabels(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    attributesScores(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "attributesScores(uint256,uint256)"(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    canRecoverAct(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "canRecoverAct(uint256)"(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    characterPointsInitiated(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "characterPointsInitiated(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    getActorMaxRecoverAct(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getActorMaxRecoverAct(uint256)"(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    lastActRecoverTimeStamps(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "lastActRecoverTimeStamps(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    moduleID(overrides?: CallOverrides): Promise<BigNumber>;

    "moduleID()"(overrides?: CallOverrides): Promise<BigNumber>;

    pointActor(
      _operator: BigNumberish,
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "pointActor(uint256,uint256)"(
      _operator: BigNumberish,
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    recoverAct(_actor: BigNumberish, overrides?: CallOverrides): Promise<void>;

    "recoverAct(uint256)"(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setAttributes(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _attributes: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    "setAttributes(uint256,uint256,uint256[])"(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _attributes: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

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

    tokenURI(_actor: BigNumberish, overrides?: CallOverrides): Promise<string>;

    "tokenURI(uint256)"(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {
    ActRecovered(
      actor: BigNumberish | null,
      act: BigNumberish | null
    ): TypedEventFilter<
      [BigNumber, BigNumber],
      { actor: BigNumber; act: BigNumber }
    >;

    Created(
      creator: string | null,
      actor: BigNumberish | null,
      attributes: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber[]],
      { creator: string; actor: BigNumber; attributes: BigNumber[] }
    >;

    Updated(
      executor: string | null,
      actor: BigNumberish | null,
      attributes: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber[]],
      { executor: string; actor: BigNumber; attributes: BigNumber[] }
    >;
  };

  estimateGas: {
    ACT_RECOVER_TIME_DAY(overrides?: CallOverrides): Promise<BigNumber>;

    "ACT_RECOVER_TIME_DAY()"(overrides?: CallOverrides): Promise<BigNumber>;

    applyModified(
      _actor: BigNumberish,
      _modifiers: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "applyModified(uint256,int256[])"(
      _actor: BigNumberish,
      _modifiers: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    attributeLabels(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "attributeLabels(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    attributesScores(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "attributesScores(uint256,uint256)"(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    canRecoverAct(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "canRecoverAct(uint256)"(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    characterPointsInitiated(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "characterPointsInitiated(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getActorMaxRecoverAct(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getActorMaxRecoverAct(uint256)"(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    lastActRecoverTimeStamps(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "lastActRecoverTimeStamps(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    moduleID(overrides?: CallOverrides): Promise<BigNumber>;

    "moduleID()"(overrides?: CallOverrides): Promise<BigNumber>;

    pointActor(
      _operator: BigNumberish,
      _actor: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "pointActor(uint256,uint256)"(
      _operator: BigNumberish,
      _actor: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    recoverAct(
      _actor: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "recoverAct(uint256)"(
      _actor: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setAttributes(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _attributes: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "setAttributes(uint256,uint256,uint256[])"(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _attributes: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

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

    tokenURI(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "tokenURI(uint256)"(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    ACT_RECOVER_TIME_DAY(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "ACT_RECOVER_TIME_DAY()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    applyModified(
      _actor: BigNumberish,
      _modifiers: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "applyModified(uint256,int256[])"(
      _actor: BigNumberish,
      _modifiers: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    attributeLabels(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "attributeLabels(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    attributesScores(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "attributesScores(uint256,uint256)"(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    canRecoverAct(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "canRecoverAct(uint256)"(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    characterPointsInitiated(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "characterPointsInitiated(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getActorMaxRecoverAct(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getActorMaxRecoverAct(uint256)"(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    lastActRecoverTimeStamps(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "lastActRecoverTimeStamps(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    moduleID(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "moduleID()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pointActor(
      _operator: BigNumberish,
      _actor: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "pointActor(uint256,uint256)"(
      _operator: BigNumberish,
      _actor: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    recoverAct(
      _actor: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "recoverAct(uint256)"(
      _actor: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setAttributes(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _attributes: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "setAttributes(uint256,uint256,uint256[])"(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _attributes: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

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

    tokenURI(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "tokenURI(uint256)"(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
