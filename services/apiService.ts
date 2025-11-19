import { AnalyzedContent, BackendConfig, SpotifyTarget } from "../types";

interface JobPayload {
  sourceUrl: string;
  metadata: AnalyzedContent;
  target: SpotifyTarget;
  timestamp: string;
}

export const sendJobToBackend = async (
  config: BackendConfig,
  url: string,
  analysis: AnalyzedContent,
  target: SpotifyTarget
): Promise<{ success: boolean; jobId?: string; message?: string }> => {
  
  if (!config.url) {
    throw new Error("URL del servidor no configurada");
  }

  const payload: JobPayload = {
    sourceUrl: url,
    metadata: analysis,
    target: target,
    timestamp: new Date().toISOString()
  };

  try {
    // Remove trailing slash if present
    const baseUrl = config.url.replace(/\/$/, "");
    
    const response = await fetch(`${baseUrl}/api/process`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(config.apiKey ? { 'Authorization': `Bearer ${config.apiKey}` } : {})
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server Error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    return {
      success: true,
      jobId: data.jobId || Date.now().toString(),
      message: data.message
    };

  } catch (error) {
    console.error("Backend Error:", error);
    throw error;
  }
};