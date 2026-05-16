import { Buffer } from "buffer";
import { Address } from "@stellar/stellar-sdk";
import {
  AssembledTransaction,
  Client as ContractClient,
  ClientOptions as ContractClientOptions,
  MethodOptions,
  Result,
  Spec as ContractSpec,
} from "@stellar/stellar-sdk/contract";
import type {
  u32,
  i32,
  u64,
  i64,
  u128,
  i128,
  u256,
  i256,
  Option,
  Timepoint,
  Duration,
} from "@stellar/stellar-sdk/contract";
export * from "@stellar/stellar-sdk";
export * as contract from "@stellar/stellar-sdk/contract";
export * as rpc from "@stellar/stellar-sdk/rpc";

if (typeof window !== "undefined") {
  //@ts-ignore Buffer exists
  window.Buffer = window.Buffer || Buffer;
}


export const networks = {
  testnet: {
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: "CCDH36O67UTZZLBMEF2QROXDHKR6YXCCFXWUE43EO5WHTJ7Z2PR7JAMO",
  }
} as const

export type DataKey = {tag: "Mood", values: readonly [string]} | {tag: "MoodCount", values: readonly [string]} | {tag: "TotalMoods", values: void};

export interface Client {
  /**
   * Construct and simulate a get_mood transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_mood: ({user}: {user: string}, options?: MethodOptions) => Promise<AssembledTransaction<string>>

  /**
   * Construct and simulate a set_mood transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  set_mood: ({user, mood}: {user: string, mood: string}, options?: MethodOptions) => Promise<AssembledTransaction<u32>>

  /**
   * Construct and simulate a get_mood_count transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_mood_count: ({user}: {user: string}, options?: MethodOptions) => Promise<AssembledTransaction<u32>>

  /**
   * Construct and simulate a get_total_moods transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_total_moods: (options?: MethodOptions) => Promise<AssembledTransaction<u32>>

}
export class Client extends ContractClient {
  static async deploy<T = Client>(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options: MethodOptions &
      Omit<ContractClientOptions, "contractId"> & {
        /** The hash of the Wasm blob, which must already be installed on-chain. */
        wasmHash: Buffer | string;
        /** Salt used to generate the contract's ID. Passed through to {@link Operation.createCustomContract}. Default: random. */
        salt?: Buffer | Uint8Array;
        /** The format used to decode `wasmHash`, if it's provided as a string. */
        format?: "hex" | "base64";
      }
  ): Promise<AssembledTransaction<T>> {
    return ContractClient.deploy(null, options)
  }
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAAAwAAAAEAAAAAAAAABE1vb2QAAAABAAAAEwAAAAEAAAAAAAAACU1vb2RDb3VudAAAAAAAAAEAAAATAAAAAAAAAAAAAAAKVG90YWxNb29kcwAA",
        "AAAAAAAAAAAAAAAIZ2V0X21vb2QAAAABAAAAAAAAAAR1c2VyAAAAEwAAAAEAAAAQ",
        "AAAAAAAAAAAAAAAIc2V0X21vb2QAAAACAAAAAAAAAAR1c2VyAAAAEwAAAAAAAAAEbW9vZAAAABAAAAABAAAABA==",
        "AAAAAAAAAAAAAAAOZ2V0X21vb2RfY291bnQAAAAAAAEAAAAAAAAABHVzZXIAAAATAAAAAQAAAAQ=",
        "AAAAAAAAAAAAAAAPZ2V0X3RvdGFsX21vb2RzAAAAAAAAAAABAAAABA==" ]),
      options
    )
  }
  public readonly fromJSON = {
    get_mood: this.txFromJSON<string>,
        set_mood: this.txFromJSON<u32>,
        get_mood_count: this.txFromJSON<u32>,
        get_total_moods: this.txFromJSON<u32>
  }
}