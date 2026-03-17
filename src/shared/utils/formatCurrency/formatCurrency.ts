export type FormatCurrencyOptions = {
  currency?: string;
  locale?: string;
};

export function formatCurrency(cents: number, options: FormatCurrencyOptions = {}): string {
  const { currency = 'USD', locale = 'en-US' } = options;
  const value = cents / 100;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);
}
