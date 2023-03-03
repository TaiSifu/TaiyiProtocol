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

interface ParameterizedStorylinesInterface extends ethers.utils.Interface {
  functions: {
    "currentActorEventByStoryId(uint256,uint256)": FunctionFragment;
    "currentActorStoryByIndex(uint256,uint256)": FunctionFragment;
    "currentActorStoryNum(uint256)": FunctionFragment;
    "currentStoryActorByIndex(uint256,uint256)": FunctionFragment;
    "currentStoryActorNum(uint256)": FunctionFragment;
    "currentStoryByIndex(uint256)": FunctionFragment;
    "currentStoryNum()": FunctionFragment;
    "isActorInStory(uint256,uint256)": FunctionFragment;
    "isStoryExist(uint256)": FunctionFragment;
    "moduleID()": FunctionFragment;
    "onERC721Received(address,address,uint256,bytes)": FunctionFragment;
    "setActorStory(uint256,uint256,uint256,uint256)": FunctionFragment;
    "setStoryParameters(uint256,uint256,string[])": FunctionFragment;
    "storyHistoryNum(uint256)": FunctionFragment;
    "storyStringParameters(uint256)": FunctionFragment;
    "storyUIntParameters(uint256)": FunctionFragment;
    "tokenJSON(uint256)": FunctionFragment;
    "tokenSVG(uint256,uint256,uint256)": FunctionFragment;
    "triggerActorEvent(uint256,uint256,uint256,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "currentActorEventByStoryId",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "currentActorStoryByIndex",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "currentActorStoryNum",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "currentStoryActorByIndex",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "currentStoryActorNum",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "currentStoryByIndex",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "currentStoryNum",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "isActorInStory",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "isStoryExist",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "moduleID", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "onERC721Received",
    values: [string, string, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setActorStory",
    values: [BigNumberish, BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setStoryParameters",
    values: [BigNumberish, BigNumberish, string[]]
  ): string;
  encodeFunctionData(
    functionFragment: "storyHistoryNum",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "storyStringParameters",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "storyUIntParameters",
    values: [BigNumberish]
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
    functionFragment: "triggerActorEvent",
    values: [BigNumberish, BigNumberish, BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "currentActorEventByStoryId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "currentActorStoryByIndex",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "currentActorStoryNum",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "currentStoryActorByIndex",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "currentStoryActorNum",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "currentStoryByIndex",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "currentStoryNum",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isActorInStory",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isStoryExist",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "moduleID", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "onERC721Received",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setActorStory",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setStoryParameters",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "storyHistoryNum",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "storyStringParameters",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "storyUIntParameters",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "tokenJSON", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "tokenSVG", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "triggerActorEvent",
    data: BytesLike
  ): Result;

  events: {};
}

export class ParameterizedStorylines extends Contract {
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

  interface: ParameterizedStorylinesInterface;

  functions: {
    currentActorEventByStoryId(
      _actor: BigNumberish,
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "currentActorEventByStoryId(uint256,uint256)"(
      _actor: BigNumberish,
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    currentActorStoryByIndex(
      _actor: BigNumberish,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "currentActorStoryByIndex(uint256,uint256)"(
      _actor: BigNumberish,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    currentActorStoryNum(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "currentActorStoryNum(uint256)"(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    currentStoryActorByIndex(
      _storyEvtId: BigNumberish,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "currentStoryActorByIndex(uint256,uint256)"(
      _storyEvtId: BigNumberish,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    currentStoryActorNum(
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "currentStoryActorNum(uint256)"(
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    currentStoryByIndex(
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "currentStoryByIndex(uint256)"(
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    currentStoryNum(overrides?: CallOverrides): Promise<[BigNumber]>;

    "currentStoryNum()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    isActorInStory(
      _actor: BigNumberish,
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    "isActorInStory(uint256,uint256)"(
      _actor: BigNumberish,
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    isStoryExist(
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    "isStoryExist(uint256)"(
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    moduleID(overrides?: CallOverrides): Promise<[BigNumber]>;

    "moduleID()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    onERC721Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "onERC721Received(address,address,uint256,bytes)"(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setActorStory(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _storyEvtId: BigNumberish,
      _eventId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "setActorStory(uint256,uint256,uint256,uint256)"(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _storyEvtId: BigNumberish,
      _eventId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "setStoryParameters(uint256,uint256,string[])"(
      _operator: BigNumberish,
      _storyEvtId: BigNumberish,
      _params: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "setStoryParameters(uint256,uint256,uint256[])"(
      _operator: BigNumberish,
      _storyEvtId: BigNumberish,
      _params: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    storyHistoryNum(
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "storyHistoryNum(uint256)"(
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    storyStringParameters(
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string[]]>;

    "storyStringParameters(uint256)"(
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string[]]>;

    storyUIntParameters(
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    "storyUIntParameters(uint256)"(
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    tokenJSON(arg0: BigNumberish, overrides?: CallOverrides): Promise<[string]>;

    "tokenJSON(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    tokenSVG(
      arg0: BigNumberish,
      _startY: BigNumberish,
      arg2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string, BigNumber] & { _endY: BigNumber }>;

    "tokenSVG(uint256,uint256,uint256)"(
      arg0: BigNumberish,
      _startY: BigNumberish,
      arg2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string, BigNumber] & { _endY: BigNumber }>;

    triggerActorEvent(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _triggerActor: BigNumberish,
      _eventId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "triggerActorEvent(uint256,uint256,uint256,uint256)"(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _triggerActor: BigNumberish,
      _eventId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  currentActorEventByStoryId(
    _actor: BigNumberish,
    _storyEvtId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "currentActorEventByStoryId(uint256,uint256)"(
    _actor: BigNumberish,
    _storyEvtId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  currentActorStoryByIndex(
    _actor: BigNumberish,
    _index: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "currentActorStoryByIndex(uint256,uint256)"(
    _actor: BigNumberish,
    _index: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  currentActorStoryNum(
    _actor: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "currentActorStoryNum(uint256)"(
    _actor: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  currentStoryActorByIndex(
    _storyEvtId: BigNumberish,
    _index: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "currentStoryActorByIndex(uint256,uint256)"(
    _storyEvtId: BigNumberish,
    _index: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  currentStoryActorNum(
    _storyEvtId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "currentStoryActorNum(uint256)"(
    _storyEvtId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  currentStoryByIndex(
    _index: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "currentStoryByIndex(uint256)"(
    _index: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  currentStoryNum(overrides?: CallOverrides): Promise<BigNumber>;

  "currentStoryNum()"(overrides?: CallOverrides): Promise<BigNumber>;

  isActorInStory(
    _actor: BigNumberish,
    _storyEvtId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  "isActorInStory(uint256,uint256)"(
    _actor: BigNumberish,
    _storyEvtId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  isStoryExist(
    _storyEvtId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  "isStoryExist(uint256)"(
    _storyEvtId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  moduleID(overrides?: CallOverrides): Promise<BigNumber>;

  "moduleID()"(overrides?: CallOverrides): Promise<BigNumber>;

  onERC721Received(
    arg0: string,
    arg1: string,
    arg2: BigNumberish,
    arg3: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "onERC721Received(address,address,uint256,bytes)"(
    arg0: string,
    arg1: string,
    arg2: BigNumberish,
    arg3: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setActorStory(
    _operator: BigNumberish,
    _actor: BigNumberish,
    _storyEvtId: BigNumberish,
    _eventId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "setActorStory(uint256,uint256,uint256,uint256)"(
    _operator: BigNumberish,
    _actor: BigNumberish,
    _storyEvtId: BigNumberish,
    _eventId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "setStoryParameters(uint256,uint256,string[])"(
    _operator: BigNumberish,
    _storyEvtId: BigNumberish,
    _params: string[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "setStoryParameters(uint256,uint256,uint256[])"(
    _operator: BigNumberish,
    _storyEvtId: BigNumberish,
    _params: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  storyHistoryNum(
    _storyEvtId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "storyHistoryNum(uint256)"(
    _storyEvtId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  storyStringParameters(
    _storyEvtId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string[]>;

  "storyStringParameters(uint256)"(
    _storyEvtId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string[]>;

  storyUIntParameters(
    _storyEvtId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  "storyUIntParameters(uint256)"(
    _storyEvtId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  tokenJSON(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

  "tokenJSON(uint256)"(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  tokenSVG(
    arg0: BigNumberish,
    _startY: BigNumberish,
    arg2: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[string, BigNumber] & { _endY: BigNumber }>;

  "tokenSVG(uint256,uint256,uint256)"(
    arg0: BigNumberish,
    _startY: BigNumberish,
    arg2: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[string, BigNumber] & { _endY: BigNumber }>;

  triggerActorEvent(
    _operator: BigNumberish,
    _actor: BigNumberish,
    _triggerActor: BigNumberish,
    _eventId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "triggerActorEvent(uint256,uint256,uint256,uint256)"(
    _operator: BigNumberish,
    _actor: BigNumberish,
    _triggerActor: BigNumberish,
    _eventId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    currentActorEventByStoryId(
      _actor: BigNumberish,
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "currentActorEventByStoryId(uint256,uint256)"(
      _actor: BigNumberish,
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    currentActorStoryByIndex(
      _actor: BigNumberish,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "currentActorStoryByIndex(uint256,uint256)"(
      _actor: BigNumberish,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    currentActorStoryNum(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "currentActorStoryNum(uint256)"(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    currentStoryActorByIndex(
      _storyEvtId: BigNumberish,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "currentStoryActorByIndex(uint256,uint256)"(
      _storyEvtId: BigNumberish,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    currentStoryActorNum(
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "currentStoryActorNum(uint256)"(
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    currentStoryByIndex(
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "currentStoryByIndex(uint256)"(
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    currentStoryNum(overrides?: CallOverrides): Promise<BigNumber>;

    "currentStoryNum()"(overrides?: CallOverrides): Promise<BigNumber>;

    isActorInStory(
      _actor: BigNumberish,
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "isActorInStory(uint256,uint256)"(
      _actor: BigNumberish,
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isStoryExist(
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "isStoryExist(uint256)"(
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    moduleID(overrides?: CallOverrides): Promise<BigNumber>;

    "moduleID()"(overrides?: CallOverrides): Promise<BigNumber>;

    onERC721Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    "onERC721Received(address,address,uint256,bytes)"(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    setActorStory(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _storyEvtId: BigNumberish,
      _eventId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "setActorStory(uint256,uint256,uint256,uint256)"(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _storyEvtId: BigNumberish,
      _eventId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "setStoryParameters(uint256,uint256,string[])"(
      _operator: BigNumberish,
      _storyEvtId: BigNumberish,
      _params: string[],
      overrides?: CallOverrides
    ): Promise<void>;

    "setStoryParameters(uint256,uint256,uint256[])"(
      _operator: BigNumberish,
      _storyEvtId: BigNumberish,
      _params: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    storyHistoryNum(
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "storyHistoryNum(uint256)"(
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    storyStringParameters(
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string[]>;

    "storyStringParameters(uint256)"(
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string[]>;

    storyUIntParameters(
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    "storyUIntParameters(uint256)"(
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    tokenJSON(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

    "tokenJSON(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    tokenSVG(
      arg0: BigNumberish,
      _startY: BigNumberish,
      arg2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string, BigNumber] & { _endY: BigNumber }>;

    "tokenSVG(uint256,uint256,uint256)"(
      arg0: BigNumberish,
      _startY: BigNumberish,
      arg2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string, BigNumber] & { _endY: BigNumber }>;

    triggerActorEvent(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _triggerActor: BigNumberish,
      _eventId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "triggerActorEvent(uint256,uint256,uint256,uint256)"(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _triggerActor: BigNumberish,
      _eventId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    currentActorEventByStoryId(
      _actor: BigNumberish,
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "currentActorEventByStoryId(uint256,uint256)"(
      _actor: BigNumberish,
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    currentActorStoryByIndex(
      _actor: BigNumberish,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "currentActorStoryByIndex(uint256,uint256)"(
      _actor: BigNumberish,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    currentActorStoryNum(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "currentActorStoryNum(uint256)"(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    currentStoryActorByIndex(
      _storyEvtId: BigNumberish,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "currentStoryActorByIndex(uint256,uint256)"(
      _storyEvtId: BigNumberish,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    currentStoryActorNum(
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "currentStoryActorNum(uint256)"(
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    currentStoryByIndex(
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "currentStoryByIndex(uint256)"(
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    currentStoryNum(overrides?: CallOverrides): Promise<BigNumber>;

    "currentStoryNum()"(overrides?: CallOverrides): Promise<BigNumber>;

    isActorInStory(
      _actor: BigNumberish,
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "isActorInStory(uint256,uint256)"(
      _actor: BigNumberish,
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isStoryExist(
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "isStoryExist(uint256)"(
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    moduleID(overrides?: CallOverrides): Promise<BigNumber>;

    "moduleID()"(overrides?: CallOverrides): Promise<BigNumber>;

    onERC721Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "onERC721Received(address,address,uint256,bytes)"(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setActorStory(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _storyEvtId: BigNumberish,
      _eventId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "setActorStory(uint256,uint256,uint256,uint256)"(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _storyEvtId: BigNumberish,
      _eventId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "setStoryParameters(uint256,uint256,string[])"(
      _operator: BigNumberish,
      _storyEvtId: BigNumberish,
      _params: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "setStoryParameters(uint256,uint256,uint256[])"(
      _operator: BigNumberish,
      _storyEvtId: BigNumberish,
      _params: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    storyHistoryNum(
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "storyHistoryNum(uint256)"(
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    storyStringParameters(
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "storyStringParameters(uint256)"(
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    storyUIntParameters(
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "storyUIntParameters(uint256)"(
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

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
      _startY: BigNumberish,
      arg2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "tokenSVG(uint256,uint256,uint256)"(
      arg0: BigNumberish,
      _startY: BigNumberish,
      arg2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    triggerActorEvent(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _triggerActor: BigNumberish,
      _eventId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "triggerActorEvent(uint256,uint256,uint256,uint256)"(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _triggerActor: BigNumberish,
      _eventId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    currentActorEventByStoryId(
      _actor: BigNumberish,
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "currentActorEventByStoryId(uint256,uint256)"(
      _actor: BigNumberish,
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    currentActorStoryByIndex(
      _actor: BigNumberish,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "currentActorStoryByIndex(uint256,uint256)"(
      _actor: BigNumberish,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    currentActorStoryNum(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "currentActorStoryNum(uint256)"(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    currentStoryActorByIndex(
      _storyEvtId: BigNumberish,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "currentStoryActorByIndex(uint256,uint256)"(
      _storyEvtId: BigNumberish,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    currentStoryActorNum(
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "currentStoryActorNum(uint256)"(
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    currentStoryByIndex(
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "currentStoryByIndex(uint256)"(
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    currentStoryNum(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "currentStoryNum()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isActorInStory(
      _actor: BigNumberish,
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "isActorInStory(uint256,uint256)"(
      _actor: BigNumberish,
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isStoryExist(
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "isStoryExist(uint256)"(
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    moduleID(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "moduleID()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    onERC721Received(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "onERC721Received(address,address,uint256,bytes)"(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setActorStory(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _storyEvtId: BigNumberish,
      _eventId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "setActorStory(uint256,uint256,uint256,uint256)"(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _storyEvtId: BigNumberish,
      _eventId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "setStoryParameters(uint256,uint256,string[])"(
      _operator: BigNumberish,
      _storyEvtId: BigNumberish,
      _params: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "setStoryParameters(uint256,uint256,uint256[])"(
      _operator: BigNumberish,
      _storyEvtId: BigNumberish,
      _params: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    storyHistoryNum(
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "storyHistoryNum(uint256)"(
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    storyStringParameters(
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "storyStringParameters(uint256)"(
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    storyUIntParameters(
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "storyUIntParameters(uint256)"(
      _storyEvtId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

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
      _startY: BigNumberish,
      arg2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "tokenSVG(uint256,uint256,uint256)"(
      arg0: BigNumberish,
      _startY: BigNumberish,
      arg2: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    triggerActorEvent(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _triggerActor: BigNumberish,
      _eventId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "triggerActorEvent(uint256,uint256,uint256,uint256)"(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _triggerActor: BigNumberish,
      _eventId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
