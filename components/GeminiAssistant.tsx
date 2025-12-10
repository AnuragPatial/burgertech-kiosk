import React, { useState, useRef, useEffect } from 'react';
import { getGeminiReply } from '../services/geminiService';
import { ChatMessage } from '../types';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';

export const GeminiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi! I'm BurgerBot. Need a recommendation? 🍔" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    
    const newHistory: ChatMessage[] = [
        ...messages,
        { role: 'user', text: userMsg }
    ];
    setMessages(newHistory);
    setIsLoading(true);

    const reply = await getGeminiReply(userMsg, newHistory);
    
    setMessages(prev => [
      ...prev,
      { role: 'model', text: reply }
    ]);
    setIsLoading(false);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-32 right-8 z-50 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 border-2 border-white"
      >
        <Sparkles size={24} className="animate-spin-slow" />
        <span className="font-bold pr-2">Ask BurgerBot</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-32 right-8 z-50 w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 animate-in slide-in-from-bottom-10 fade-in duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 flex justify-between items-center text-white">
        <div className="flex items-center gap-2">
          <Sparkles size={20} />
          <h3 className="font-bold text-lg">BurgerBot AI</h3>
        </div>
        <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded">
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-500 p-3 rounded-2xl rounded-tl-none shadow-sm text-sm flex gap-1">
              <span className="animate-bounce">●</span>
              <span className="animate-bounce delay-75">●</span>
              <span className="animate-bounce delay-150">●</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about allergies, calories..."
          className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          onClick={handleSend}
          disabled={isLoading}
          className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 disabled:opacity-50"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};