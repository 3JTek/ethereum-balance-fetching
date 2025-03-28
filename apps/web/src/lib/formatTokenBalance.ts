import Decimal from 'decimal.js';

const CURRENCY_FORMAT = 'en-US';
const MAX_DECIMALS = 4;

function formatTokenBalance(balance: string): string {
  const decimal = new Decimal(balance);

  // Determine the number of decimal places to keep
  const decimalPlaces = getDecimalPlaces(decimal);

  // Round the number to the desired decimal places
  const roundedValue = decimal.toFixed(decimalPlaces, Decimal.ROUND_DOWN);

  // Format the number with commas for thousands
  return new Intl.NumberFormat(CURRENCY_FORMAT, {
    maximumFractionDigits: decimalPlaces,
  }).format(Number(roundedValue));
}

function getDecimalPlaces(decimal: Decimal) {
  if (decimal.decimalPlaces() === 0) {
    return 0;
  }

  if (decimal.lessThan(1)) {
    return findFirstNonZeroDecimalIndex(decimal) + MAX_DECIMALS;
  }

  return decimal.decimalPlaces() > MAX_DECIMALS ? MAX_DECIMALS : decimal.decimalPlaces();
}

function findFirstNonZeroDecimalIndex(decimal: Decimal): number {
  return decimal
    .toString()
    .split('.')[1]!
    .split('')
    .findIndex((digit) => digit !== '0');
}

export default formatTokenBalance;
