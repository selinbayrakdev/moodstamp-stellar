import { signTransaction } from "@stellar/freighter-api";
import * as MoodStamp from "moodstamp";

export const RPC_URL =
  import.meta.env.VITE_SOROBAN_RPC_URL ?? "https://soroban-testnet.stellar.org";

export const CONTRACT_ID = MoodStamp.networks.testnet.contractId;
export const NETWORK_PASSPHRASE = MoodStamp.networks.testnet.networkPassphrase;

export function createMoodStampClient(publicKey?: string) {
  return new MoodStamp.Client({
    ...MoodStamp.networks.testnet,
    rpcUrl: RPC_URL,
    publicKey,
    signTransaction: (
      xdr: string,
      options?: { networkPassphrase?: string; address?: string },
    ) =>
      signTransaction(xdr, {
        ...options,
        address: publicKey,
        networkPassphrase: NETWORK_PASSPHRASE,
      }),
  });
}
