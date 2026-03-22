const ORDER_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export function generateOrderNumber(): string {
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += ORDER_CHARS.charAt(Math.floor(Math.random() * ORDER_CHARS.length));
  }
  return `${result.slice(0, 3)}-${result.slice(3)}`;
}
