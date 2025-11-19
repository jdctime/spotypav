import React from 'react';
import { AnalyzedContent, PROGRAM_MAPPING } from '../types';
import { Video, Film, Tag, Sparkles, CheckCircle2, AlertTriangle, Lock, Link as LinkIcon, MonitorPlay } from 'lucide-react';

interface ReviewSectionProps {
  analysis: AnalyzedContent;
  onConfirm: () => void;
  onCancel: () => void;
  isConnected: boolean;
  onConnectTrigger: () => void;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({ analysis, onConfirm, onCancel, isConnected, onConnectTrigger }) => {
  const target = PROGRAM_MAPPING[analysis.program];

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Sparkles className="text-yellow-400" />
          Resultado del Análisis
        </h2>
        <span className={`px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2 ${analysis.compatibilityScore > 70 ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'}`}>
          <Video size={14} />
          Score Video: {analysis.compatibilityScore}%
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Generated Metadata Card */}
        <div className="bg-gray-800/50 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:border-white/20 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
              <MonitorPlay size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-200">Video Podcast Generado</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider">Título Sugerido</label>
              <p className="text-white font-medium text-lg leading-tight mt-1">{analysis.title}</p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider">Descripción SEO</label>
              <p className="text-gray-400 text-sm mt-1 line-clamp-4">{analysis.description}</p>
            </div>
            <div>
               <label className="text-xs text-gray-500 uppercase tracking-wider flex items-center gap-1">
                 <Tag size={12} /> Tags
               </label>
               <div className="flex flex-wrap gap-2 mt-2">
                 {analysis.suggestedTags.map((tag, i) => (
                   <span key={i} className="text-xs bg-white/10 px-2 py-1 rounded hover:bg-white/20 transition-colors">
                     #{tag}
                   </span>
                 ))}
               </div>
            </div>
          </div>
        </div>

        {/* Target Destination Card */}
        <div className="bg-gradient-to-br from-gray-900 to-purple-900/20 border border-purple-500/30 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 opacity-10">
            <Film size={120} />
          </div>

          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="p-2 bg-purple-500 rounded-lg text-black">
              <Film size={20} />
            </div>
            <h3 className="text-lg font-semibold text-white">Destino en Spotify for Podcasters</h3>
          </div>

          <div className="space-y-6 relative z-10">
            <div className="bg-black/40 p-4 rounded-xl border border-white/5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-gray-400 text-xs uppercase">Programa Asignado</span>
                <span className="text-xs text-purple-400 font-mono">Formato Video</span>
              </div>
              <div className="text-xl font-bold text-white">{target.programName}</div>
              <div className="text-sm text-gray-500 mt-1">Clasificación IA: <span className="text-white">{analysis.program}</span></div>
            </div>

            <div className="bg-black/40 p-4 rounded-xl border border-white/5">
               <div className="flex items-center justify-between mb-1">
                <span className="text-gray-400 text-xs uppercase flex items-center gap-1">
                  <LinkIcon size={10} />
                  Playlist Existente
                </span>
                <span className="text-xs text-blue-400 font-mono">@UPAV MEDIOS</span>
              </div>
              <div className="text-lg font-bold text-white">{target.playlistName}</div>
              <div className="text-xs text-gray-500 mt-1 italic">Se subirá el archivo de video MP4</div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-end items-center">
        <button 
          onClick={onCancel}
          className="px-6 py-3 rounded-xl text-gray-400 font-medium hover:bg-white/5 hover:text-white transition-colors"
        >
          Cancelar
        </button>
        
        {!isConnected ? (
          <button 
            onClick={onConnectTrigger}
            className="px-8 py-3 rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-bold transition-all flex items-center gap-2 border border-gray-600"
          >
            <Lock size={20} />
            Conectar Servidor
          </button>
        ) : (
          <button 
            onClick={onConfirm}
            className="px-8 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold shadow-lg shadow-purple-500/20 transform hover:-translate-y-0.5 transition-all flex items-center gap-2"
          >
            <CheckCircle2 size={20} />
            Subir Video a Spotify
          </button>
        )}
      </div>
      
      {!isConnected && (
        <div className="mt-4 text-center text-sm text-orange-400 bg-orange-500/10 p-2 rounded-lg border border-orange-500/20">
          Debes configurar el backend para poder realizar la descarga del video.
        </div>
      )}
      
      <div className="mt-4 flex items-start gap-2 text-xs text-gray-500 bg-black/20 p-3 rounded-lg">
        <AlertTriangle size={14} className="shrink-0 mt-0.5" />
        <p>
          Nota: El archivo de video se mantendrá en su formato original (MP4) sin conversión a audio, aprovechando el soporte de Video Podcast de Spotify.
        </p>
      </div>
    </div>
  );
};