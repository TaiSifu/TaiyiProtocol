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
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface DahuangConstantsInterface extends ethers.utils.Interface {
  functions: {
    "ATTR_ACT()": FunctionFragment;
    "ATTR_BASE()": FunctionFragment;
    "ATTR_BASE_BEHAVIOR()": FunctionFragment;
    "ATTR_BASE_CHARM()": FunctionFragment;
    "ATTR_BASE_CORE()": FunctionFragment;
    "ATTR_BASE_MOOD()": FunctionFragment;
    "ATTR_DIL()": FunctionFragment;
    "ATTR_GEG()": FunctionFragment;
    "ATTR_LIM()": FunctionFragment;
    "ATTR_LVL()": FunctionFragment;
    "ATTR_MEL()": FunctionFragment;
    "ATTR_TIZ()": FunctionFragment;
    "ATTR_WUX()": FunctionFragment;
    "ATTR_XIQ()": FunctionFragment;
    "WORLD_MODULE_BEHAVIOR_ATTRIBUTES()": FunctionFragment;
    "WORLD_MODULE_BORN_PLACES()": FunctionFragment;
    "WORLD_MODULE_BUILDINGS()": FunctionFragment;
    "WORLD_MODULE_CHARM_ATTRIBUTES()": FunctionFragment;
    "WORLD_MODULE_CORE_ATTRIBUTES()": FunctionFragment;
    "WORLD_MODULE_EVENTS()": FunctionFragment;
    "WORLD_MODULE_FABRIC()": FunctionFragment;
    "WORLD_MODULE_FOOD()": FunctionFragment;
    "WORLD_MODULE_GOLD()": FunctionFragment;
    "WORLD_MODULE_HERB()": FunctionFragment;
    "WORLD_MODULE_MOOD_ATTRIBUTES()": FunctionFragment;
    "WORLD_MODULE_PRESTIGE()": FunctionFragment;
    "WORLD_MODULE_RELATIONSHIP()": FunctionFragment;
    "WORLD_MODULE_SEASONS()": FunctionFragment;
    "WORLD_MODULE_TALENTS()": FunctionFragment;
    "WORLD_MODULE_TIMELINE()": FunctionFragment;
    "WORLD_MODULE_VILLAGES()": FunctionFragment;
    "WORLD_MODULE_WOOD()": FunctionFragment;
    "WORLD_MODULE_ZONE_BASE_RESOURCES()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "ATTR_ACT", values?: undefined): string;
  encodeFunctionData(functionFragment: "ATTR_BASE", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "ATTR_BASE_BEHAVIOR",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "ATTR_BASE_CHARM",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "ATTR_BASE_CORE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "ATTR_BASE_MOOD",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "ATTR_DIL", values?: undefined): string;
  encodeFunctionData(functionFragment: "ATTR_GEG", values?: undefined): string;
  encodeFunctionData(functionFragment: "ATTR_LIM", values?: undefined): string;
  encodeFunctionData(functionFragment: "ATTR_LVL", values?: undefined): string;
  encodeFunctionData(functionFragment: "ATTR_MEL", values?: undefined): string;
  encodeFunctionData(functionFragment: "ATTR_TIZ", values?: undefined): string;
  encodeFunctionData(functionFragment: "ATTR_WUX", values?: undefined): string;
  encodeFunctionData(functionFragment: "ATTR_XIQ", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "WORLD_MODULE_BEHAVIOR_ATTRIBUTES",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "WORLD_MODULE_BORN_PLACES",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "WORLD_MODULE_BUILDINGS",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "WORLD_MODULE_CHARM_ATTRIBUTES",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "WORLD_MODULE_CORE_ATTRIBUTES",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "WORLD_MODULE_EVENTS",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "WORLD_MODULE_FABRIC",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "WORLD_MODULE_FOOD",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "WORLD_MODULE_GOLD",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "WORLD_MODULE_HERB",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "WORLD_MODULE_MOOD_ATTRIBUTES",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "WORLD_MODULE_PRESTIGE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "WORLD_MODULE_RELATIONSHIP",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "WORLD_MODULE_SEASONS",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "WORLD_MODULE_TALENTS",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "WORLD_MODULE_TIMELINE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "WORLD_MODULE_VILLAGES",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "WORLD_MODULE_WOOD",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "WORLD_MODULE_ZONE_BASE_RESOURCES",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "ATTR_ACT", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "ATTR_BASE", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "ATTR_BASE_BEHAVIOR",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "ATTR_BASE_CHARM",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "ATTR_BASE_CORE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "ATTR_BASE_MOOD",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "ATTR_DIL", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "ATTR_GEG", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "ATTR_LIM", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "ATTR_LVL", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "ATTR_MEL", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "ATTR_TIZ", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "ATTR_WUX", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "ATTR_XIQ", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "WORLD_MODULE_BEHAVIOR_ATTRIBUTES",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "WORLD_MODULE_BORN_PLACES",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "WORLD_MODULE_BUILDINGS",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "WORLD_MODULE_CHARM_ATTRIBUTES",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "WORLD_MODULE_CORE_ATTRIBUTES",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "WORLD_MODULE_EVENTS",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "WORLD_MODULE_FABRIC",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "WORLD_MODULE_FOOD",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "WORLD_MODULE_GOLD",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "WORLD_MODULE_HERB",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "WORLD_MODULE_MOOD_ATTRIBUTES",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "WORLD_MODULE_PRESTIGE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "WORLD_MODULE_RELATIONSHIP",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "WORLD_MODULE_SEASONS",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "WORLD_MODULE_TALENTS",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "WORLD_MODULE_TIMELINE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "WORLD_MODULE_VILLAGES",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "WORLD_MODULE_WOOD",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "WORLD_MODULE_ZONE_BASE_RESOURCES",
    data: BytesLike
  ): Result;

  events: {};
}

export class DahuangConstants extends Contract {
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

  interface: DahuangConstantsInterface;

  functions: {
    ATTR_ACT(overrides?: CallOverrides): Promise<[BigNumber]>;

    "ATTR_ACT()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    ATTR_BASE(overrides?: CallOverrides): Promise<[BigNumber]>;

    "ATTR_BASE()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    ATTR_BASE_BEHAVIOR(overrides?: CallOverrides): Promise<[BigNumber]>;

    "ATTR_BASE_BEHAVIOR()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    ATTR_BASE_CHARM(overrides?: CallOverrides): Promise<[BigNumber]>;

    "ATTR_BASE_CHARM()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    ATTR_BASE_CORE(overrides?: CallOverrides): Promise<[BigNumber]>;

    "ATTR_BASE_CORE()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    ATTR_BASE_MOOD(overrides?: CallOverrides): Promise<[BigNumber]>;

    "ATTR_BASE_MOOD()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    ATTR_DIL(overrides?: CallOverrides): Promise<[BigNumber]>;

    "ATTR_DIL()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    ATTR_GEG(overrides?: CallOverrides): Promise<[BigNumber]>;

    "ATTR_GEG()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    ATTR_LIM(overrides?: CallOverrides): Promise<[BigNumber]>;

    "ATTR_LIM()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    ATTR_LVL(overrides?: CallOverrides): Promise<[BigNumber]>;

    "ATTR_LVL()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    ATTR_MEL(overrides?: CallOverrides): Promise<[BigNumber]>;

    "ATTR_MEL()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    ATTR_TIZ(overrides?: CallOverrides): Promise<[BigNumber]>;

    "ATTR_TIZ()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    ATTR_WUX(overrides?: CallOverrides): Promise<[BigNumber]>;

    "ATTR_WUX()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    ATTR_XIQ(overrides?: CallOverrides): Promise<[BigNumber]>;

    "ATTR_XIQ()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    WORLD_MODULE_BEHAVIOR_ATTRIBUTES(
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "WORLD_MODULE_BEHAVIOR_ATTRIBUTES()"(
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    WORLD_MODULE_BORN_PLACES(overrides?: CallOverrides): Promise<[BigNumber]>;

    "WORLD_MODULE_BORN_PLACES()"(
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    WORLD_MODULE_BUILDINGS(overrides?: CallOverrides): Promise<[BigNumber]>;

    "WORLD_MODULE_BUILDINGS()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    WORLD_MODULE_CHARM_ATTRIBUTES(
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "WORLD_MODULE_CHARM_ATTRIBUTES()"(
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    WORLD_MODULE_CORE_ATTRIBUTES(
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "WORLD_MODULE_CORE_ATTRIBUTES()"(
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    WORLD_MODULE_EVENTS(overrides?: CallOverrides): Promise<[BigNumber]>;

    "WORLD_MODULE_EVENTS()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    WORLD_MODULE_FABRIC(overrides?: CallOverrides): Promise<[BigNumber]>;

    "WORLD_MODULE_FABRIC()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    WORLD_MODULE_FOOD(overrides?: CallOverrides): Promise<[BigNumber]>;

    "WORLD_MODULE_FOOD()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    WORLD_MODULE_GOLD(overrides?: CallOverrides): Promise<[BigNumber]>;

    "WORLD_MODULE_GOLD()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    WORLD_MODULE_HERB(overrides?: CallOverrides): Promise<[BigNumber]>;

    "WORLD_MODULE_HERB()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    WORLD_MODULE_MOOD_ATTRIBUTES(
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "WORLD_MODULE_MOOD_ATTRIBUTES()"(
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    WORLD_MODULE_PRESTIGE(overrides?: CallOverrides): Promise<[BigNumber]>;

    "WORLD_MODULE_PRESTIGE()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    WORLD_MODULE_RELATIONSHIP(overrides?: CallOverrides): Promise<[BigNumber]>;

    "WORLD_MODULE_RELATIONSHIP()"(
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    WORLD_MODULE_SEASONS(overrides?: CallOverrides): Promise<[BigNumber]>;

    "WORLD_MODULE_SEASONS()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    WORLD_MODULE_TALENTS(overrides?: CallOverrides): Promise<[BigNumber]>;

    "WORLD_MODULE_TALENTS()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    WORLD_MODULE_TIMELINE(overrides?: CallOverrides): Promise<[BigNumber]>;

    "WORLD_MODULE_TIMELINE()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    WORLD_MODULE_VILLAGES(overrides?: CallOverrides): Promise<[BigNumber]>;

    "WORLD_MODULE_VILLAGES()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    WORLD_MODULE_WOOD(overrides?: CallOverrides): Promise<[BigNumber]>;

    "WORLD_MODULE_WOOD()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    WORLD_MODULE_ZONE_BASE_RESOURCES(
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "WORLD_MODULE_ZONE_BASE_RESOURCES()"(
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;
  };

  ATTR_ACT(overrides?: CallOverrides): Promise<BigNumber>;

  "ATTR_ACT()"(overrides?: CallOverrides): Promise<BigNumber>;

  ATTR_BASE(overrides?: CallOverrides): Promise<BigNumber>;

  "ATTR_BASE()"(overrides?: CallOverrides): Promise<BigNumber>;

  ATTR_BASE_BEHAVIOR(overrides?: CallOverrides): Promise<BigNumber>;

  "ATTR_BASE_BEHAVIOR()"(overrides?: CallOverrides): Promise<BigNumber>;

  ATTR_BASE_CHARM(overrides?: CallOverrides): Promise<BigNumber>;

  "ATTR_BASE_CHARM()"(overrides?: CallOverrides): Promise<BigNumber>;

  ATTR_BASE_CORE(overrides?: CallOverrides): Promise<BigNumber>;

  "ATTR_BASE_CORE()"(overrides?: CallOverrides): Promise<BigNumber>;

  ATTR_BASE_MOOD(overrides?: CallOverrides): Promise<BigNumber>;

  "ATTR_BASE_MOOD()"(overrides?: CallOverrides): Promise<BigNumber>;

  ATTR_DIL(overrides?: CallOverrides): Promise<BigNumber>;

  "ATTR_DIL()"(overrides?: CallOverrides): Promise<BigNumber>;

  ATTR_GEG(overrides?: CallOverrides): Promise<BigNumber>;

  "ATTR_GEG()"(overrides?: CallOverrides): Promise<BigNumber>;

  ATTR_LIM(overrides?: CallOverrides): Promise<BigNumber>;

  "ATTR_LIM()"(overrides?: CallOverrides): Promise<BigNumber>;

  ATTR_LVL(overrides?: CallOverrides): Promise<BigNumber>;

  "ATTR_LVL()"(overrides?: CallOverrides): Promise<BigNumber>;

  ATTR_MEL(overrides?: CallOverrides): Promise<BigNumber>;

  "ATTR_MEL()"(overrides?: CallOverrides): Promise<BigNumber>;

  ATTR_TIZ(overrides?: CallOverrides): Promise<BigNumber>;

  "ATTR_TIZ()"(overrides?: CallOverrides): Promise<BigNumber>;

  ATTR_WUX(overrides?: CallOverrides): Promise<BigNumber>;

  "ATTR_WUX()"(overrides?: CallOverrides): Promise<BigNumber>;

  ATTR_XIQ(overrides?: CallOverrides): Promise<BigNumber>;

  "ATTR_XIQ()"(overrides?: CallOverrides): Promise<BigNumber>;

  WORLD_MODULE_BEHAVIOR_ATTRIBUTES(
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "WORLD_MODULE_BEHAVIOR_ATTRIBUTES()"(
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  WORLD_MODULE_BORN_PLACES(overrides?: CallOverrides): Promise<BigNumber>;

  "WORLD_MODULE_BORN_PLACES()"(overrides?: CallOverrides): Promise<BigNumber>;

  WORLD_MODULE_BUILDINGS(overrides?: CallOverrides): Promise<BigNumber>;

  "WORLD_MODULE_BUILDINGS()"(overrides?: CallOverrides): Promise<BigNumber>;

  WORLD_MODULE_CHARM_ATTRIBUTES(overrides?: CallOverrides): Promise<BigNumber>;

  "WORLD_MODULE_CHARM_ATTRIBUTES()"(
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  WORLD_MODULE_CORE_ATTRIBUTES(overrides?: CallOverrides): Promise<BigNumber>;

  "WORLD_MODULE_CORE_ATTRIBUTES()"(
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  WORLD_MODULE_EVENTS(overrides?: CallOverrides): Promise<BigNumber>;

  "WORLD_MODULE_EVENTS()"(overrides?: CallOverrides): Promise<BigNumber>;

  WORLD_MODULE_FABRIC(overrides?: CallOverrides): Promise<BigNumber>;

  "WORLD_MODULE_FABRIC()"(overrides?: CallOverrides): Promise<BigNumber>;

  WORLD_MODULE_FOOD(overrides?: CallOverrides): Promise<BigNumber>;

  "WORLD_MODULE_FOOD()"(overrides?: CallOverrides): Promise<BigNumber>;

  WORLD_MODULE_GOLD(overrides?: CallOverrides): Promise<BigNumber>;

  "WORLD_MODULE_GOLD()"(overrides?: CallOverrides): Promise<BigNumber>;

  WORLD_MODULE_HERB(overrides?: CallOverrides): Promise<BigNumber>;

  "WORLD_MODULE_HERB()"(overrides?: CallOverrides): Promise<BigNumber>;

  WORLD_MODULE_MOOD_ATTRIBUTES(overrides?: CallOverrides): Promise<BigNumber>;

  "WORLD_MODULE_MOOD_ATTRIBUTES()"(
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  WORLD_MODULE_PRESTIGE(overrides?: CallOverrides): Promise<BigNumber>;

  "WORLD_MODULE_PRESTIGE()"(overrides?: CallOverrides): Promise<BigNumber>;

  WORLD_MODULE_RELATIONSHIP(overrides?: CallOverrides): Promise<BigNumber>;

  "WORLD_MODULE_RELATIONSHIP()"(overrides?: CallOverrides): Promise<BigNumber>;

  WORLD_MODULE_SEASONS(overrides?: CallOverrides): Promise<BigNumber>;

  "WORLD_MODULE_SEASONS()"(overrides?: CallOverrides): Promise<BigNumber>;

  WORLD_MODULE_TALENTS(overrides?: CallOverrides): Promise<BigNumber>;

  "WORLD_MODULE_TALENTS()"(overrides?: CallOverrides): Promise<BigNumber>;

  WORLD_MODULE_TIMELINE(overrides?: CallOverrides): Promise<BigNumber>;

  "WORLD_MODULE_TIMELINE()"(overrides?: CallOverrides): Promise<BigNumber>;

  WORLD_MODULE_VILLAGES(overrides?: CallOverrides): Promise<BigNumber>;

  "WORLD_MODULE_VILLAGES()"(overrides?: CallOverrides): Promise<BigNumber>;

  WORLD_MODULE_WOOD(overrides?: CallOverrides): Promise<BigNumber>;

  "WORLD_MODULE_WOOD()"(overrides?: CallOverrides): Promise<BigNumber>;

  WORLD_MODULE_ZONE_BASE_RESOURCES(
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "WORLD_MODULE_ZONE_BASE_RESOURCES()"(
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  callStatic: {
    ATTR_ACT(overrides?: CallOverrides): Promise<BigNumber>;

    "ATTR_ACT()"(overrides?: CallOverrides): Promise<BigNumber>;

    ATTR_BASE(overrides?: CallOverrides): Promise<BigNumber>;

    "ATTR_BASE()"(overrides?: CallOverrides): Promise<BigNumber>;

    ATTR_BASE_BEHAVIOR(overrides?: CallOverrides): Promise<BigNumber>;

    "ATTR_BASE_BEHAVIOR()"(overrides?: CallOverrides): Promise<BigNumber>;

    ATTR_BASE_CHARM(overrides?: CallOverrides): Promise<BigNumber>;

    "ATTR_BASE_CHARM()"(overrides?: CallOverrides): Promise<BigNumber>;

    ATTR_BASE_CORE(overrides?: CallOverrides): Promise<BigNumber>;

    "ATTR_BASE_CORE()"(overrides?: CallOverrides): Promise<BigNumber>;

    ATTR_BASE_MOOD(overrides?: CallOverrides): Promise<BigNumber>;

    "ATTR_BASE_MOOD()"(overrides?: CallOverrides): Promise<BigNumber>;

    ATTR_DIL(overrides?: CallOverrides): Promise<BigNumber>;

    "ATTR_DIL()"(overrides?: CallOverrides): Promise<BigNumber>;

    ATTR_GEG(overrides?: CallOverrides): Promise<BigNumber>;

    "ATTR_GEG()"(overrides?: CallOverrides): Promise<BigNumber>;

    ATTR_LIM(overrides?: CallOverrides): Promise<BigNumber>;

    "ATTR_LIM()"(overrides?: CallOverrides): Promise<BigNumber>;

    ATTR_LVL(overrides?: CallOverrides): Promise<BigNumber>;

    "ATTR_LVL()"(overrides?: CallOverrides): Promise<BigNumber>;

    ATTR_MEL(overrides?: CallOverrides): Promise<BigNumber>;

    "ATTR_MEL()"(overrides?: CallOverrides): Promise<BigNumber>;

    ATTR_TIZ(overrides?: CallOverrides): Promise<BigNumber>;

    "ATTR_TIZ()"(overrides?: CallOverrides): Promise<BigNumber>;

    ATTR_WUX(overrides?: CallOverrides): Promise<BigNumber>;

    "ATTR_WUX()"(overrides?: CallOverrides): Promise<BigNumber>;

    ATTR_XIQ(overrides?: CallOverrides): Promise<BigNumber>;

    "ATTR_XIQ()"(overrides?: CallOverrides): Promise<BigNumber>;

    WORLD_MODULE_BEHAVIOR_ATTRIBUTES(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "WORLD_MODULE_BEHAVIOR_ATTRIBUTES()"(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    WORLD_MODULE_BORN_PLACES(overrides?: CallOverrides): Promise<BigNumber>;

    "WORLD_MODULE_BORN_PLACES()"(overrides?: CallOverrides): Promise<BigNumber>;

    WORLD_MODULE_BUILDINGS(overrides?: CallOverrides): Promise<BigNumber>;

    "WORLD_MODULE_BUILDINGS()"(overrides?: CallOverrides): Promise<BigNumber>;

    WORLD_MODULE_CHARM_ATTRIBUTES(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "WORLD_MODULE_CHARM_ATTRIBUTES()"(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    WORLD_MODULE_CORE_ATTRIBUTES(overrides?: CallOverrides): Promise<BigNumber>;

    "WORLD_MODULE_CORE_ATTRIBUTES()"(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    WORLD_MODULE_EVENTS(overrides?: CallOverrides): Promise<BigNumber>;

    "WORLD_MODULE_EVENTS()"(overrides?: CallOverrides): Promise<BigNumber>;

    WORLD_MODULE_FABRIC(overrides?: CallOverrides): Promise<BigNumber>;

    "WORLD_MODULE_FABRIC()"(overrides?: CallOverrides): Promise<BigNumber>;

    WORLD_MODULE_FOOD(overrides?: CallOverrides): Promise<BigNumber>;

    "WORLD_MODULE_FOOD()"(overrides?: CallOverrides): Promise<BigNumber>;

    WORLD_MODULE_GOLD(overrides?: CallOverrides): Promise<BigNumber>;

    "WORLD_MODULE_GOLD()"(overrides?: CallOverrides): Promise<BigNumber>;

    WORLD_MODULE_HERB(overrides?: CallOverrides): Promise<BigNumber>;

    "WORLD_MODULE_HERB()"(overrides?: CallOverrides): Promise<BigNumber>;

    WORLD_MODULE_MOOD_ATTRIBUTES(overrides?: CallOverrides): Promise<BigNumber>;

    "WORLD_MODULE_MOOD_ATTRIBUTES()"(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    WORLD_MODULE_PRESTIGE(overrides?: CallOverrides): Promise<BigNumber>;

    "WORLD_MODULE_PRESTIGE()"(overrides?: CallOverrides): Promise<BigNumber>;

    WORLD_MODULE_RELATIONSHIP(overrides?: CallOverrides): Promise<BigNumber>;

    "WORLD_MODULE_RELATIONSHIP()"(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    WORLD_MODULE_SEASONS(overrides?: CallOverrides): Promise<BigNumber>;

    "WORLD_MODULE_SEASONS()"(overrides?: CallOverrides): Promise<BigNumber>;

    WORLD_MODULE_TALENTS(overrides?: CallOverrides): Promise<BigNumber>;

    "WORLD_MODULE_TALENTS()"(overrides?: CallOverrides): Promise<BigNumber>;

    WORLD_MODULE_TIMELINE(overrides?: CallOverrides): Promise<BigNumber>;

    "WORLD_MODULE_TIMELINE()"(overrides?: CallOverrides): Promise<BigNumber>;

    WORLD_MODULE_VILLAGES(overrides?: CallOverrides): Promise<BigNumber>;

    "WORLD_MODULE_VILLAGES()"(overrides?: CallOverrides): Promise<BigNumber>;

    WORLD_MODULE_WOOD(overrides?: CallOverrides): Promise<BigNumber>;

    "WORLD_MODULE_WOOD()"(overrides?: CallOverrides): Promise<BigNumber>;

    WORLD_MODULE_ZONE_BASE_RESOURCES(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "WORLD_MODULE_ZONE_BASE_RESOURCES()"(
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    ATTR_ACT(overrides?: CallOverrides): Promise<BigNumber>;

    "ATTR_ACT()"(overrides?: CallOverrides): Promise<BigNumber>;

    ATTR_BASE(overrides?: CallOverrides): Promise<BigNumber>;

    "ATTR_BASE()"(overrides?: CallOverrides): Promise<BigNumber>;

    ATTR_BASE_BEHAVIOR(overrides?: CallOverrides): Promise<BigNumber>;

    "ATTR_BASE_BEHAVIOR()"(overrides?: CallOverrides): Promise<BigNumber>;

    ATTR_BASE_CHARM(overrides?: CallOverrides): Promise<BigNumber>;

    "ATTR_BASE_CHARM()"(overrides?: CallOverrides): Promise<BigNumber>;

    ATTR_BASE_CORE(overrides?: CallOverrides): Promise<BigNumber>;

    "ATTR_BASE_CORE()"(overrides?: CallOverrides): Promise<BigNumber>;

    ATTR_BASE_MOOD(overrides?: CallOverrides): Promise<BigNumber>;

    "ATTR_BASE_MOOD()"(overrides?: CallOverrides): Promise<BigNumber>;

    ATTR_DIL(overrides?: CallOverrides): Promise<BigNumber>;

    "ATTR_DIL()"(overrides?: CallOverrides): Promise<BigNumber>;

    ATTR_GEG(overrides?: CallOverrides): Promise<BigNumber>;

    "ATTR_GEG()"(overrides?: CallOverrides): Promise<BigNumber>;

    ATTR_LIM(overrides?: CallOverrides): Promise<BigNumber>;

    "ATTR_LIM()"(overrides?: CallOverrides): Promise<BigNumber>;

    ATTR_LVL(overrides?: CallOverrides): Promise<BigNumber>;

    "ATTR_LVL()"(overrides?: CallOverrides): Promise<BigNumber>;

    ATTR_MEL(overrides?: CallOverrides): Promise<BigNumber>;

    "ATTR_MEL()"(overrides?: CallOverrides): Promise<BigNumber>;

    ATTR_TIZ(overrides?: CallOverrides): Promise<BigNumber>;

    "ATTR_TIZ()"(overrides?: CallOverrides): Promise<BigNumber>;

    ATTR_WUX(overrides?: CallOverrides): Promise<BigNumber>;

    "ATTR_WUX()"(overrides?: CallOverrides): Promise<BigNumber>;

    ATTR_XIQ(overrides?: CallOverrides): Promise<BigNumber>;

    "ATTR_XIQ()"(overrides?: CallOverrides): Promise<BigNumber>;

    WORLD_MODULE_BEHAVIOR_ATTRIBUTES(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "WORLD_MODULE_BEHAVIOR_ATTRIBUTES()"(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    WORLD_MODULE_BORN_PLACES(overrides?: CallOverrides): Promise<BigNumber>;

    "WORLD_MODULE_BORN_PLACES()"(overrides?: CallOverrides): Promise<BigNumber>;

    WORLD_MODULE_BUILDINGS(overrides?: CallOverrides): Promise<BigNumber>;

    "WORLD_MODULE_BUILDINGS()"(overrides?: CallOverrides): Promise<BigNumber>;

    WORLD_MODULE_CHARM_ATTRIBUTES(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "WORLD_MODULE_CHARM_ATTRIBUTES()"(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    WORLD_MODULE_CORE_ATTRIBUTES(overrides?: CallOverrides): Promise<BigNumber>;

    "WORLD_MODULE_CORE_ATTRIBUTES()"(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    WORLD_MODULE_EVENTS(overrides?: CallOverrides): Promise<BigNumber>;

    "WORLD_MODULE_EVENTS()"(overrides?: CallOverrides): Promise<BigNumber>;

    WORLD_MODULE_FABRIC(overrides?: CallOverrides): Promise<BigNumber>;

    "WORLD_MODULE_FABRIC()"(overrides?: CallOverrides): Promise<BigNumber>;

    WORLD_MODULE_FOOD(overrides?: CallOverrides): Promise<BigNumber>;

    "WORLD_MODULE_FOOD()"(overrides?: CallOverrides): Promise<BigNumber>;

    WORLD_MODULE_GOLD(overrides?: CallOverrides): Promise<BigNumber>;

    "WORLD_MODULE_GOLD()"(overrides?: CallOverrides): Promise<BigNumber>;

    WORLD_MODULE_HERB(overrides?: CallOverrides): Promise<BigNumber>;

    "WORLD_MODULE_HERB()"(overrides?: CallOverrides): Promise<BigNumber>;

    WORLD_MODULE_MOOD_ATTRIBUTES(overrides?: CallOverrides): Promise<BigNumber>;

    "WORLD_MODULE_MOOD_ATTRIBUTES()"(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    WORLD_MODULE_PRESTIGE(overrides?: CallOverrides): Promise<BigNumber>;

    "WORLD_MODULE_PRESTIGE()"(overrides?: CallOverrides): Promise<BigNumber>;

    WORLD_MODULE_RELATIONSHIP(overrides?: CallOverrides): Promise<BigNumber>;

    "WORLD_MODULE_RELATIONSHIP()"(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    WORLD_MODULE_SEASONS(overrides?: CallOverrides): Promise<BigNumber>;

    "WORLD_MODULE_SEASONS()"(overrides?: CallOverrides): Promise<BigNumber>;

    WORLD_MODULE_TALENTS(overrides?: CallOverrides): Promise<BigNumber>;

    "WORLD_MODULE_TALENTS()"(overrides?: CallOverrides): Promise<BigNumber>;

    WORLD_MODULE_TIMELINE(overrides?: CallOverrides): Promise<BigNumber>;

    "WORLD_MODULE_TIMELINE()"(overrides?: CallOverrides): Promise<BigNumber>;

    WORLD_MODULE_VILLAGES(overrides?: CallOverrides): Promise<BigNumber>;

    "WORLD_MODULE_VILLAGES()"(overrides?: CallOverrides): Promise<BigNumber>;

    WORLD_MODULE_WOOD(overrides?: CallOverrides): Promise<BigNumber>;

    "WORLD_MODULE_WOOD()"(overrides?: CallOverrides): Promise<BigNumber>;

    WORLD_MODULE_ZONE_BASE_RESOURCES(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "WORLD_MODULE_ZONE_BASE_RESOURCES()"(
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    ATTR_ACT(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "ATTR_ACT()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ATTR_BASE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "ATTR_BASE()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ATTR_BASE_BEHAVIOR(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "ATTR_BASE_BEHAVIOR()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    ATTR_BASE_CHARM(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "ATTR_BASE_CHARM()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    ATTR_BASE_CORE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "ATTR_BASE_CORE()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    ATTR_BASE_MOOD(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "ATTR_BASE_MOOD()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    ATTR_DIL(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "ATTR_DIL()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ATTR_GEG(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "ATTR_GEG()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ATTR_LIM(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "ATTR_LIM()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ATTR_LVL(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "ATTR_LVL()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ATTR_MEL(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "ATTR_MEL()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ATTR_TIZ(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "ATTR_TIZ()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ATTR_WUX(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "ATTR_WUX()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ATTR_XIQ(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "ATTR_XIQ()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    WORLD_MODULE_BEHAVIOR_ATTRIBUTES(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "WORLD_MODULE_BEHAVIOR_ATTRIBUTES()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    WORLD_MODULE_BORN_PLACES(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "WORLD_MODULE_BORN_PLACES()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    WORLD_MODULE_BUILDINGS(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "WORLD_MODULE_BUILDINGS()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    WORLD_MODULE_CHARM_ATTRIBUTES(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "WORLD_MODULE_CHARM_ATTRIBUTES()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    WORLD_MODULE_CORE_ATTRIBUTES(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "WORLD_MODULE_CORE_ATTRIBUTES()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    WORLD_MODULE_EVENTS(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "WORLD_MODULE_EVENTS()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    WORLD_MODULE_FABRIC(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "WORLD_MODULE_FABRIC()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    WORLD_MODULE_FOOD(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "WORLD_MODULE_FOOD()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    WORLD_MODULE_GOLD(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "WORLD_MODULE_GOLD()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    WORLD_MODULE_HERB(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "WORLD_MODULE_HERB()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    WORLD_MODULE_MOOD_ATTRIBUTES(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "WORLD_MODULE_MOOD_ATTRIBUTES()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    WORLD_MODULE_PRESTIGE(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "WORLD_MODULE_PRESTIGE()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    WORLD_MODULE_RELATIONSHIP(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "WORLD_MODULE_RELATIONSHIP()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    WORLD_MODULE_SEASONS(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "WORLD_MODULE_SEASONS()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    WORLD_MODULE_TALENTS(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "WORLD_MODULE_TALENTS()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    WORLD_MODULE_TIMELINE(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "WORLD_MODULE_TIMELINE()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    WORLD_MODULE_VILLAGES(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "WORLD_MODULE_VILLAGES()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    WORLD_MODULE_WOOD(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "WORLD_MODULE_WOOD()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    WORLD_MODULE_ZONE_BASE_RESOURCES(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "WORLD_MODULE_ZONE_BASE_RESOURCES()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}