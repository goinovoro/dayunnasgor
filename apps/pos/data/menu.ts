export type Topping = {
  id: string;
  name: string;
  price: number;
  emoji: string;
  color: string; // gradient background color for the card
};

export const TOPPINGS: Topping[] = [
  { id: 't1', name: 'Chicken Katsu', price: 25000, emoji: '🍗', color: 'from-amber-700 to-amber-900' },
  { id: 't2', name: 'Ati Ampela + Ayam', price: 20000, emoji: '🍖', color: 'from-orange-700 to-red-900' },
  { id: 't3', name: 'Ayam Suwir', price: 15000, emoji: '🐔', color: 'from-yellow-700 to-orange-900' },
  { id: 't4', name: 'Ati Ampela', price: 15000, emoji: '🫀', color: 'from-red-700 to-rose-900' },
];

export type Category = {
  id: string;
  name: string;
  hasVariations: boolean; // true for Goreng/Rebus
  emoji: string;
};

export const CATEGORIES: Category[] = [
  { id: 'c1', name: 'Otokowok',   hasVariations: false, emoji: '🍚' },
  { id: 'c2', name: 'Nasi Goreng', hasVariations: false, emoji: '🍳' },
  { id: 'c3', name: 'Mie',         hasVariations: true,  emoji: '🍜' },
  { id: 'c4', name: 'Kwetiau',     hasVariations: true,  emoji: '🥡' },
  { id: 'c5', name: 'Bihun',       hasVariations: true,  emoji: '🍝' },
  { id: 'c6', name: 'Capcay',      hasVariations: true,  emoji: '🥦' },
];

export type MenuItem = {
  id: string;
  categoryId: string;
  toppingId: string;
  name: string;
  price: number;
  emoji: string;
  color: string;
};

// Generate the menu items programmatically
export const MENU_ITEMS: MenuItem[] = [];

CATEGORIES.forEach(category => {
  TOPPINGS.forEach(topping => {
    let namePrefix = category.name;
    if (category.name === 'Otokowok') namePrefix = 'Nasi Otokowok';

    MENU_ITEMS.push({
      id: `${category.id}-${topping.id}`,
      categoryId: category.id,
      toppingId: topping.id,
      name: `${namePrefix} ${topping.name}`,
      price: topping.price,
      emoji: topping.emoji,
      color: topping.color,
    });
  });
});
