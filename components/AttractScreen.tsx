import React from 'react';

interface AttractScreenProps {
  onStart: () => void;
}

export const AttractScreen: React.FC<AttractScreenProps> = ({ onStart }) => {
  return (
    <div 
      className="relative w-full h-screen bg-black overflow-hidden cursor-pointer touch-action-manipulation" 
      onClick={onStart}
    >
      {/* Background Video/Image Simulation */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1920&q=80" 
          alt="Delicious Burger" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80"></div>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-10">
        <div className="mb-8 animate-bounce">
            <div className="w-32 h-32 bg-yellow-400 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(250,204,21,0.6)]">
                <span className="text-6xl">🍔</span>
            </div>
        </div>
        <h1 className="text-7xl font-bold text-white mb-4 tracking-tighter uppercase drop-shadow-lg">
          Burger<span className="text-yellow-400">Tech</span>
        </h1>
        <p className="text-2xl text-gray-200 mb-12 font-light">
          Future of Fast Food
        </p>
        
        <div className="bg-yellow-400 text-black px-12 py-6 rounded-full text-3xl font-bold uppercase tracking-widest animate-pulse shadow-xl border-4 border-yellow-200">
          Touch to Order
        </div>
      </div>
      
      <div className="absolute bottom-10 left-0 w-full text-center text-white/50 text-sm">
        Accessibility Mode Available • English
      </div>
    </div>
  );
};