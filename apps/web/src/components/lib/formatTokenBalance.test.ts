import formatTokenBalance from './formatTokenBalance';

describe('formatTokenBalance', () => {
  it("should return '0' when the balance is 0", () => {
    expect(formatTokenBalance('0')).toBe('0');
  });

  it('should format and round down a balance less than 1 with 4 decimal places', () => {
    expect(formatTokenBalance('0.123456')).toBe('0.1234');
  });

  it('should keep 4 non null decimals with very small number', () => {
    expect(formatTokenBalance('0.0000567890123')).toBe('0.00005678');
  });

  it('should format and round down balance greater than or equal to 1 with 4 decimal places', () => {
    expect(formatTokenBalance('1234.56789')).toBe('1,234.5678');
  });

  it('should not add trailing 0 for number with less than 4 decimals ', () => {
    expect(formatTokenBalance('1234567.89')).toBe('1,234,567.89');
  });

  it('should handle very large balances correctly', () => {
    expect(formatTokenBalance('9876543210.12345')).toBe('9,876,543,210.1234');
  });
});
