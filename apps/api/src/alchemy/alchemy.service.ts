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

  constructor(private configService: ConfigService) {
    this.alchemy = new Alchemy({
      apiKey: this.configService.get<string>('ALCHEMY_API_KEY'),
      network: Network.ETH_MAINNET,
    });
  }

  public async getEthBalanceOfWallet(walletAddress: string): Promise<TokenBalance> {
    try {
      const ethBalance = await this.alchemy.core.getBalance(walletAddress);

      return {
        symbol: TokenSymbol.ETH,
        balance: ethBalance.toString(),
        decimals: tokens[TokenSymbol.ETH].decimals,
        error: null,
      };
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
}
