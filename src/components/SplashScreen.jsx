import React, { useEffect, useState } from 'react';
import { Layout } from 'lucide-react';

const SplashScreen = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Wait for fade out animation before removing component
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) {
    return (
      <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center transition-opacity duration-500 opacity-0 pointer-events-none">
        <SplashScreenContent />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center animate-in fade-in duration-300">
      <SplashScreenContent />
    </div>
  );
};

const SplashScreenContent = () => (
  <div className="flex flex-col items-center">
    {/* Animated Logo Container */}
    <div className="relative mb-6">
      <div className="absolute inset-0 bg-blue-600/20 blur-2xl rounded-full animate-pulse"></div>
      <div className="relative w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-blue-200 animate-in zoom-in-50 duration-700">
        <Layout size={40} className="animate-bounce-subtle" />
      </div>
    </div>
    
    {/* Title & Slogan */}
    <div className="text-center space-y-2">
      <h1 className="text-3xl font-black tracking-tight text-slate-900 animate-in slide-in-from-bottom-4 duration-700 delay-150">
        ProCV <span className="text-blue-600">Builder</span>
      </h1>
      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-[0.2em] animate-in slide-in-from-bottom-2 duration-700 delay-300">
        Crafting Your Professional Future
      </p>
    </div>

    {/* Elegant Loading Wave */}
    <div className="mt-12 flex gap-1.5">
      {[0, 0.1, 0.2, 0.3].map((delay, i) => (
        <div 
          key={i} 
          className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" 
          style={{ animationDelay: `${delay}s` }}
        />
      ))}
    </div>
  </div>
);

export default SplashScreen;
