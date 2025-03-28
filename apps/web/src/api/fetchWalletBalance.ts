export type TokenBalance = {
  symbol: string;
  balance: string;
  error: string | null;
  decimals: number;
};

const fetchWalletBalance = async (wallet: string): Promise<TokenBalance[]> => {
  const response = await fetch(`http://localhost:4000/api/balance/${wallet}`);

  if (!response.ok) {
    const error = await response.json();

    if (error.message[0]) {
      throw new Error(error.message[0]);
    }

    throw new Error('Failed to fetch wallet balance');
  }

  return response.json();
};

export default fetchWalletBalance;
