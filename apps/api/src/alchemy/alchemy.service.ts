import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { findSymbolByAddress, tokens, TokenSymbol } from '@repo/tokens/tokenAddresses';

import { Network, Alchemy, BigNumber } from 'alchemy-sdk';

export type TokenBalance = {
  symbol: TokenSymbol;
  balance: string;
  decimals: number;
  error: string;
};

@Injectable()
export class AlchemyService {
  private readonly alchemy: Alchemy;
  private readonly cache: Map<string, { data: TokenBalance | TokenBalance[]; expiresAt: number }> = new Map();

  constructor(private configService: ConfigService) {
    this.alchemy = new Alchemy({
      apiKey: this.configService.get<string>('ALCHEMY_API_KEY'),
      network: Network.ETH_MAINNET,
    });
  }

  public async getEthBalanceOfWallet(walletAddress: string): Promise<TokenBalance> {
    const cacheKey = `ETH:${walletAddress}`;

    if (this.isCacheValid(cacheKey)) {
      console.log(`Cache hit for ${cacheKey}`);

      return this.cache.get(cacheKey).data as TokenBalance;
    }

    try {
      console.log(`No cache hit for ${cacheKey}, fetching balance...`);

      const ethBalance = await this.alchemy.core.getBalance(walletAddress);

      const result: TokenBalance = {
        symbol: TokenSymbol.ETH,
        balance: ethBalance.toString(),
        decimals: tokens[TokenSymbol.ETH].decimals,
        error: null,
      };

      this.cache.set(cacheKey, { data: result, expiresAt: Date.now() + 60000 });

      return result;
    } catch (error) {
      console.log(error);

      return this.handleBalanceFetchError(TokenSymbol.ETH);
    }
  }

  public async getTokensBalanceOfWallet(walletAddress: string, tokenSymbols: TokenSymbol[]): Promise<TokenBalance[]> {
    try {
      const tokenAddresses = tokenSymbols.map((symbol) => tokens[symbol].address);

      const response = await this.alchemy.core.getTokenBalances(walletAddress, tokenAddresses);

      return response.tokenBalances.map((token) => ({
        symbol: findSymbolByAddress(token.contractAddress),
        balance: token.tokenBalance,
        decimals: tokens[findSymbolByAddress(token.contractAddress)].decimals,
        error: token.error || null,
      }));
    } catch (error) {
      console.log(error);

      return tokenSymbols.map((symbol) => this.handleBalanceFetchError(symbol));
    }
  }

  private handleBalanceFetchError(tokenSymbol: TokenSymbol): TokenBalance {
    return {
      symbol: tokenSymbol,
      balance: undefined,
      error: 'Error fetching token balance',
      decimals: tokens[tokenSymbol].decimals,
    };
  }

  private isCacheValid(cacheKey: string): boolean {
    const cached = this.cache.get(cacheKey);
    return cached && cached.expiresAt > Date.now();
  }
}
