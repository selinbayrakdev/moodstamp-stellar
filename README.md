# MoodStamp Stellar

MoodStamp is a small Stellar Soroban dApp for saving a personal mood note on-chain.

## Project Name

- MoodStamp Stellar

## Who Are You

- name: Selin Bayrak
- Blockchain and web development learner
- Interested in simple, useful smart contract ideas
- Building with Stellar Testnet and Soroban

## Project Details

MoodStamp lets a user connect a Freighter wallet and save a simple mood such as Happy, Focused, Tired, or Excited. The Soroban smart contract stores the user's latest mood, the number of times that wallet has stamped a mood, and the total number of mood stamps across the contract. The frontend reads and writes directly to the Stellar Testnet contract.

## Vision

MoodStamp shows how blockchain can store small personal records in a transparent and user-owned way. The project is intentionally simple so new builders can understand the full path from smart contract storage to wallet signing and frontend interaction. In the future, this idea could grow into a lightweight on-chain journal, wellness check-in tool, or community mood board where people own their history and can prove participation without a central database.

## Smart Contract Functions

- `set_mood(user, mood)` saves the user's latest mood and increments counters.
- `get_mood(user)` returns the user's latest saved mood.
- `get_mood_count(user)` returns how many times the user has saved a mood.
- `get_total_moods()` returns total mood stamps for the contract.

## Deployed Contract

- Network: Stellar Testnet
- Contract ID: `CCDH36O67UTZZLBMEF2QROXDHKR6YXCCFXWUE43EO5WHTJ7Z2PR7JAMO`
- Explorer: https://stellar.expert/explorer/testnet/contract/CCDH36O67UTZZLBMEF2QROXDHKR6YXCCFXWUE43EO5WHTJ7Z2PR7JAMO

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

## ChatGPT Prompt 1

Write me a project description, in less than 150 simple, straightforward words, for a blockchain project on Stellar. The project lets users connect a wallet and save their current mood on-chain with a Soroban smart contract.

## ChatGPT Prompt 2

Now, also write a vision statement, in 100 simple, straightforward words, for this project. Talk about how simple personal data on-chain can help new users understand blockchain ownership.

## ChatGPT Prompt 3

Now, write me a software development plan for this project. Mainly focus on smart contract functions, variables, and features. Then mention the frontend. Keep it under 6 steps. Final step can be deployment.

## ChatGPT Prompt 4

Now, write a personal story summary in less than 100 words about building a simple Stellar mood stamping app as a first smart contract project.

## ChatGPT Prompt 5

Can you also write a draft GitHub README on how to install the project?

## ImgCreator Prompt

Futuristic happy digital painting with a friendly robot mascot in a bright city, creating tiny glowing mood stamps, simple blockchain lights, cheerful colors.
