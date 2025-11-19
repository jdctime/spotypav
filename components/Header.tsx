import React from 'react';
import { Radio, Share2, Settings } from 'lucide-react';

interface HeaderProps {
  isConnected: boolean;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isConnected, onOpenSettings }) => {
  return (
    <header className="w-full p-6 flex items-center justify-between border-b border-white/10 bg-black/40 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20">
          <Share2 size={20} className="text-white" />
        </div>
        <div className="h-0.5 w-8 bg-gray-700"></div>
        <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-400 rounded-full flex items-center justify-center shadow-lg shadow-green-500/20">
          <Radio size={20} className="text-white" />
        </div>
        <h1 className="text-xl font-bold ml-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          FaceSpot <span className="font-light">Bridge</span>
        </h1>
      </div>
      
      <div className="flex items-center gap-4">
        <button 
          onClick={onOpenSettings}
          className={`p-2 rounded-full transition-colors ${isConnected ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
          title="Configurar servidor backend"
        >
          <Settings size={20} />
        </button>
        
        <div className="hidden md:block text-xs text-gray-500 border-l border-gray-700 pl-4">
          Prod v2.0
        </div>
      </div>
    </header>
  );
};