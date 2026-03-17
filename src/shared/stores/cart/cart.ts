import { create } from 'zustand';
import type { ProductId } from '../../types/product';

export interface CartItem {
  productId: ProductId;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (productId: ProductId, quantity?: number) => void;
  removeItem: (productId: ProductId) => void;
  setQuantity: (productId: ProductId, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],

  addItem: (productId, quantity = 1) =>
    set((state) => {
      const itemInCart = state.items.find((i) => i.productId === productId);
      if (itemInCart) {
        return {
          items: state.items.map((i) =>
            i.productId === productId ? { ...i, quantity: i.quantity + quantity } : i,
          ),
        };
      }
      return {
        items: [...state.items, { productId, quantity }],
      };
    }),

  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((i) => i.productId !== productId),
    })),

  setQuantity: (productId, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        return { items: state.items.filter((i) => i.productId !== productId) };
      }
      const itemInCart = state.items.find((i) => i.productId === productId);
      if (itemInCart) {
        return {
          items: state.items.map((i) => (i.productId === productId ? { ...i, quantity } : i)),
        };
      }
      return {
        items: [...state.items, { productId, quantity }],
      };
    }),

  clearCart: () => set({ items: [] }),
}));
