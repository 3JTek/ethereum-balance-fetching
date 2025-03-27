export type TokenInfo = {
  symbol: TokenSymbol;
  address: TokenAddress;
  decimals: number;
};

export type TokenAddress = string;

export const TokenSymbol = {
  ETH: "ETH",
  USDC: "USDC",
  LINK: "LINK",
} as const;

export type TokenSymbol = (typeof TokenSymbol)[keyof typeof TokenSymbol];

export const tokens: Record<TokenSymbol, TokenInfo> = {
  [TokenSymbol.ETH]: {
    symbol: TokenSymbol.ETH,
    address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    decimals: 18,
  },

  [TokenSymbol.USDC]: {
    symbol: TokenSymbol.USDC,
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    decimals: 6,
  },

  [TokenSymbol.LINK]: {
    symbol: TokenSymbol.LINK,
    address: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
    decimals: 18,
  },
};

export function findSymbolByAddress(
  address: TokenAddress
): TokenSymbol | undefined {
  const token = Object.values(tokens).find(
    (token) => token.address.toLowerCase() === address.toLowerCase()
  );

  if (!token) return undefined;

  return token.symbol;
}
