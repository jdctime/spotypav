import React from 'react';
import { AnalyzedContent, PROGRAM_MAPPING } from '../types';
import { ExternalLink, RefreshCw, CheckCircle, Info } from 'lucide-react';

interface SuccessViewProps {
  analysis: AnalyzedContent;
  onReset: () => void;
}

export const SuccessView: React.FC<SuccessViewProps> = ({ analysis, onReset }) => {
  const target = PROGRAM_MAPPING[analysis.program];

  return (
    <div className="w-full max-w-lg mx-auto mt-8 text-center animate-fade-in">
      <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/40">
        <CheckCircle size={40} className="text-black" />
      </div>
      
      <h2 className="text-3xl font-bold text-white mb-2">¡Enviado a Procesamiento!</h2>
      <p className="text-gray-400 mb-8">La solicitud se ha añadido a la cola de UPAV Medios.</p>

      <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-left mb-8">
        <div className="mb-4 pb-4 border-b border-white/10">
          <h3 className="text-sm text-gray-500 uppercase mb-1">Episodio</h3>
          <p className="text-lg font-medium text-white">{analysis.title}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm text-gray-500 uppercase mb-1">Programa</h3>
            <p className="text-green-400">{target.programName}</p>
          </div>
          <div>
             <h3 className="text-sm text-gray-500 uppercase mb-1">Playlist Destino</h3>
             <p className="text-blue-400">{target.playlistName}</p>
          </div>
        </div>
      </div>

      {/* Demo Disclaimer */}
      <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg mb-8 text-left flex gap-3">
        <Info size={20} className="text-yellow-500 shrink-0 mt-1" />
        <div className="text-xs text-yellow-200/80">
          <strong>Nota de Modo Demo:</strong> Al ser un prototipo frontend, el video no se descargará ni subirá realmente a Spotify. 
          <br/><br/>
          En una implementación real (Producción), este paso tardaría varios minutos procesando el audio en el servidor backend antes de aparecer en la app de Spotify.
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          onClick={onReset}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition-colors"
        >
          <RefreshCw size={18} />
          Procesar otro video
        </button>
        <a 
          href="https://open.spotify.com/user/31nqij6lzxrqkijn7cflbbd7nze4" 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1DB954]/20 hover:bg-[#1DB954]/30 text-[#1DB954] font-bold transition-colors border border-[#1DB954]/50"
        >
          Ver Perfil Spotify
          <ExternalLink size={18} />
        </a>
      </div>
    </div>
  );
};