import React, { useState } from 'react';
import { MenuItem } from '../types';
import { X, Plus, Minus, Check } from 'lucide-react';

interface ProductModalProps {
  item: MenuItem;
  onClose: () => void;
  onAddToBag: (item: MenuItem, modifications: string[], quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ item, onClose, onAddToBag }) => {
  const [quantity, setQuantity] = useState(1);
  const [modifications, setModifications] = useState<string[]>([]);

  const toggleModification = (mod: string) => {
    setModifications(prev => 
      prev.includes(mod) ? prev.filter(m => m !== mod) : [...prev, mod]
    );
  };

  const handleAdd = () => {
    onAddToBag(item, modifications, quantity);
    onClose();
  };

  const commonMods = [
    "No Onions", "No Pickles", "Extra Cheese (+$1.00)", "No Ice", "Extra Sauce"
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        
        {/* Header Image */}
        <div className="relative h-64 bg-gray-100">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-lg hover:bg-white text-gray-800"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 font-oswald uppercase">{item.name}</h2>
              <p className="text-gray-500 mt-1">{item.calories} Calories</p>
            </div>
            <div className="text-3xl font-bold text-gray-900">${item.price.toFixed(2)}</div>
          </div>
          
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">{item.description}</p>

          {/* Customization */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Customize It</h3>
            <div className="grid grid-cols-2 gap-3">
              {commonMods.map(mod => (
                <button
                  key={mod}
                  onClick={() => toggleModification(mod)}
                  className={`p-4 rounded-xl text-left font-medium transition-all flex justify-between items-center ${
                    modifications.includes(mod)
                      ? 'bg-yellow-100 border-2 border-yellow-400 text-yellow-900'
                      : 'bg-gray-50 border-2 border-transparent text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {mod}
                  {modifications.includes(mod) && <Check size={18} className="text-yellow-600" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-100 bg-gray-50 flex items-center gap-6">
          <div className="flex items-center bg-white rounded-full border border-gray-200 shadow-sm p-1">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600"
            >
              <Minus size={20} />
            </button>
            <span className="w-12 text-center text-xl font-bold">{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600"
            >
              <Plus size={20} />
            </button>
          </div>

          <button 
            onClick={handleAdd}
            className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black text-xl font-bold py-4 rounded-xl shadow-lg transform transition-transform active:scale-95 uppercase tracking-wide"
          >
            Add to Order - ${((item.price * quantity) + (modifications.some(m => m.includes('$')) ? 1 : 0)).toFixed(2)}
          </button>
        </div>

      </div>
    </div>
  );
};