import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  findSymbolByAddress,
  tokens,
  TokenSymbol,
} from '@repo/tokens/tokenAddresses';

import { Network, Alchemy, BigNumber } from 'alchemy-sdk';

@Injectable()
export class AlchemyService {
  private readonly alchemy: Alchemy;

  constructor(private configService: ConfigService) {
    this.alchemy = new Alchemy({
      apiKey: this.configService.get<string>('ALCHEMY_API_KEY'),
      network: Network.ETH_MAINNET,
    });
  }

  public async getEthBalanceOfWallet(walletAddress: string): Promise<string> {
    const ethBalance = await this.alchemy.core.getBalance(walletAddress);

    return ethBalance.toString();
  }

  public async getTokensBalanceOfWallet(
    walletAddress: string,
    tokenSymbols: TokenSymbol[],
  ): Promise<{ symbol: string; balance: string }[]> {
    try {
      console.log(walletAddress, tokenSymbols);

      const tokenAddresses = tokenSymbols.map(
        (symbol) => tokens[symbol].address,
      );

      console.log(tokenAddresses);
      const response = await this.alchemy.core.getTokenBalances(
        walletAddress,
        tokenAddresses,
      );

      console.log(response);
      return response.tokenBalances.map((token) => ({
        symbol: findSymbolByAddress(token.contractAddress),
        balance: token.tokenBalance,
      }));
    } catch (error) {
      console.error('Error fetching token balances:', error);
    }
  }
}
