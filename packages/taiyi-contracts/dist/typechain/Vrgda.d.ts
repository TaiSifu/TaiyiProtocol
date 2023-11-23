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

interface VrgdaInterface extends ethers.utils.Interface {
  functions: {
    "getTargetSaleTime(int256)": FunctionFragment;
    "getVRGDAPrice(int256,uint256)": FunctionFragment;
    "targetPrice()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "getTargetSaleTime",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getVRGDAPrice",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "targetPrice",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "getTargetSaleTime",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getVRGDAPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "targetPrice",
    data: BytesLike
  ): Result;

  events: {};
}

export class Vrgda extends Contract {
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

  interface: VrgdaInterface;

  functions: {
    getTargetSaleTime(
      sold: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "getTargetSaleTime(int256)"(
      sold: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getVRGDAPrice(
      timeSinceStart: BigNumberish,
      sold: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "getVRGDAPrice(int256,uint256)"(
      timeSinceStart: BigNumberish,
      sold: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    targetPrice(overrides?: CallOverrides): Promise<[BigNumber]>;

    "targetPrice()"(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  getTargetSaleTime(
    sold: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "getTargetSaleTime(int256)"(
    sold: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getVRGDAPrice(
    timeSinceStart: BigNumberish,
    sold: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "getVRGDAPrice(int256,uint256)"(
    timeSinceStart: BigNumberish,
    sold: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  targetPrice(overrides?: CallOverrides): Promise<BigNumber>;

  "targetPrice()"(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    getTargetSaleTime(
      sold: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getTargetSaleTime(int256)"(
      sold: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getVRGDAPrice(
      timeSinceStart: BigNumberish,
      sold: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getVRGDAPrice(int256,uint256)"(
      timeSinceStart: BigNumberish,
      sold: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    targetPrice(overrides?: CallOverrides): Promise<BigNumber>;

    "targetPrice()"(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    getTargetSaleTime(
      sold: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getTargetSaleTime(int256)"(
      sold: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getVRGDAPrice(
      timeSinceStart: BigNumberish,
      sold: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getVRGDAPrice(int256,uint256)"(
      timeSinceStart: BigNumberish,
      sold: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    targetPrice(overrides?: CallOverrides): Promise<BigNumber>;

    "targetPrice()"(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    getTargetSaleTime(
      sold: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getTargetSaleTime(int256)"(
      sold: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getVRGDAPrice(
      timeSinceStart: BigNumberish,
      sold: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getVRGDAPrice(int256,uint256)"(
      timeSinceStart: BigNumberish,
      sold: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    targetPrice(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "targetPrice()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}