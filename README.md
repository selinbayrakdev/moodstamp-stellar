# MoodStamp Stellar

MoodStamp is a small Stellar Soroban dApp for saving a personal mood note on-chain.

## Project Name

- MoodStamp Stellar

## About Me

- name: Selin Bayrak
- Blockchain and web development learner
- Interested in simple, useful smart contract ideas
- Building with Stellar Testnet and Soroban
- Learning how wallets, smart contracts, and frontends work together

## Project Details

MoodStamp lets a user connect a Freighter wallet and save a simple mood such as Happy, Focused, Tired, or Excited. The Soroban smart contract stores the user's latest mood, the number of times that wallet has stamped a mood, and the total number of mood stamps across the contract. The frontend reads and writes directly to the Stellar Testnet contract.

## Vision

MoodStamp shows how blockchain can store small personal records in a transparent and user-owned way. The project is intentionally simple so new builders can understand the full path from smart contract storage to wallet signing and frontend interaction. In the future, this idea could grow into a lightweight on-chain journal, wellness check-in tool, or community mood board where people own their history and can prove participation without a central database.

## Development Plan

1. Create Soroban storage keys for each user's latest mood, each user's mood count, and total mood stamps.
2. Add `set_mood(user, mood)` with wallet authorization so users can save their own mood.
3. Add read functions: `get_mood(user)`, `get_mood_count(user)`, and `get_total_moods()`.
4. Write contract tests for saving a mood, updating a mood, counting repeated stamps, and tracking total mood stamps.
5. Build the React frontend with Freighter wallet connection, mood buttons, latest mood display, and contract stats.
6. Build, generate TypeScript bindings, deploy the contract to Stellar Testnet, and connect the deployed contract ID to the frontend.

## Personal Story

I built MoodStamp to practice the full flow of a Stellar dApp with a friendly, easy idea. It helped me understand how a wallet signs an action, how a Soroban contract stores user data, and how a frontend can make blockchain interaction feel simple.

## Smart Contract Functions

- `set_mood(user, mood)` saves the user's latest mood and increments counters.
- `get_mood(user)` returns the user's latest saved mood.
- `get_mood_count(user)` returns how many times the user has saved a mood.
- `get_total_moods()` returns total mood stamps for the contract.

## Deployed Contract

- Network: Stellar Testnet
- Contract ID: `CCDH36O67UTZZLBMEF2QROXDHKR6YXCCFXWUE43EO5WHTJ7Z2PR7JAMO`
- Explorer: <https://stellar.expert/explorer/testnet/contract/CCDH36O67UTZZLBMEF2QROXDHKR6YXCCFXWUE43EO5WHTJ7Z2PR7JAMO>

## Tech Stack

- Stellar Soroban smart contract
- Rust
- React
- TypeScript
- Vite
- Freighter wallet

## Installation

Install Rust target:

```bash
rustup target add wasm32v1-none
```

Run contract tests:

```bash
cargo test
```

Build the contract:

```bash
stellar contract build
```

Install and build the generated TypeScript binding:

```bash
cd frontend/packages/moodstamp
npm install
npm run build
cd ../..
```

Install and run the frontend:

```bash
cd frontend
npm install
npm run dev
```

Open:

```bash
http://localhost:4323
```

## Visual Concept

- Mascot: friendly robot
- Setting: bright futuristic city
- Physical keywords: creating tiny glowing mood stamps
- Art direction: futuristic happy digital painting with cheerful colors, simple blockchain lights, and a friendly mood-tracking atmosphere
