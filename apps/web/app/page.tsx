'use client';

import { Button } from '@components/ui/button';

import { Input } from '@components/ui/input';

import fetchWalletBalance, { TokenBalance } from 'src/api/fetchWalletBalance';
import { useState } from 'react';
import TokenBalanceCard from '@components/custom/TokenBalanceCard';

export default function Home() {
  const [address, setAddress] = useState<string>('');
  const [balances, setBalances] = useState<TokenBalance[]>([]);

  const handleAddressInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleGetBalanceClick = async () => {
    const balances = await fetchWalletBalance(address);

    setBalances(balances);
  };

  return (
    <main>
      <div className="p-2 md:p-0 md:max-w-[600px] md:mx-auto">
        <div className="h-screen ">
          <div className=" flex flex-col items-center justify-center h-1/3">
            <h1 className="text-center text-3xl font-bold mb-8">Ethereum Balance Dashboard</h1>
            <div className="w-full items-center justify-center flex flex-col gap-2 md:flex-row md:gap-4">
              <Input className="text-sm w-full md:w-2/3" onChange={handleAddressInputChange} />
              <Button className="w-1/3" onClick={handleGetBalanceClick}>
                Get Balance
              </Button>
            </div>
          </div>
          <div className="h-2/3 flex flex-col items-center justify-start">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
              {balances.map((balance) => (
                <TokenBalanceCard key={balance.symbol} balance={balance} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
