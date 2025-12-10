import { Category, MenuItem } from './types';

export const CURRENCY = '$';

// High-quality placeholder images or colors
export const MENU_ITEMS: MenuItem[] = [
  // BURGERS
  {
    id: 'b1',
    name: 'The Big Tech',
    description: 'Two quarter-pound beef patties, special sauce, lettuce, cheese, pickles, onions on a sesame seed bun.',
    price: 6.99,
    calories: 550,
    category: Category.BURGERS,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    tags: ['Best Seller', 'Beef'],
  },
  {
    id: 'b2',
    name: 'Quarter Pounder Deluxe',
    description: 'A quarter pound of 100% fresh beef, topped with slivered onions, ketchup and mustard.',
    price: 5.49,
    calories: 520,
    category: Category.BURGERS,
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80',
    tags: ['Beef', 'Classic'],
  },
  {
    id: 'b3',
    name: 'Spicy Inferno Burger',
    description: 'Crispy jalapeños, pepper jack cheese, and spicy habanero sauce on a brioche bun.',
    price: 7.29,
    calories: 610,
    category: Category.BURGERS,
    image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=800&q=80',
    tags: ['Spicy', 'Beef'],
  },
  
  // CHICKEN
  {
    id: 'c1',
    name: 'Crispy Chicken Sandwich',
    description: 'Southern style fried chicken breast with pickles on a buttered potato roll.',
    price: 5.19,
    calories: 470,
    category: Category.CHICKEN,
    image: 'https://images.unsplash.com/photo-1615557960916-5f4791effe9d?auto=format&fit=crop&w=800&q=80',
    tags: ['Chicken', 'Crispy'],
  },
  {
    id: 'c2',
    name: 'Spicy Nuggets (10pc)',
    description: 'Tempura battered chicken nuggets with a spicy kick. Includes 2 sauces.',
    price: 4.49,
    calories: 440,
    category: Category.CHICKEN,
    image: 'https://images.unsplash.com/photo-1562967963-ed5893322473?auto=format&fit=crop&w=800&q=80',
    tags: ['Spicy', 'Shareable'],
  },

  // SIDES
  {
    id: 's1',
    name: 'Golden Fries (Large)',
    description: 'World famous fries. Crispy on the outside, fluffy on the inside.',
    price: 3.29,
    calories: 380,
    category: Category.SIDES,
    image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=800&q=80',
    tags: ['Vegetarian', 'Classic'],
  },
  {
    id: 's2',
    name: 'Onion Rings',
    description: 'Thick cut onion rings battered and fried to perfection.',
    price: 3.49,
    calories: 400,
    category: Category.SIDES,
    image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=800&q=80',
    tags: ['Vegetarian'],
  },

  // DRINKS
  {
    id: 'd1',
    name: 'Cola Classic',
    description: 'Ice cold cola.',
    price: 1.99,
    calories: 140,
    category: Category.DRINKS,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80',
    tags: ['Beverage'],
  },
  {
    id: 'd2',
    name: 'Vanilla Shake',
    description: 'Creamy vanilla soft serve blended with milk.',
    price: 3.99,
    calories: 520,
    category: Category.DRINKS,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
    tags: ['Beverage', 'Sweet'],
  },

  // DESSERTS
  {
    id: 'e1',
    name: 'Apple Pie',
    description: 'Warm, gooey apple filling encased in a flaky pastry crust.',
    price: 1.49,
    calories: 230,
    category: Category.DESSERTS,
    image: 'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?auto=format&fit=crop&w=800&q=80',
    tags: ['Sweet', 'Warm'],
  },
  {
    id: 'e2',
    name: 'Fudge Sundae',
    description: 'Vanilla soft serve topped with hot fudge.',
    price: 2.49,
    calories: 330,
    category: Category.DESSERTS,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80',
    tags: ['Sweet', 'Ice Cream'],
  },
];