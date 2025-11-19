import React from 'react';
import { Server, Loader2, Database, Wifi } from 'lucide-react';

interface UploadProgressProps {
  // No explicit props needed, state is managed by parent via AppState
}

export const UploadProgress: React.FC<UploadProgressProps> = () => {
  return (
    <div className="w-full max-w-md mx-auto mt-12 bg-gray-900 border border-white/10 rounded-2xl p-8 shadow-2xl">
      <div className="flex flex-col items-center text-center">
        
        <div className="relative w-24 h-24 mb-6">
          {/* Outer Ring */}
          <div className="absolute inset-0 border-4 border-gray-800 rounded-full"></div>
          {/* Spinning Ring */}
          <div className="absolute inset-0 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          
          {/* Icon in center */}
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <Server size={32} />
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-2">Conectando con Servidor...</h3>
        <p className="text-gray-400 text-sm mb-8">
          Enviando video y metadatos a tu backend de automatización.
        </p>

        <div className="w-full space-y-4">
          <div className="flex items-center gap-3 text-sm text-green-400">
            <Loader2 size={16} className="animate-spin" />
            <span>Handshake con API de Producción</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <Database size={16} />
            <span>Esperando confirmación de Job ID</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <Wifi size={16} />
            <span>Sincronizando credenciales OAuth</span>
          </div>
        </div>
      </div>
    </div>
  );
};