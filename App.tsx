import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { ReviewSection } from './components/ReviewSection';
import { UploadProgress } from './components/UploadProgress';
import { SuccessView } from './components/SuccessView';
import { HistoryList } from './components/HistoryList';
import { SettingsModal } from './components/SettingsModal';
import { analyzeVideoContent } from './services/geminiService';
import { sendJobToBackend } from './services/apiService';
import { AppState, AnalyzedContent, UploadRecord, PROGRAM_MAPPING, BackendConfig } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [analysis, setAnalysis] = useState<AnalyzedContent | null>(null);
  const [currentUrl, setCurrentUrl] = useState<string>("");
  const [history, setHistory] = useState<UploadRecord[]>([]);
  
  // Backend Configuration State
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [backendConfig, setBackendConfig] = useState<BackendConfig>({ url: '', apiKey: '' });

  // Load config from local storage on boot
  useEffect(() => {
    const savedConfig = localStorage.getItem('facespot_backend_config');
    if (savedConfig) {
      try {
        setBackendConfig(JSON.parse(savedConfig));
      } catch (e) {
        console.error("Error parsing config", e);
      }
    }
  }, []);

  const handleSaveSettings = (config: BackendConfig) => {
    setBackendConfig(config);
    localStorage.setItem('facespot_backend_config', JSON.stringify(config));
  };

  const handleAnalyze = async (url: string, notes: string) => {
    setCurrentUrl(url);
    setState(AppState.ANALYZING);
    try {
      // Gemini runs locally in the browser to prepare the metadata
      const result = await analyzeVideoContent(url, notes);
      setAnalysis(result);
      setState(AppState.REVIEW);
    } catch (error) {
      console.error(error);
      alert("Error analizando el contenido con Gemini. Verifica tu API Key.");
      setState(AppState.IDLE); 
    }
  };

  const handleConfirm = async () => {
    if (!analysis) return;
    
    // Check if backend is configured
    if (!backendConfig.url) {
      alert("⚠️ Error de Configuración: No has definido la URL de tu servidor backend. Ve a Configuración (icono de engranaje) arriba a la derecha.");
      setIsSettingsOpen(true);
      return;
    }

    setState(AppState.UPLOADING);

    try {
      const target = PROGRAM_MAPPING[analysis.program];
      
      // Send REAL request to user's backend
      const result = await sendJobToBackend(
        backendConfig,
        currentUrl,
        analysis,
        target
      );

      if (result.success) {
        // Add to local history
        const newRecord: UploadRecord = {
          id: result.jobId || Date.now().toString(),
          date: new Date(),
          title: analysis.title,
          programName: target.programName,
          playlistName: target.playlistName,
          status: 'queued', // Backend accepted it
          jobId: result.jobId
        };
        setHistory(prev => [newRecord, ...prev]);
        setState(AppState.SUCCESS);
      } else {
        throw new Error(result.message || "Error desconocido del servidor");
      }

    } catch (error: any) {
      console.error("Upload Failed:", error);
      alert(`❌ Error conectando con el servidor backend:\n${error.message}\n\nAsegúrate de que tu servidor Python/Node está corriendo en ${backendConfig.url}`);
      setState(AppState.REVIEW); // Go back to review so they can retry
    }
  };

  const handleReset = () => {
    setAnalysis(null);
    setCurrentUrl("");
    setState(AppState.IDLE);
  };

  const isConfigured = !!backendConfig.url;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#121212] via-[#0e1e15] to-[#000000] text-white selection:bg-green-500 selection:text-black">
      <Header 
        isConnected={isConfigured} 
        onOpenSettings={() => setIsSettingsOpen(true)} 
      />
      
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)}
        onSave={handleSaveSettings}
        currentConfig={backendConfig}
      />
      
      <main className="container mx-auto px-4 py-12 flex flex-col items-center min-h-[80vh]">
        
        {state === AppState.IDLE && (
          <>
            <InputSection 
              onAnalyze={handleAnalyze} 
              isLoading={false} 
            />
            {!isConfigured && (
              <div className="mt-6 bg-orange-900/30 border border-orange-500/30 p-4 rounded-xl text-orange-200 max-w-2xl text-sm text-center cursor-pointer hover:bg-orange-900/50 transition-colors" onClick={() => setIsSettingsOpen(true)}>
                ⚠️ <strong>Modo Producción:</strong> Necesitas configurar la URL de tu servidor backend para que la app funcione realmente. Click aquí.
              </div>
            )}
            <HistoryList history={history} />
          </>
        )}

        {state === AppState.ANALYZING && (
           <InputSection 
            onAnalyze={() => {}} 
            isLoading={true} 
          />
        )}

        {state === AppState.REVIEW && analysis && (
          <ReviewSection 
            analysis={analysis} 
            onConfirm={handleConfirm} 
            onCancel={handleReset} 
            isConnected={true} // Always true now as we use backend config check inside handler
            onConnectTrigger={() => {}} 
          />
        )}

        {state === AppState.UPLOADING && (
          <UploadProgress />
        )}

        {state === AppState.SUCCESS && analysis && (
          <SuccessView 
            analysis={analysis} 
            onReset={handleReset} 
          />
        )}

      </main>

      <footer className="py-6 text-center text-gray-600 text-sm">
        <p>© 2024 FaceSpot Bridge. Production Client.</p>
      </footer>
    </div>
  );
};

export default App;