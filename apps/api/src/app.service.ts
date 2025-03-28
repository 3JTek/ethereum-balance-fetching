import { Injectable } from '@nestjs/common';
import { TokenSymbol } from '@repo/tokens/tokenAddresses';
import { AlchemyService, TokenBalance } from './alchemy/alchemy.service';

@Injectable()
export class AppService {
  constructor(private readonly alchemyService: AlchemyService) {}

  public async fetchUserBalance(walletAddress: string): Promise<TokenBalance[]> {
    const ethBalance = await this.alchemyService.getEthBalanceOfWallet(walletAddress);

    const otherBalances = await this.alchemyService.getTokensBalanceOfWallet(walletAddress, [
      TokenSymbol.LINK,
      TokenSymbol.USDC,
    ]);

    return [ethBalance, ...otherBalances];
  }
}
