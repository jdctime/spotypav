import React, { useState, useEffect } from 'react';
import { Save, X, Server, Key } from 'lucide-react';
import { BackendConfig } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: BackendConfig) => void;
  currentConfig: BackendConfig;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onSave, currentConfig }) => {
  const [url, setUrl] = useState(currentConfig.url || '');
  const [apiKey, setApiKey] = useState(currentConfig.apiKey || '');

  useEffect(() => {
    if (isOpen) {
      setUrl(currentConfig.url || '');
      setApiKey(currentConfig.apiKey || '');
    }
  }, [isOpen, currentConfig]);

  if (!isOpen) return null;

  const handleSave = () => {
    // Basic validation to ensure protocol exists
    let formattedUrl = url;
    if (url && !url.startsWith('http')) {
      formattedUrl = `https://${url}`; // Default to https for Vercel
      if (url.includes('localhost')) {
         formattedUrl = `http://${url}`;
      }
    }
    
    onSave({ url: formattedUrl, apiKey });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#181818] border border-white/10 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Server size={20} className="text-blue-400" />
            Configuración de Backend
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 text-xs text-blue-200">
            <strong>Opciones de Servidor:</strong>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong>Local (Recomendado):</strong> <code>http://localhost:8000</code> (Requiere correr Python en tu PC).</li>
              <li><strong>Vercel:</strong> <code>https://tu-proyecto.vercel.app</code> (Puede fallar con videos largos por límite de 10s).</li>
            </ul>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">URL del Servidor</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Ej: https://mi-api-upav.vercel.app"
              className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Key size={14} /> API Key (Opcional)
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Clave secreta"
              className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="p-6 border-t border-white/10 flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-colors"
          >
            <Save size={18} />
            Guardar Configuración
          </button>
        </div>
      </div>
    </div>
  );
};