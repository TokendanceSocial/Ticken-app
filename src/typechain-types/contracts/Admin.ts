/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export declare namespace EventInfo {
  export type BasicInfoStruct = {
    name: PromiseOrValue<string>;
    symbol: PromiseOrValue<string>;
    holdTime: PromiseOrValue<BigNumberish>;
    personLimit: PromiseOrValue<BigNumberish>;
    price: PromiseOrValue<BigNumberish>;
    rebates: PromiseOrValue<BigNumberish>;
    metaURL: PromiseOrValue<string>;
    state: PromiseOrValue<BigNumberish>;
    eventType: PromiseOrValue<BigNumberish>;
    contractAddress: PromiseOrValue<string>;
    creator: PromiseOrValue<string>;
  };

  export type BasicInfoStructOutput = [
    string,
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    string,
    number,
    number,
    string,
    string
  ] & {
    name: string;
    symbol: string;
    holdTime: BigNumber;
    personLimit: BigNumber;
    price: BigNumber;
    rebates: BigNumber;
    metaURL: string;
    state: number;
    eventType: number;
    contractAddress: string;
    creator: string;
  };

  export type UserInfoStruct = {
    tokenId: PromiseOrValue<BigNumberish>;
    canInvite: PromiseOrValue<boolean>;
    isSigned: PromiseOrValue<boolean>;
    isSigner: PromiseOrValue<boolean>;
  };

  export type UserInfoStructOutput = [BigNumber, boolean, boolean, boolean] & {
    tokenId: BigNumber;
    canInvite: boolean;
    isSigned: boolean;
    isSigner: boolean;
  };

  export type AllInfoStruct = {
    basic: EventInfo.BasicInfoStruct;
    user: EventInfo.UserInfoStruct;
  };

  export type AllInfoStructOutput = [
    EventInfo.BasicInfoStructOutput,
    EventInfo.UserInfoStructOutput
  ] & {
    basic: EventInfo.BasicInfoStructOutput;
    user: EventInfo.UserInfoStructOutput;
  };
}

export interface AdminInterface extends utils.Interface {
  functions: {
    "createEvent(string,string,uint256,uint256,uint256,uint256,string,address,uint8)": FunctionFragment;
    "eventsForOwner(address)": FunctionFragment;
    "eventsForUser(address)": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "createEvent"
      | "eventsForOwner"
      | "eventsForUser"
      | "owner"
      | "renounceOwnership"
      | "transferOwnership"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "createEvent",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "eventsForOwner",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "eventsForUser",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "createEvent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "eventsForOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "eventsForUser",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "OwnershipTransferred(address,address)": EventFragment;
    "proxy_deployed(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "proxy_deployed"): EventFragment;
}

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface proxy_deployedEventObject {
  event_proxy_address: string;
  owner_address: string;
}
export type proxy_deployedEvent = TypedEvent<
  [string, string],
  proxy_deployedEventObject
>;

export type proxy_deployedEventFilter = TypedEventFilter<proxy_deployedEvent>;

export interface Admin extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: AdminInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    createEvent(
      _name: PromiseOrValue<string>,
      _symbol: PromiseOrValue<string>,
      _holdTime: PromiseOrValue<BigNumberish>,
      _personLimit: PromiseOrValue<BigNumberish>,
      _price: PromiseOrValue<BigNumberish>,
      _rebates: PromiseOrValue<BigNumberish>,
      _meta: PromiseOrValue<string>,
      _receiver: PromiseOrValue<string>,
      _eventType: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    eventsForOwner(
      owner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[EventInfo.AllInfoStructOutput[]]>;

    eventsForUser(
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[EventInfo.AllInfoStructOutput[]]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  createEvent(
    _name: PromiseOrValue<string>,
    _symbol: PromiseOrValue<string>,
    _holdTime: PromiseOrValue<BigNumberish>,
    _personLimit: PromiseOrValue<BigNumberish>,
    _price: PromiseOrValue<BigNumberish>,
    _rebates: PromiseOrValue<BigNumberish>,
    _meta: PromiseOrValue<string>,
    _receiver: PromiseOrValue<string>,
    _eventType: PromiseOrValue<BigNumberish>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  eventsForOwner(
    owner: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<EventInfo.AllInfoStructOutput[]>;

  eventsForUser(
    user: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<EventInfo.AllInfoStructOutput[]>;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    createEvent(
      _name: PromiseOrValue<string>,
      _symbol: PromiseOrValue<string>,
      _holdTime: PromiseOrValue<BigNumberish>,
      _personLimit: PromiseOrValue<BigNumberish>,
      _price: PromiseOrValue<BigNumberish>,
      _rebates: PromiseOrValue<BigNumberish>,
      _meta: PromiseOrValue<string>,
      _receiver: PromiseOrValue<string>,
      _eventType: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    eventsForOwner(
      owner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<EventInfo.AllInfoStructOutput[]>;

    eventsForUser(
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<EventInfo.AllInfoStructOutput[]>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;

    "proxy_deployed(address,address)"(
      event_proxy_address?: null,
      owner_address?: null
    ): proxy_deployedEventFilter;
    proxy_deployed(
      event_proxy_address?: null,
      owner_address?: null
    ): proxy_deployedEventFilter;
  };

  estimateGas: {
    createEvent(
      _name: PromiseOrValue<string>,
      _symbol: PromiseOrValue<string>,
      _holdTime: PromiseOrValue<BigNumberish>,
      _personLimit: PromiseOrValue<BigNumberish>,
      _price: PromiseOrValue<BigNumberish>,
      _rebates: PromiseOrValue<BigNumberish>,
      _meta: PromiseOrValue<string>,
      _receiver: PromiseOrValue<string>,
      _eventType: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    eventsForOwner(
      owner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    eventsForUser(
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    createEvent(
      _name: PromiseOrValue<string>,
      _symbol: PromiseOrValue<string>,
      _holdTime: PromiseOrValue<BigNumberish>,
      _personLimit: PromiseOrValue<BigNumberish>,
      _price: PromiseOrValue<BigNumberish>,
      _rebates: PromiseOrValue<BigNumberish>,
      _meta: PromiseOrValue<string>,
      _receiver: PromiseOrValue<string>,
      _eventType: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    eventsForOwner(
      owner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    eventsForUser(
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
