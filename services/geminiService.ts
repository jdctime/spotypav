import { GoogleGenAI, Type } from "@google/genai";
import { AnalyzedContent, UpavProgram } from "../types";

// Initialize API
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeVideoContent = async (
  url: string, 
  userNotes: string
): Promise<AnalyzedContent> => {
  
  const prompt = `
    Analiza la siguiente información sobre un video de Facebook para la red de PODCASTS DE VIDEO (Video Podcast) de la UPAV.
    URL del video: ${url}
    Notas del usuario/Contexto: ${userNotes}

    Tu objetivo es actuar como el director de programación de UPAV Medios.
    Debes seleccionar el PROGRAMA ESPECÍFICO más adecuado para este video de la siguiente lista:

    1. CORRE_TIEMPO: Deportes, actividad física, carreras.
    2. EDUPAV: Vida universitaria, alumnos, campus, temas académicos generales.
    3. EN_CASO_DE_EMERGENCIA: Protección civil, seguridad, primeros auxilios, protocolos.
    4. LA_RUTA_DE_CUATE: Turismo, viajes, conocer lugares de Veracruz.
    5. LIENZO_SONORO: Arte, música, cultura, sonidos.
    6. MENTE_SANA: Psicología, salud mental, bienestar emocional y físico.
    7. MIRADAS_DIVERSAS: Inclusión, género, derechos humanos, sociedad.
    8. NOTICIERO_UPAV: Noticias oficiales de la rectoría o comunicados importantes.
    9. VOCES_INDIGENAS: Cultura indígena, lenguas originarias, tradiciones de Veracruz.
    10. CONECTA_UPAV: Vinculación, entrevistas generales, comunidad UPAV.
    11. ECO_ECONOMIA: Economía, finanzas, emprendimiento, ecología.
    12. CABINEO: Charlas, entrevistas informales, podcast de cabina (Ximena Fuentes / Jesus Platas).

    IMPORTANTE: El contenido se subirá como VIDEO PODCAST a Spotify.
    Genera un título atractivo y una descripción optimizada para SEO.
    Determina un puntaje de compatibilidad visual/video (0-100).
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "Título sugerido para el episodio de video" },
            description: { type: Type.STRING, description: "Descripción detallada para el episodio" },
            program: { 
              type: Type.STRING, 
              enum: [
                "CORRE_TIEMPO",
                "EDUPAV",
                "EN_CASO_DE_EMERGENCIA",
                "LA_RUTA_DE_CUATE",
                "LIENZO_SONORO",
                "MENTE_SANA",
                "MIRADAS_DIVERSAS",
                "NOTICIERO_UPAV",
                "VOCES_INDIGENAS",
                "CONECTA_UPAV",
                "ECO_ECONOMIA",
                "CABINEO"
              ],
              description: "El ID del programa de UPAV seleccionado"
            },
            suggestedTags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Tags relevantes para Spotify Video"
            },
            compatibilityScore: { type: Type.NUMBER, description: "Puntaje de 0 a 100" }
          },
          required: ["title", "description", "program", "suggestedTags", "compatibilityScore"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as AnalyzedContent;
    }
    throw new Error("No response text from Gemini");

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    // Fallback return
    return {
      title: "Episodio UPAV (Video)",
      description: `Video importado de: ${url}. Notas: ${userNotes}`,
      program: UpavProgram.CONECTA_UPAV, // Default fallback
      suggestedTags: ["upav", "video podcast"],
      compatibilityScore: 50
    };
  }
};