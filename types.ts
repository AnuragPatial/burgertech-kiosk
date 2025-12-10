export enum Category {
  BURGERS = 'Burgers',
  CHICKEN = 'Chicken',
  SIDES = 'Sides',
  DRINKS = 'Drinks',
  DESSERTS = 'Desserts',
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  calories: number;
  category: Category;
  image: string;
  tags: string[]; // e.g., 'Spicy', 'Vegetarian'
}

export interface CartItem extends MenuItem {
  cartId: string; // Unique ID for this instance in cart
  modifications: string[];
}

export type ViewState = 'ATTRACT' | 'MENU' | 'CHECKOUT' | 'SUCCESS';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isLoading?: boolean;
}