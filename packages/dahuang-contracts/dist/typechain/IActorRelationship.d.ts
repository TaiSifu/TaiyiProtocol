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

interface IActorRelationshipInterface extends ethers.utils.Interface {
  functions: {
    "actorRelationPeople(uint256,uint256)": FunctionFragment;
    "actorRelations(uint256,uint256)": FunctionFragment;
    "moduleID()": FunctionFragment;
    "relationProcessors(uint256)": FunctionFragment;
    "relations(uint256)": FunctionFragment;
    "setActorRelation(uint256,uint256,uint256,uint256)": FunctionFragment;
    "setRelation(uint256,string)": FunctionFragment;
    "setRelationProcessor(uint256,address)": FunctionFragment;
    "tokenJSON(uint256)": FunctionFragment;
    "tokenSVG(uint256,uint256,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "actorRelationPeople",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "actorRelations",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "moduleID", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "relationProcessors",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "relations",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setActorRelation",
    values: [BigNumberish, BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setRelation",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "setRelationProcessor",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenJSON",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenSVG",
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "actorRelationPeople",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "actorRelations",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "moduleID", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "relationProcessors",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "relations", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setActorRelation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setRelation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setRelationProcessor",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "tokenJSON", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "tokenSVG", data: BytesLike): Result;

  events: {
    "RelationUpdated(uint256,uint256,uint256,string)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "RelationUpdated"): EventFragment;
}

export class IActorRelationship extends Contract {
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

  interface: IActorRelationshipInterface;

  functions: {
    actorRelationPeople(
      _actor: BigNumberish,
      _rsid: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    "actorRelationPeople(uint256,uint256)"(
      _actor: BigNumberish,
      _rsid: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    actorRelations(
      _actor: BigNumberish,
      _target: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "actorRelations(uint256,uint256)"(
      _actor: BigNumberish,
      _target: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    moduleID(overrides?: CallOverrides): Promise<[BigNumber]>;

    "moduleID()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    relationProcessors(
      _id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    "relationProcessors(uint256)"(
      _id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    relations(
      _rsid: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    "relations(uint256)"(
      _rsid: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    setActorRelation(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _target: BigNumberish,
      _rsid: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "setActorRelation(uint256,uint256,uint256,uint256)"(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _target: BigNumberish,
      _rsid: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setRelation(
      _rsid: BigNumberish,
      _name: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "setRelation(uint256,string)"(
      _rsid: BigNumberish,
      _name: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setRelationProcessor(
      _rsid: BigNumberish,
      _processorAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "setRelationProcessor(uint256,address)"(
      _rsid: BigNumberish,
      _processorAddress: string,
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
  };

  actorRelationPeople(
    _actor: BigNumberish,
    _rsid: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  "actorRelationPeople(uint256,uint256)"(
    _actor: BigNumberish,
    _rsid: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  actorRelations(
    _actor: BigNumberish,
    _target: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "actorRelations(uint256,uint256)"(
    _actor: BigNumberish,
    _target: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  moduleID(overrides?: CallOverrides): Promise<BigNumber>;

  "moduleID()"(overrides?: CallOverrides): Promise<BigNumber>;

  relationProcessors(
    _id: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  "relationProcessors(uint256)"(
    _id: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  relations(_rsid: BigNumberish, overrides?: CallOverrides): Promise<string>;

  "relations(uint256)"(
    _rsid: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  setActorRelation(
    _operator: BigNumberish,
    _actor: BigNumberish,
    _target: BigNumberish,
    _rsid: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "setActorRelation(uint256,uint256,uint256,uint256)"(
    _operator: BigNumberish,
    _actor: BigNumberish,
    _target: BigNumberish,
    _rsid: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setRelation(
    _rsid: BigNumberish,
    _name: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "setRelation(uint256,string)"(
    _rsid: BigNumberish,
    _name: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setRelationProcessor(
    _rsid: BigNumberish,
    _processorAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "setRelationProcessor(uint256,address)"(
    _rsid: BigNumberish,
    _processorAddress: string,
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

  callStatic: {
    actorRelationPeople(
      _actor: BigNumberish,
      _rsid: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    "actorRelationPeople(uint256,uint256)"(
      _actor: BigNumberish,
      _rsid: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    actorRelations(
      _actor: BigNumberish,
      _target: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "actorRelations(uint256,uint256)"(
      _actor: BigNumberish,
      _target: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    moduleID(overrides?: CallOverrides): Promise<BigNumber>;

    "moduleID()"(overrides?: CallOverrides): Promise<BigNumber>;

    relationProcessors(
      _id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    "relationProcessors(uint256)"(
      _id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    relations(_rsid: BigNumberish, overrides?: CallOverrides): Promise<string>;

    "relations(uint256)"(
      _rsid: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    setActorRelation(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _target: BigNumberish,
      _rsid: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "setActorRelation(uint256,uint256,uint256,uint256)"(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _target: BigNumberish,
      _rsid: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setRelation(
      _rsid: BigNumberish,
      _name: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "setRelation(uint256,string)"(
      _rsid: BigNumberish,
      _name: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setRelationProcessor(
      _rsid: BigNumberish,
      _processorAddress: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "setRelationProcessor(uint256,address)"(
      _rsid: BigNumberish,
      _processorAddress: string,
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
  };

  filters: {
    RelationUpdated(
      actor: BigNumberish | null,
      target: BigNumberish | null,
      rsid: BigNumberish | null,
      rsname: null
    ): TypedEventFilter<
      [BigNumber, BigNumber, BigNumber, string],
      { actor: BigNumber; target: BigNumber; rsid: BigNumber; rsname: string }
    >;
  };

  estimateGas: {
    actorRelationPeople(
      _actor: BigNumberish,
      _rsid: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "actorRelationPeople(uint256,uint256)"(
      _actor: BigNumberish,
      _rsid: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    actorRelations(
      _actor: BigNumberish,
      _target: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "actorRelations(uint256,uint256)"(
      _actor: BigNumberish,
      _target: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    moduleID(overrides?: CallOverrides): Promise<BigNumber>;

    "moduleID()"(overrides?: CallOverrides): Promise<BigNumber>;

    relationProcessors(
      _id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "relationProcessors(uint256)"(
      _id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    relations(
      _rsid: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "relations(uint256)"(
      _rsid: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setActorRelation(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _target: BigNumberish,
      _rsid: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "setActorRelation(uint256,uint256,uint256,uint256)"(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _target: BigNumberish,
      _rsid: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setRelation(
      _rsid: BigNumberish,
      _name: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "setRelation(uint256,string)"(
      _rsid: BigNumberish,
      _name: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setRelationProcessor(
      _rsid: BigNumberish,
      _processorAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "setRelationProcessor(uint256,address)"(
      _rsid: BigNumberish,
      _processorAddress: string,
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
  };

  populateTransaction: {
    actorRelationPeople(
      _actor: BigNumberish,
      _rsid: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "actorRelationPeople(uint256,uint256)"(
      _actor: BigNumberish,
      _rsid: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    actorRelations(
      _actor: BigNumberish,
      _target: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "actorRelations(uint256,uint256)"(
      _actor: BigNumberish,
      _target: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    moduleID(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "moduleID()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    relationProcessors(
      _id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "relationProcessors(uint256)"(
      _id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    relations(
      _rsid: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "relations(uint256)"(
      _rsid: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setActorRelation(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _target: BigNumberish,
      _rsid: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "setActorRelation(uint256,uint256,uint256,uint256)"(
      _operator: BigNumberish,
      _actor: BigNumberish,
      _target: BigNumberish,
      _rsid: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setRelation(
      _rsid: BigNumberish,
      _name: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "setRelation(uint256,string)"(
      _rsid: BigNumberish,
      _name: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setRelationProcessor(
      _rsid: BigNumberish,
      _processorAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "setRelationProcessor(uint256,address)"(
      _rsid: BigNumberish,
      _processorAddress: string,
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
  };
}