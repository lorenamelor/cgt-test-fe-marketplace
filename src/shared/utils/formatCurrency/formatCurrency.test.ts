import { formatCurrency } from './formatCurrency';

describe('formatCurrency', () => {
  it('formats cents to USD by default', () => {
    expect(formatCurrency(1000)).toBe('$10.00');
    expect(formatCurrency(12900)).toBe('$129.00');
    expect(formatCurrency(0)).toBe('$0.00');
  });

  it('accepts custom currency', () => {
    const result = formatCurrency(1000, { currency: 'EUR', locale: 'en-US' });
    expect(result).toMatch(/10\.00/);
    expect(result).toContain('€');
  });

  it('accepts custom locale', () => {
    const result = formatCurrency(12900, { locale: 'pt-BR', currency: 'BRL' });
    expect(result).toMatch(/129/);
    expect(result).toMatch(/00/);
  });

  it('rounds to two decimal places', () => {
    expect(formatCurrency(1099, { locale: 'en-US' })).toBe('$10.99');
  });
});
