import { TokenBalance } from 'src/api/fetchWalletBalance';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import formatTokenBalance from 'src/lib/formatTokenBalance';
import { formatUnits } from 'viem';

type Props = {
  balance: TokenBalance;
};

const TokenBalanceCard = ({ balance }: Props) => {
  const { symbol, balance: value, decimals } = balance;

  const formattedBalance = formatTokenBalance(formatUnits(BigInt(value), decimals));

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{symbol}</CardTitle>
        <CardDescription>{formattedBalance}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default TokenBalanceCard;
