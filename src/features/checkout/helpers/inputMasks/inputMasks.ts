/** Card number: digits only, max 19, space every 4 (common Visa/Mastercard-style groups). */
export function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 19);
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
}

/** Expiry: digits only, max 4, formatted as MM/YY. */
export function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

/** CVV: digits only, max length 4. */
export function formatCvv(value: string): string {
  return value.replace(/\D/g, '').slice(0, 4);
}
