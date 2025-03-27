import { IsString, Matches } from 'class-validator';

export class GetUserBalanceParams {
  @Matches(/^0x[a-fA-F0-9]{40}$/, {
    message: 'Invalid Ethereum wallet address',
  })
  walletAddress: `0x${string}`;
}
