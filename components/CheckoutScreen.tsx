import React, { useState, useEffect } from 'react';
import { CartItem } from '../types';
import { ChevronLeft, CreditCard, CheckCircle, Smartphone, Wifi } from 'lucide-react';

interface CheckoutScreenProps {
  cart: CartItem[];
  onBack: () => void;
  onComplete: () => void;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({ cart, onBack, onComplete }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'review' | 'payment' | 'processing'>('review');

  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handlePay = () => {
    setStep('processing');
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      onComplete();
    }, 3000);
  };

  if (step === 'processing') {
    return (
      <div className="h-screen bg-green-600 flex flex-col items-center justify-center text-white p-8 text-center animate-in fade-in">
        <div className="w-24 h-24 border-4 border-white border-t-transparent rounded-full animate-spin mb-8"></div>
        <h2 className="text-4xl font-bold uppercase tracking-widest mb-4">Processing Payment</h2>
        <p className="text-xl opacity-80">Please do not remove your card...</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">
      {/* Left Panel: Order Summary */}
      <div className="w-1/2 flex flex-col border-r border-gray-200 bg-white p-8 shadow-xl z-10">
        <button onClick={onBack} className="self-start flex items-center gap-2 text-gray-500 hover:text-black mb-8 font-bold uppercase tracking-wider">
          <ChevronLeft /> Back to Menu
        </button>

        <h1 className="text-4xl font-bold uppercase mb-8 font-oswald">My Order</h1>

        <div className="flex-1 overflow-y-auto pr-2 space-y-6">
          {cart.map((item, idx) => (
            <div key={`${item.cartId}-${idx}`} className="flex gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                {item.modifications.length > 0 && (
                  <p className="text-sm text-gray-500 mt-1">
                    {item.modifications.join(', ')}
                  </p>
                )}
                <div className="text-lg font-bold text-gray-900 mt-2">${item.price.toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6 space-y-3">
          <div className="flex justify-between text-gray-600 text-lg">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600 text-lg">
            <span>Tax (8%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-4xl font-bold text-black pt-4">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Right Panel: Payment Method */}
      <div className="w-1/2 bg-gray-50 p-12 flex flex-col justify-center">
        <h2 className="text-3xl font-bold uppercase mb-8 text-center font-oswald">Choose Payment Method</h2>
        
        <div className="grid grid-cols-2 gap-6 max-w-xl mx-auto w-full">
            <button onClick={() => setStep('payment')} className="aspect-square bg-white rounded-3xl shadow-sm hover:shadow-xl hover:border-yellow-400 border-2 border-transparent transition-all flex flex-col items-center justify-center gap-4 group">
                <CreditCard size={48} className="text-gray-400 group-hover:text-yellow-500" />
                <span className="text-xl font-bold text-gray-600 group-hover:text-black">Pay Here</span>
            </button>
            <button onClick={() => setStep('payment')} className="aspect-square bg-white rounded-3xl shadow-sm hover:shadow-xl hover:border-yellow-400 border-2 border-transparent transition-all flex flex-col items-center justify-center gap-4 group">
                <div className="bg-black text-white p-2 px-4 rounded font-bold text-sm flex items-center gap-1">Pay <span className="italic font-serif">Apple</span></div>
                <span className="text-xl font-bold text-gray-600 group-hover:text-black">Mobile Pay</span>
            </button>
        </div>

        {step === 'payment' && (
             <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 animate-in fade-in">
                <div className="bg-white p-12 rounded-3xl text-center max-w-lg w-full">
                    <Wifi size={64} className="mx-auto mb-6 text-blue-500 animate-pulse" />
                    <h3 className="text-3xl font-bold mb-4">Tap Card on Reader</h3>
                    <p className="text-gray-500 mb-8">Waiting for payment...</p>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 animate-[progress_2s_ease-in-out_infinite] w-1/3"></div>
                    </div>
                    {/* Simulator Trigger */}
                    <button 
                        onClick={handlePay} 
                        className="mt-12 bg-gray-100 hover:bg-gray-200 text-gray-600 py-2 px-6 rounded-full text-sm font-bold uppercase tracking-wider"
                    >
                        [Simulate Tap]
                    </button>
                </div>
             </div>
        )}
      </div>
    </div>
  );
};