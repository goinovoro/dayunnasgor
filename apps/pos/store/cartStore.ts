import { create } from 'zustand';
import { MenuItem } from '../data/menu';

export type CartItem = MenuItem & {
  cartItemId: string; 
  quantity: number;
  variation?: 'Goreng' | 'Rebus';
  note?: string;
};

interface CartState {
  items: CartItem[];
  addItem: (item: MenuItem, variation?: 'Goreng' | 'Rebus') => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  updateNote: (cartItemId: string, note: string) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (item, variation) => set((state) => {
    const cartItemId = `${item.id}${variation ? '-' + variation : ''}`;
    const existing = state.items.find(i => i.cartItemId === cartItemId);
    
    if (existing) {
      return {
        items: state.items.map(i => 
          i.cartItemId === cartItemId ? { ...i, quantity: i.quantity + 1 } : i
        )
      };
    }
    
    return {
      items: [...state.items, { ...item, cartItemId, quantity: 1, variation }]
    };
  }),
  removeItem: (cartItemId) => set((state) => ({
    items: state.items.filter(i => i.cartItemId !== cartItemId)
  })),
  updateQuantity: (cartItemId, delta) => set((state) => ({
    items: state.items.map(i => {
      if (i.cartItemId === cartItemId) {
        const newQuantity = Math.max(0, i.quantity + delta);
        return { ...i, quantity: newQuantity };
      }
      return i;
    }).filter(i => i.quantity > 0)
  })),
  updateNote: (cartItemId, note) => set((state) => ({
    items: state.items.map(i => 
      i.cartItemId === cartItemId ? { ...i, note } : i
    )
  })),
  clearCart: () => set({ items: [] }),
  getTotal: () => {
    return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}));
