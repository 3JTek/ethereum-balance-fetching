# Ethereum Balance Fetching App

## Requirements

Display the balances of an Ethereum address input by a user.

### Frontend

- 🟢 A form that accepts an Ethereum address.
- 🟢 On successful form submission, call the backend’s /api/balance
  endpoint.
- 🟢 Display the resulting balances as follow:
  Raw Balance → Formatted
  123456.789876 → 123,456.7897
  0.0123456 → 0.01234
  0.0000123456 → 0.00001234
- 🟢 Mobile responsive

### Backend

- 🟢 Return an appropriate error for invalid Ethereum address argument value.
- 🟢 Retrieve balances for a given address (using a public Ethereum RPC endpoint like Infura, Alchemy, or other).
- 🟢 Tokens to retrieve balances for - USDC, ETH, LINK. On the Ethereum mainnet chain.
- 🟢 If an individual token balance request errors out for any reason - it should be omitted from the final result, with other balances being returned. If no balances are available - an error should be returned.
- 🟠 Extra: add in-memory cache on the backend, so that balances for the same address are not requested more often than once every 60 seconds from the downstream RPCs.

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `web`: a [Next.js](https://nextjs.org/) frontend app
- `api`: a [Nest.js](https://nestjs.com/) backend app
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo
- `@repo/tokens`: `tokens` used by web and api to retrieve token info (i.e. addresses)

### Develop

To install dependencies

```
yarn
```

To develop all apps and packages, run the following command:

```
yarn dev
```

To test the frontend

```
cd apps/web
yarn test
```

### Design System

We are using Shadcn for atomic component creating (app/web/components/ui) and Tailwind as css utility for styling.

# Potential improvements

- Apply in-memory cache to balances other than ETH
- Catch wrong wallet address format from the frontend to reduce api calls
- Reformat wallet address once enter by the user (especially on mobile) for better readability
- Refactor `getEthBalanceOfWallet` and `getTokensBalanceOfWallet` as a lot of logic is shared here
- Add frontend/backend tests
- Make the UI stunning 💅😄
