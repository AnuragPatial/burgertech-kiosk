import React, { useState, useRef } from 'react';
import { Category, MenuItem, CartItem } from '../types';
import { MENU_ITEMS } from '../constants';
import { ProductModal } from './ProductModal';
import { ShoppingBag, ChevronRight, Info } from 'lucide-react';
import { GeminiAssistant } from './GeminiAssistant';

interface MenuScreenProps {
  cart: CartItem[];
  addToCart: (item: MenuItem, modifications: string[], quantity: number) => void;
  onCheckout: () => void;
  onCancel: () => void;
}

export const MenuScreen: React.FC<MenuScreenProps> = ({ cart, addToCart, onCheckout, onCancel }) => {
  const [activeCategory, setActiveCategory] = useState<Category>(Category.BURGERS);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  
  const categories = Object.values(Category);
  
  const scrollToCategory = (cat: Category) => {
    setActiveCategory(cat);
    // In a real app with a single long scroll list, we'd scrollIntoView here.
    // For this design, we filter the grid.
  };

  const filteredItems = MENU_ITEMS.filter(item => item.category === activeCategory);
  
  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);
  const cartCount = cart.length;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      
      {/* Sidebar Navigation */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col z-20 shadow-lg">
        <div className="p-8 pb-4">
          <h2 className="text-3xl font-extrabold text-black uppercase tracking-tighter">Burger<span className="text-yellow-500">Tech</span></h2>
        </div>
        
        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => scrollToCategory(cat)}
              className={`w-full text-left p-6 rounded-2xl transition-all duration-200 flex justify-between items-center group ${
                activeCategory === cat 
                  ? 'bg-black text-white shadow-xl scale-105' 
                  : 'bg-white text-gray-500 hover:bg-gray-100'
              }`}
            >
              <span className="text-xl font-bold uppercase">{cat}</span>
              {activeCategory === cat && <ChevronRight size={20} className="text-yellow-400" />}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-gray-100">
          <button 
            onClick={onCancel}
            className="w-full py-4 text-gray-400 hover:text-red-500 font-bold uppercase tracking-widest text-sm transition-colors"
          >
            Cancel Order
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative bg-gray-50/50">
        
        {/* Header / Banner */}
        <div className="h-32 bg-white px-8 flex items-center justify-between shadow-sm z-10">
          <div>
            <h1 className="text-4xl font-bold uppercase font-oswald">{activeCategory}</h1>
            <p className="text-gray-400 text-lg">Delicious choices await</p>
          </div>
          {/* Logo or Promo could go here */}
        </div>

        {/* Product Grid */}
        <div className="flex-1 overflow-y-auto p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-32">
              {filteredItems.map(item => (
                <div 
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="group bg-white rounded-3xl p-4 shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-transparent hover:border-yellow-200"
                >
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 relative">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                    {item.tags.includes('Spicy') && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full uppercase">Spicy</div>
                    )}
                  </div>
                  <div className="px-2">
                    <h3 className="text-xl font-bold text-gray-900 leading-tight mb-2 font-oswald">{item.name}</h3>
                    <p className="text-gray-400 text-sm line-clamp-2 mb-4 h-10">{item.description}</p>
                    <div className="flex justify-between items-end">
                      <span className="text-2xl font-bold text-black">${item.price.toFixed(2)}</span>
                      <button className="bg-gray-100 group-hover:bg-yellow-400 text-black w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                        <span className="text-2xl font-light">+</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
        </div>

        {/* Bottom Cart Bar (Sticky) */}
        {cartCount > 0 && (
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent pointer-events-none flex justify-center pb-8">
            <button 
              onClick={onCheckout}
              className="pointer-events-auto bg-green-600 hover:bg-green-700 text-white w-full max-w-3xl rounded-2xl shadow-[0_10px_40px_rgba(22,163,74,0.3)] flex items-center justify-between p-4 px-8 transform transition-transform hover:scale-105"
            >
              <div className="flex items-center gap-4">
                <div className="bg-green-800 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  {cartCount}
                </div>
                <div className="text-left">
                  <div className="text-xs uppercase opacity-80 font-bold tracking-wider">Total</div>
                  <div className="text-2xl font-bold">${cartTotal.toFixed(2)}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-2xl font-bold uppercase tracking-wide">
                View Order <ShoppingBag fill="currentColor" />
              </div>
            </button>
          </div>
        )}

        {/* AI Assistant */}
        <GeminiAssistant />
      </div>

      {/* Product Modal */}
      {selectedItem && (
        <ProductModal 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
          onAddToBag={addToCart}
        />
      )}
    </div>
  );
};