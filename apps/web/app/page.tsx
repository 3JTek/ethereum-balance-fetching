'use client';

import { Button } from '@components/ui/button';

import { Input } from '@components/ui/input';

import fetchWalletBalance, { TokenBalance } from 'src/api/fetchWalletBalance';
import { useState } from 'react';
import TokenBalanceCard from '@components/custom/TokenBalanceCard';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const [address, setAddress] = useState<string>('');
  const [balances, setBalances] = useState<TokenBalance[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddressInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setAddress(e.target.value);
  };

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setBalances([]);

    if (!address) {
      return setError('Please enter a valid Ethereum address');
    }

    try {
      setIsLoading(true);

      const balances = await fetchWalletBalance(address);

      setBalances(balances);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred, please try again later');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <div className="p-2 md:p-0 md:max-w-[600px] md:mx-auto">
        <div className="h-screen">
          <div className=" flex flex-col items-center justify-center h-1/3">
            <h1 className="text-center text-3xl font-bold mb-8">Ethereum Balance Dashboard</h1>
            <form
              className="w-full items-center md:items-start justify-center flex flex-col gap-2 md:flex-row md:gap-4"
              onSubmit={handleSubmitForm}
            >
              <div className="text-sm w-full md:w-2/3">
                <Input onChange={handleAddressInputChange} className="mb-2" />
                <p className="text-center md:text-left text-red-500 text-xs h-6">{error || ''}</p>
              </div>
              <Button className="w-1/3" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Please wait
                  </>
                ) : (
                  <>Get Balance</>
                )}
              </Button>
            </form>
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
