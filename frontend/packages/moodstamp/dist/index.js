import { Buffer } from "buffer";
import { Client as ContractClient, Spec as ContractSpec, } from "@stellar/stellar-sdk/contract";
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
};
export class Client extends ContractClient {
    options;
    static async deploy(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options) {
        return ContractClient.deploy(null, options);
    }
    constructor(options) {
        super(new ContractSpec(["AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAAAwAAAAEAAAAAAAAABE1vb2QAAAABAAAAEwAAAAEAAAAAAAAACU1vb2RDb3VudAAAAAAAAAEAAAATAAAAAAAAAAAAAAAKVG90YWxNb29kcwAA",
            "AAAAAAAAAAAAAAAIZ2V0X21vb2QAAAABAAAAAAAAAAR1c2VyAAAAEwAAAAEAAAAQ",
            "AAAAAAAAAAAAAAAIc2V0X21vb2QAAAACAAAAAAAAAAR1c2VyAAAAEwAAAAAAAAAEbW9vZAAAABAAAAABAAAABA==",
            "AAAAAAAAAAAAAAAOZ2V0X21vb2RfY291bnQAAAAAAAEAAAAAAAAABHVzZXIAAAATAAAAAQAAAAQ=",
            "AAAAAAAAAAAAAAAPZ2V0X3RvdGFsX21vb2RzAAAAAAAAAAABAAAABA=="]), options);
        this.options = options;
    }
    fromJSON = {
        get_mood: (this.txFromJSON),
        set_mood: (this.txFromJSON),
        get_mood_count: (this.txFromJSON),
        get_total_moods: (this.txFromJSON)
    };
}
