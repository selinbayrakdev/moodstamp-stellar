import {
  Activity,
  CheckCircle2,
  ExternalLink,
  Heart,
  Loader2,
  RefreshCw,
  Smile,
  Sparkles,
  Wallet,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import {
  getAddress,
  getNetworkDetails,
  isConnected,
  requestAccess,
} from "@stellar/freighter-api";
import {
  CONTRACT_ID,
  createMoodStampClient,
  NETWORK_PASSPHRASE,
} from "./lib/moodstamp";

type MoodOption = {
  label: string;
  tone: string;
  note: string;
};

const moodOptions: MoodOption[] = [
  { label: "Happy", tone: "Bright", note: "Feeling good and open" },
  { label: "Focused", tone: "Deep work", note: "Ready to build" },
  { label: "Tired", tone: "Slow", note: "Low energy, still here" },
  { label: "Excited", tone: "High spark", note: "New ideas are moving" },
];

const explorerUrl = `https://stellar.expert/explorer/testnet/contract/${CONTRACT_ID}`;
const labUrl = `https://lab.stellar.org/r/testnet/contract/${CONTRACT_ID}`;

function shortAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-6)}`;
}

function readError(error: unknown) {
  if (error instanceof Error) return error.message;
  return "Unexpected error.";
}

export default function App() {
  const [address, setAddress] = useState("");
  const [network, setNetwork] = useState("TESTNET");
  const [selectedMood, setSelectedMood] = useState("Happy");
  const [currentMood, setCurrentMood] = useState("No mood yet");
  const [moodCount, setMoodCount] = useState(0);
  const [totalMoods, setTotalMoods] = useState(0);
  const [status, setStatus] = useState("Connect Freighter to start");
  const [error, setError] = useState("");
  const [isBusy, setIsBusy] = useState(false);

  const connected = Boolean(address);
  const walletLabel = connected ? shortAddress(address) : "Not connected";
  const activeMood = moodOptions.find((mood) => mood.label === selectedMood);
  const client = useMemo(() => createMoodStampClient(address), [address]);

  const refreshMood = useCallback(
    async (walletAddress = address) => {
      if (!walletAddress) return;

      const readClient = createMoodStampClient(walletAddress);
      const [moodTx, countTx, totalTx, networkDetails] = await Promise.all([
        readClient.get_mood({ user: walletAddress }),
        readClient.get_mood_count({ user: walletAddress }),
        readClient.get_total_moods(),
        getNetworkDetails(),
      ]);

      if ("error" in networkDetails && networkDetails.error) {
        throw new Error(String(networkDetails.error));
      }

      setCurrentMood(moodTx.result);
      setMoodCount(Number(countTx.result));
      setTotalMoods(Number(totalTx.result));
      setNetwork(networkDetails.network ?? "TESTNET");
    },
    [address],
  );

  async function connectWallet() {
    setIsBusy(true);
    setError("");

    try {
      const freighter = await isConnected();
      if ("error" in freighter && freighter.error) {
        throw new Error(String(freighter.error));
      }
      if (!freighter.isConnected) {
        throw new Error("Freighter extension was not found.");
      }

      const access = await requestAccess();
      if ("error" in access && access.error) {
        throw new Error(String(access.error));
      }

      const walletAddress = access.address || (await getAddress()).address;
      if (!walletAddress) {
        throw new Error("Wallet access was not granted.");
      }

      setAddress(walletAddress);
      await refreshMood(walletAddress);
      setStatus("Wallet connected");
    } catch (nextError) {
      setError(readError(nextError));
    } finally {
      setIsBusy(false);
    }
  }

  async function saveMood() {
    if (!address) return;

    setIsBusy(true);
    setError("");
    setStatus("Waiting for Freighter signature");

    try {
      const tx = await client.set_mood({
        user: address,
        mood: selectedMood,
      });
      const sent = await tx.signAndSend();

      setCurrentMood(selectedMood);
      setMoodCount(Number(sent.result));
      await refreshMood(address);
      setStatus(`${selectedMood} stamped on Stellar Testnet`);
    } catch (nextError) {
      setError(readError(nextError));
      setStatus("Mood was not saved");
    } finally {
      setIsBusy(false);
    }
  }

  async function refresh() {
    if (!address) return;

    setIsBusy(true);
    setError("");
    try {
      await refreshMood(address);
      setStatus("Mood data refreshed");
    } catch (nextError) {
      setError(readError(nextError));
    } finally {
      setIsBusy(false);
    }
  }

  return (
    <main className="shell">
      <section className="topbar">
        <div>
          <p className="eyebrow">Stellar Soroban Mood dApp</p>
          <h1>MoodStamp</h1>
        </div>
        <div className="actions">
          {connected && (
            <button
              className="icon-button"
              onClick={refresh}
              disabled={isBusy}
              title="Refresh"
              type="button"
            >
              <RefreshCw size={18} />
            </button>
          )}
          <button
            className="primary-button"
            onClick={connectWallet}
            disabled={isBusy}
            type="button"
          >
            {isBusy ? <Loader2 className="spin" size={18} /> : <Wallet size={18} />}
            {connected ? walletLabel : "Connect Freighter"}
          </button>
        </div>
      </section>

      {error && <div className="error">{error}</div>}

      <section className="hero">
        <article className="mood-card">
          <div className="badge-row">
            <span>{network}</span>
            <span>{connected ? "Wallet active" : "Read only"}</span>
          </div>
          <div className="mood-symbol">
            <Smile size={58} />
          </div>
          <p className="eyebrow">Current mood</p>
          <h2>{currentMood}</h2>
          <p className="mood-note">
            {connected
              ? "Your latest mood is stored by the Soroban contract."
              : "Connect a wallet to read and save your on-chain mood."}
          </p>
        </article>

        <article className="stats-card">
          <div>
            <span>Your mood stamps</span>
            <strong>{moodCount}</strong>
          </div>
          <div>
            <span>Total mood stamps</span>
            <strong>{totalMoods}</strong>
          </div>
          <div>
            <span>Contract</span>
            <strong>{shortAddress(CONTRACT_ID)}</strong>
          </div>
        </article>
      </section>

      <section className="workspace">
        <article className="panel mood-picker">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Stamp Mood</p>
              <h3>Pick today&apos;s mood</h3>
            </div>
            <Heart size={20} />
          </div>

          <div className="mood-grid">
            {moodOptions.map((mood) => (
              <button
                className={
                  selectedMood === mood.label ? "mood-option active" : "mood-option"
                }
                key={mood.label}
                onClick={() => setSelectedMood(mood.label)}
                type="button"
              >
                <span>{mood.label}</span>
                <small>{mood.tone}</small>
              </button>
            ))}
          </div>

          <div className="selected-box">
            <CheckCircle2 size={18} />
            <span>{activeMood?.note}</span>
          </div>

          <button
            className="primary-button full"
            onClick={saveMood}
            disabled={!connected || isBusy}
            type="button"
          >
            {isBusy ? <Loader2 className="spin" size={18} /> : <Sparkles size={18} />}
            Save mood on-chain
          </button>
        </article>

        <article className="panel contract-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Smart Contract</p>
              <h3>Mood registry</h3>
            </div>
            <Activity size={20} />
          </div>

          <dl>
            <div>
              <dt>Contract ID</dt>
              <dd>{CONTRACT_ID}</dd>
            </div>
            <div>
              <dt>Network Passphrase</dt>
              <dd>{NETWORK_PASSPHRASE}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>{status}</dd>
            </div>
          </dl>

          <div className="links">
            <a href={explorerUrl} target="_blank" rel="noreferrer">
              Explorer <ExternalLink size={14} />
            </a>
            <a href={labUrl} target="_blank" rel="noreferrer">
              Stellar Lab <ExternalLink size={14} />
            </a>
          </div>
        </article>
      </section>
    </main>
  );
}
