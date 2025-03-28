# Ethereum Balance Fetching App

## Requirements

Display the balances of an Ethereum address input by a user.

# Frontend

- A form that accepts an Ethereum address.
- On successful form submission, call the backend’s /api/balance
  endpoint.
- Display the resulting balances as follow:
  Raw Balance → Formatted
  123456.789876 → 123,456.7897
  0.0123456 → 0.01234
  0.0000123456 → 0.00001234

# Backend

- Return an appropriate error for invalid Ethereum address argument value.
- Retrieve balances for a given address (using a public Ethereum RPC endpoint like Infura, Alchemy, or other).
- Tokens to retrieve balances for - USDC, ETH, LINK. On the Ethereum mainnet chain.
- If an individual token balance request errors out for any reason - it should be omitted from the final result, with other balances being returned. If no balances are available - an error should be returned.

- Extra: add in-memory cache on the backend, so that balances for the same address are not requested more often than once every 60 seconds from the downstream RPCs.

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `web`: a [Next.js](https://nextjs.org/) frontend app
- `api`: a [Nest.js](https://nestjs.com/) backend app
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Develop

To develop all apps and packages, run the following command:

```
yarn dev
```
