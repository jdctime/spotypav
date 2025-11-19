import React from 'react';
import { UploadRecord } from '../types';
import { Clock, CheckCircle2, PlayCircle, ListMusic } from 'lucide-react';

interface HistoryListProps {
  history: UploadRecord[];
}

export const HistoryList: React.FC<HistoryListProps> = ({ history }) => {
  if (history.length === 0) return null;

  return (
    <div className="w-full max-w-2xl mx-auto mt-12 animate-fade-in">
      <div className="flex items-center gap-2 mb-4 px-2">
        <Clock size={18} className="text-gray-400" />
        <h3 className="text-gray-300 font-semibold">Historial de Envíos Recientes</h3>
      </div>
      
      <div className="bg-gray-900/30 border border-white/5 rounded-xl overflow-hidden">
        {history.map((record) => (
          <div key={record.id} className="p-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center text-green-500">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <h4 className="font-medium text-white">{record.title}</h4>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                  <span className="flex items-center gap-1">
                    <ListMusic size={12} /> {record.playlistName}
                  </span>
                  <span>•</span>
                  <span>{record.date.toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full border border-green-500/20">
                {record.status === 'completed' ? 'En Cola' : 'Procesando'}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-2 text-xs text-gray-600">
        Estos elementos están en la cola de procesamiento del servidor.
      </div>
    </div>
  );
};