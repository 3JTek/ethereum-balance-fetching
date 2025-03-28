import { Controller, Get, Param } from '@nestjs/common';

import { TokenSymbol } from '@repo/tokens/tokenAddresses';
import { AlchemyService } from './alchemy/alchemy.service';
import { GetUserBalanceParams } from './dto/get-user-balance.dto';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get('balance/:walletAddress')
  async getUserBalance(@Param() params: GetUserBalanceParams): Promise<any> {
    const { walletAddress } = params;

    return this.appService.fetchUserBalance(walletAddress);
  }
}
