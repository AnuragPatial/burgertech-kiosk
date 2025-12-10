import React, { useState, useEffect } from 'react';
import { ViewState, MenuItem, CartItem } from './types';
import { AttractScreen } from './components/AttractScreen';
import { MenuScreen } from './components/MenuScreen';
import { CheckoutScreen } from './components/CheckoutScreen';
import { CheckCircle } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('ATTRACT');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderNumber, setOrderNumber] = useState(0);

  const addToCart = (item: MenuItem, modifications: string[], quantity: number) => {
    const newItems: CartItem[] = Array(quantity).fill(null).map(() => ({
      ...item,
      modifications,
      cartId: Math.random().toString(36).substr(2, 9)
    }));
    setCart(prev => [...prev, ...newItems]);
  };

  const cancelOrder = () => {
    setCart([]);
    setView('ATTRACT');
  };

  const finishOrder = () => {
    const num = Math.floor(Math.random() * 90) + 10;
    setOrderNumber(num);
    setView('SUCCESS');
    setCart([]);
    
    // Auto reset after success
    setTimeout(() => {
      setView('ATTRACT');
    }, 5000);
  };

  if (view === 'ATTRACT') {
    return <AttractScreen onStart={() => setView('MENU')} />;
  }

  if (view === 'SUCCESS') {
    return (
      <div className="h-screen bg-white flex flex-col items-center justify-center text-center p-8 animate-in fade-in">
        <div className="mb-8 text-green-500">
            <CheckCircle size={120} fill="currentColor" className="text-green-100" />
        </div>
        <h1 className="text-6xl font-bold uppercase mb-4 text-black font-oswald">Order Placed!</h1>
        <p className="text-2xl text-gray-500 mb-12">Take your receipt and watch the screen.</p>
        
        <div className="bg-gray-100 p-8 rounded-3xl border-2 border-dashed border-gray-300">
            <div className="text-gray-500 uppercase tracking-widest text-sm mb-2">Order Number</div>
            <div className="text-8xl font-black text-black">{orderNumber}</div>
        </div>
      </div>
    );
  }

  if (view === 'CHECKOUT') {
    return (
      <CheckoutScreen 
        cart={cart}
        onBack={() => setView('MENU')}
        onComplete={finishOrder}
      />
    );
  }

  return (
    <MenuScreen 
      cart={cart}
      addToCart={addToCart}
      onCheckout={() => setView('CHECKOUT')}
      onCancel={cancelOrder}
    />
  );
};

export default App;