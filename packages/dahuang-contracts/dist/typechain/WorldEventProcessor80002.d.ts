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

interface WorldEventProcessor80002Interface extends ethers.utils.Interface {
  functions: {
    "activeTrigger(uint256,uint256,uint256[],string[])": FunctionFragment;
    "checkBranch(uint256,uint256)": FunctionFragment;
    "checkOccurrence(uint256,uint256)": FunctionFragment;
    "defaultBranchEvent()": FunctionFragment;
    "eventAttributeModifiers(uint256)": FunctionFragment;
    "eventAttributeModifiersToTrigger(uint256)": FunctionFragment;
    "eventInfo(uint256)": FunctionFragment;
    "needActor()": FunctionFragment;
    "nextStoryEventId(uint256)": FunctionFragment;
    "owner()": FunctionFragment;
    "process(uint256,uint256,uint256)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setDefaultBranch(uint256)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "trigrams(uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "activeTrigger",
    values: [BigNumberish, BigNumberish, BigNumberish[], string[]]
  ): string;
  encodeFunctionData(
    functionFragment: "checkBranch",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "checkOccurrence",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "defaultBranchEvent",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "eventAttributeModifiers",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "eventAttributeModifiersToTrigger",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "eventInfo",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "needActor", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "nextStoryEventId",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "process",
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setDefaultBranch",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "trigrams",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "activeTrigger",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "checkBranch",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "checkOccurrence",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "defaultBranchEvent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "eventAttributeModifiers",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "eventAttributeModifiersToTrigger",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "eventInfo", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "needActor", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "nextStoryEventId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "process", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setDefaultBranch",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "trigrams", data: BytesLike): Result;

  events: {
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export class WorldEventProcessor80002 extends Contract {
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

  interface: WorldEventProcessor80002Interface;

  functions: {
    activeTrigger(
      _operator: BigNumberish,
      arg1: BigNumberish,
      _uintParams: BigNumberish[],
      arg3: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "activeTrigger(uint256,uint256,uint256[],string[])"(
      _operator: BigNumberish,
      arg1: BigNumberish,
      _uintParams: BigNumberish[],
      arg3: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    checkBranch(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "checkBranch(uint256,uint256)"(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    checkOccurrence(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    "checkOccurrence(uint256,uint256)"(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    defaultBranchEvent(overrides?: CallOverrides): Promise<[BigNumber]>;

    "defaultBranchEvent()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    eventAttributeModifiers(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    "eventAttributeModifiers(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    eventAttributeModifiersToTrigger(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    "eventAttributeModifiersToTrigger(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    eventInfo(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    "eventInfo(uint256)"(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    needActor(overrides?: CallOverrides): Promise<[BigNumber]>;

    "needActor()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    nextStoryEventId(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "nextStoryEventId(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    "owner()"(overrides?: CallOverrides): Promise<[string]>;

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

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "renounceOwnership()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setDefaultBranch(
      _enentId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "setDefaultBranch(uint256)"(
      _enentId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    trigrams(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    "trigrams(uint256)"(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;
  };

  activeTrigger(
    _operator: BigNumberish,
    arg1: BigNumberish,
    _uintParams: BigNumberish[],
    arg3: string[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "activeTrigger(uint256,uint256,uint256[],string[])"(
    _operator: BigNumberish,
    arg1: BigNumberish,
    _uintParams: BigNumberish[],
    arg3: string[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  checkBranch(
    arg0: BigNumberish,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "checkBranch(uint256,uint256)"(
    arg0: BigNumberish,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  checkOccurrence(
    arg0: BigNumberish,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  "checkOccurrence(uint256,uint256)"(
    arg0: BigNumberish,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  defaultBranchEvent(overrides?: CallOverrides): Promise<BigNumber>;

  "defaultBranchEvent()"(overrides?: CallOverrides): Promise<BigNumber>;

  eventAttributeModifiers(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  "eventAttributeModifiers(uint256)"(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  eventAttributeModifiersToTrigger(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  "eventAttributeModifiersToTrigger(uint256)"(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  eventInfo(_actor: BigNumberish, overrides?: CallOverrides): Promise<string>;

  "eventInfo(uint256)"(
    _actor: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  needActor(overrides?: CallOverrides): Promise<BigNumber>;

  "needActor()"(overrides?: CallOverrides): Promise<BigNumber>;

  nextStoryEventId(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "nextStoryEventId(uint256)"(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  "owner()"(overrides?: CallOverrides): Promise<string>;

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

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "renounceOwnership()"(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setDefaultBranch(
    _enentId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "setDefaultBranch(uint256)"(
    _enentId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "transferOwnership(address)"(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  trigrams(
    _actor: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  "trigrams(uint256)"(
    _actor: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  callStatic: {
    activeTrigger(
      _operator: BigNumberish,
      arg1: BigNumberish,
      _uintParams: BigNumberish[],
      arg3: string[],
      overrides?: CallOverrides
    ): Promise<void>;

    "activeTrigger(uint256,uint256,uint256[],string[])"(
      _operator: BigNumberish,
      arg1: BigNumberish,
      _uintParams: BigNumberish[],
      arg3: string[],
      overrides?: CallOverrides
    ): Promise<void>;

    checkBranch(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "checkBranch(uint256,uint256)"(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    checkOccurrence(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "checkOccurrence(uint256,uint256)"(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    defaultBranchEvent(overrides?: CallOverrides): Promise<BigNumber>;

    "defaultBranchEvent()"(overrides?: CallOverrides): Promise<BigNumber>;

    eventAttributeModifiers(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    "eventAttributeModifiers(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    eventAttributeModifiersToTrigger(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    "eventAttributeModifiersToTrigger(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    eventInfo(_actor: BigNumberish, overrides?: CallOverrides): Promise<string>;

    "eventInfo(uint256)"(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    needActor(overrides?: CallOverrides): Promise<BigNumber>;

    "needActor()"(overrides?: CallOverrides): Promise<BigNumber>;

    nextStoryEventId(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "nextStoryEventId(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    "owner()"(overrides?: CallOverrides): Promise<string>;

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

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    "renounceOwnership()"(overrides?: CallOverrides): Promise<void>;

    setDefaultBranch(
      _enentId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "setDefaultBranch(uint256)"(
      _enentId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    trigrams(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    "trigrams(uint256)"(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;
  };

  filters: {
    OwnershipTransferred(
      previousOwner: string | null,
      newOwner: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;
  };

  estimateGas: {
    activeTrigger(
      _operator: BigNumberish,
      arg1: BigNumberish,
      _uintParams: BigNumberish[],
      arg3: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "activeTrigger(uint256,uint256,uint256[],string[])"(
      _operator: BigNumberish,
      arg1: BigNumberish,
      _uintParams: BigNumberish[],
      arg3: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    checkBranch(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "checkBranch(uint256,uint256)"(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    checkOccurrence(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "checkOccurrence(uint256,uint256)"(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    defaultBranchEvent(overrides?: CallOverrides): Promise<BigNumber>;

    "defaultBranchEvent()"(overrides?: CallOverrides): Promise<BigNumber>;

    eventAttributeModifiers(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "eventAttributeModifiers(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    eventAttributeModifiersToTrigger(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "eventAttributeModifiersToTrigger(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    eventInfo(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "eventInfo(uint256)"(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    needActor(overrides?: CallOverrides): Promise<BigNumber>;

    "needActor()"(overrides?: CallOverrides): Promise<BigNumber>;

    nextStoryEventId(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "nextStoryEventId(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    "owner()"(overrides?: CallOverrides): Promise<BigNumber>;

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

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "renounceOwnership()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setDefaultBranch(
      _enentId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "setDefaultBranch(uint256)"(
      _enentId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    trigrams(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "trigrams(uint256)"(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    activeTrigger(
      _operator: BigNumberish,
      arg1: BigNumberish,
      _uintParams: BigNumberish[],
      arg3: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "activeTrigger(uint256,uint256,uint256[],string[])"(
      _operator: BigNumberish,
      arg1: BigNumberish,
      _uintParams: BigNumberish[],
      arg3: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    checkBranch(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "checkBranch(uint256,uint256)"(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    checkOccurrence(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "checkOccurrence(uint256,uint256)"(
      arg0: BigNumberish,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    defaultBranchEvent(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "defaultBranchEvent()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    eventAttributeModifiers(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "eventAttributeModifiers(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    eventAttributeModifiersToTrigger(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "eventAttributeModifiersToTrigger(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    eventInfo(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "eventInfo(uint256)"(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    needActor(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "needActor()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nextStoryEventId(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "nextStoryEventId(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "owner()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

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

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "renounceOwnership()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setDefaultBranch(
      _enentId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "setDefaultBranch(uint256)"(
      _enentId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    trigrams(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "trigrams(uint256)"(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
