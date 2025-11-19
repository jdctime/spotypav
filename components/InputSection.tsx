import React, { useState } from 'react';
import { Link2, FileText, ArrowRight, AlertCircle } from 'lucide-react';

interface InputSectionProps {
  onAnalyze: (url: string, notes: string) => void;
  isLoading: boolean;
}

export const InputSection: React.FC<InputSectionProps> = ({ onAnalyze, isLoading }) => {
  const [url, setUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.includes('facebook.com') && !url.includes('fb.watch')) {
      setError('Por favor ingresa un link válido de Facebook.');
      return;
    }
    if (notes.length < 10) {
      setError('Por favor añade un poco más de contexto o descripción sobre el video.');
      return;
    }
    setError('');
    onAnalyze(url, notes);
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      <div className="bg-gray-900/50 border border-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
        <h2 className="text-2xl font-bold mb-2 text-center">Importar Contenido</h2>
        <p className="text-gray-400 text-center mb-8">Pega el enlace de tu video de Facebook y deja que nuestra IA lo clasifique.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* URL Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Link2 size={16} className="text-blue-400" />
              Link del Video
            </label>
            <input
              type="text"
              placeholder="https://www.facebook.com/watch/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              disabled={isLoading}
            />
          </div>

          {/* Notes Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <FileText size={16} className="text-green-400" />
              Contexto / Transcripción breve
            </label>
            <textarea
              placeholder="Describe de qué trata el video para ayudar a la IA a categorizarlo correctamente en Spotify..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all resize-none"
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 bg-red-900/20 p-3 rounded-lg text-sm">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full group relative flex items-center justify-center gap-2 bg-white text-black font-bold py-4 rounded-xl transition-all hover:bg-gray-200 active:scale-95 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                Analizando con Gemini...
              </span>
            ) : (
              <>
                Procesar Video
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-4 text-center text-xs text-gray-500">
        <div className="bg-white/5 p-3 rounded-lg">
          <strong className="block text-gray-300 mb-1">Análisis IA</strong>
          Detecta tema y género
        </div>
        <div className="bg-white/5 p-3 rounded-lg">
          <strong className="block text-gray-300 mb-1">Podcast Mapping</strong>
          Asigna el show correcto
        </div>
        <div className="bg-white/5 p-3 rounded-lg">
          <strong className="block text-gray-300 mb-1">Playlist Sync</strong>
          Añade a listas auto.
        </div>
      </div>
    </div>
  );
};