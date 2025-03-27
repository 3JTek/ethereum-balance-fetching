import { Controller, Get, Param } from '@nestjs/common';

import { TokenSymbol } from '@repo/tokens/tokenAddresses';
import { AlchemyService } from './alchemy/alchemy.service';
import { GetUserBalanceParams } from './dto/get-user-balance.dto';

@Controller()
export class AppController {
  constructor(private alchemyService: AlchemyService) {}

  @Get('balance/:walletAddress')
  async getUserBalance(@Param() params: GetUserBalanceParams): Promise<any> {
    const { walletAddress } = params;

    const ethBalance =
      await this.alchemyService.getEthBalanceOfWallet(walletAddress);

    const tokenBalances = await this.alchemyService.getTokensBalanceOfWallet(
      walletAddress,
      [TokenSymbol.LINK, TokenSymbol.USDC],
    );

    return [{ symbol: 'ETH', balance: ethBalance }, ...tokenBalances];
  }
}
