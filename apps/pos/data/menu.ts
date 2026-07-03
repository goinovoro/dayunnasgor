export type Topping = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export const TOPPINGS: Topping[] = [
  { id: 't1', name: 'Chicken Katsu', price: 25000, image: '/chickenkatsu.png' },
  { id: 't2', name: 'Ati Ampela + Ayam', price: 20000, image: '/atiampelaayam.png' },
  { id: 't3', name: 'Ayam Suwir', price: 15000, image: '/ayam.png' },
  { id: 't4', name: 'Ati Ampela', price: 15000, image: '/atiampela.png' },
];

export type Category = {
  id: string;
  name: string;
  hasVariations: boolean; // true for Goreng/Rebus
};

export const CATEGORIES: Category[] = [
  { id: 'c1', name: 'Otokowok', hasVariations: false },
  { id: 'c2', name: 'Nasi Goreng', hasVariations: false },
  { id: 'c3', name: 'Mie', hasVariations: true },
  { id: 'c4', name: 'Kwetiau', hasVariations: true },
  { id: 'c5', name: 'Bihun', hasVariations: true },
  { id: 'c6', name: 'Capcay', hasVariations: true },
];

export type MenuItem = {
  id: string;
  categoryId: string;
  toppingId: string;
  name: string;
  price: number;
  image: string;
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
      image: topping.image,
    });
  });
});
