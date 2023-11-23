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

interface ActorLocationsInterface extends ethers.utils.Interface {
  functions: {
    "actorFreeTimes(uint256)": FunctionFragment;
    "actorLocations(uint256)": FunctionFragment;
    "finishActorTravel(uint256)": FunctionFragment;
    "isActorLocked(uint256)": FunctionFragment;
    "isActorUnlocked(uint256)": FunctionFragment;
    "locationActors(uint256,uint256)": FunctionFragment;
    "lockActor(uint256,uint256,uint256)": FunctionFragment;
    "moduleID()": FunctionFragment;
    "setActorLocation(uint256,uint256,uint256,uint256)": FunctionFragment;
    "tokenJSON(uint256)": FunctionFragment;
    "tokenSVG(uint256,uint256,uint256)": FunctionFragment;
    "tokenURI(uint256)": FunctionFragment;
    "unlockActor(uint256,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "actorFreeTimes",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "actorLocations",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "finishActorTravel",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "isActorLocked",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "isActorUnlocked",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "locationActors",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "lockActor",
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "moduleID", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "setActorLocation",
    values: [BigNumberish, BigNumberish, BigNumberish, BigNumberish]
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
  encodeFunctionData(
    functionFragment: "unlockActor",
    values: [BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "actorFreeTimes",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "actorLocations",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "finishActorTravel",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isActorLocked",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isActorUnlocked",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "locationActors",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "lockActor", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "moduleID", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setActorLocation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "tokenJSON", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "tokenSVG", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "tokenURI", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "unlockActor",
    data: BytesLike
  ): Result;

  events: {
    "ActorLocationChanged(uint256,uint256,uint256,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ActorLocationChanged"): EventFragment;
}

export class ActorLocations extends Contract {
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

  interface: ActorLocationsInterface;

  functions: {
    actorFreeTimes(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "actorFreeTimes(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    actorLocations(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    "actorLocations(uint256)"(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    finishActorTravel(
      _actor: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "finishActorTravel(uint256)"(
      _actor: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    isActorLocked(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    "isActorLocked(uint256)"(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    isActorUnlocked(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    "isActorUnlocked(uint256)"(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    locationActors(
      _A: BigNumberish,
      _B: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    "locationActors(uint256,uint256)"(
      _A: BigNumberish,
      _B: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    lockActor(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _freeTime: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "lockActor(uint256,uint256,uint256)"(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _freeTime: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    moduleID(overrides?: CallOverrides): Promise<[BigNumber]>;

    "moduleID()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    setActorLocation(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _A: BigNumberish,
      _B: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "setActorLocation(uint256,uint256,uint256,uint256)"(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _A: BigNumberish,
      _B: BigNumberish,
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

    unlockActor(
      _operator: BigNumberish,
      _actor: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "unlockActor(uint256,uint256)"(
      _operator: BigNumberish,
      _actor: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  actorFreeTimes(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "actorFreeTimes(uint256)"(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  actorLocations(
    _actor: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  "actorLocations(uint256)"(
    _actor: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  finishActorTravel(
    _actor: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "finishActorTravel(uint256)"(
    _actor: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  isActorLocked(
    _actor: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  "isActorLocked(uint256)"(
    _actor: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  isActorUnlocked(
    _actor: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  "isActorUnlocked(uint256)"(
    _actor: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  locationActors(
    _A: BigNumberish,
    _B: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  "locationActors(uint256,uint256)"(
    _A: BigNumberish,
    _B: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  lockActor(
    _operator: BigNumberish,
    _actor: BigNumberish,
    _freeTime: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "lockActor(uint256,uint256,uint256)"(
    _operator: BigNumberish,
    _actor: BigNumberish,
    _freeTime: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  moduleID(overrides?: CallOverrides): Promise<BigNumber>;

  "moduleID()"(overrides?: CallOverrides): Promise<BigNumber>;

  setActorLocation(
    _operator: BigNumberish,
    _actor: BigNumberish,
    _A: BigNumberish,
    _B: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "setActorLocation(uint256,uint256,uint256,uint256)"(
    _operator: BigNumberish,
    _actor: BigNumberish,
    _A: BigNumberish,
    _B: BigNumberish,
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

  unlockActor(
    _operator: BigNumberish,
    _actor: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "unlockActor(uint256,uint256)"(
    _operator: BigNumberish,
    _actor: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    actorFreeTimes(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "actorFreeTimes(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    actorLocations(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    "actorLocations(uint256)"(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    finishActorTravel(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "finishActorTravel(uint256)"(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    isActorLocked(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "isActorLocked(uint256)"(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isActorUnlocked(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "isActorUnlocked(uint256)"(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    locationActors(
      _A: BigNumberish,
      _B: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    "locationActors(uint256,uint256)"(
      _A: BigNumberish,
      _B: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    lockActor(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _freeTime: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "lockActor(uint256,uint256,uint256)"(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _freeTime: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    moduleID(overrides?: CallOverrides): Promise<BigNumber>;

    "moduleID()"(overrides?: CallOverrides): Promise<BigNumber>;

    setActorLocation(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _A: BigNumberish,
      _B: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "setActorLocation(uint256,uint256,uint256,uint256)"(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _A: BigNumberish,
      _B: BigNumberish,
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

    unlockActor(
      _operator: BigNumberish,
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "unlockActor(uint256,uint256)"(
      _operator: BigNumberish,
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    ActorLocationChanged(
      actor: BigNumberish | null,
      oldA: BigNumberish | null,
      oldB: BigNumberish | null,
      newA: null,
      newB: null
    ): TypedEventFilter<
      [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber],
      {
        actor: BigNumber;
        oldA: BigNumber;
        oldB: BigNumber;
        newA: BigNumber;
        newB: BigNumber;
      }
    >;
  };

  estimateGas: {
    actorFreeTimes(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "actorFreeTimes(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    actorLocations(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "actorLocations(uint256)"(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    finishActorTravel(
      _actor: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "finishActorTravel(uint256)"(
      _actor: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    isActorLocked(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "isActorLocked(uint256)"(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isActorUnlocked(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "isActorUnlocked(uint256)"(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    locationActors(
      _A: BigNumberish,
      _B: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "locationActors(uint256,uint256)"(
      _A: BigNumberish,
      _B: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    lockActor(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _freeTime: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "lockActor(uint256,uint256,uint256)"(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _freeTime: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    moduleID(overrides?: CallOverrides): Promise<BigNumber>;

    "moduleID()"(overrides?: CallOverrides): Promise<BigNumber>;

    setActorLocation(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _A: BigNumberish,
      _B: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "setActorLocation(uint256,uint256,uint256,uint256)"(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _A: BigNumberish,
      _B: BigNumberish,
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

    unlockActor(
      _operator: BigNumberish,
      _actor: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "unlockActor(uint256,uint256)"(
      _operator: BigNumberish,
      _actor: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    actorFreeTimes(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "actorFreeTimes(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    actorLocations(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "actorLocations(uint256)"(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    finishActorTravel(
      _actor: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "finishActorTravel(uint256)"(
      _actor: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    isActorLocked(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "isActorLocked(uint256)"(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isActorUnlocked(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "isActorUnlocked(uint256)"(
      _actor: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    locationActors(
      _A: BigNumberish,
      _B: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "locationActors(uint256,uint256)"(
      _A: BigNumberish,
      _B: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    lockActor(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _freeTime: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "lockActor(uint256,uint256,uint256)"(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _freeTime: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    moduleID(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "moduleID()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setActorLocation(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _A: BigNumberish,
      _B: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "setActorLocation(uint256,uint256,uint256,uint256)"(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _A: BigNumberish,
      _B: BigNumberish,
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

    unlockActor(
      _operator: BigNumberish,
      _actor: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "unlockActor(uint256,uint256)"(
      _operator: BigNumberish,
      _actor: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
