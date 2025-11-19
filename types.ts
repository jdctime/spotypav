export enum AppState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  REVIEW = 'REVIEW',
  UPLOADING = 'UPLOADING', // Now represents sending to backend
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export enum UpavProgram {
  CORRE_TIEMPO = 'CORRE_TIEMPO',
  EDUPAV = 'EDUPAV',
  EN_CASO_DE_EMERGENCIA = 'EN_CASO_DE_EMERGENCIA',
  LA_RUTA_DE_CUATE = 'LA_RUTA_DE_CUATE',
  LIENZO_SONORO = 'LIENZO_SONORO',
  MENTE_SANA = 'MENTE_SANA',
  MIRADAS_DIVERSAS = 'MIRADAS_DIVERSAS',
  NOTICIERO_UPAV = 'NOTICIERO_UPAV',
  VOCES_INDIGENAS = 'VOCES_INDIGENAS',
  CONECTA_UPAV = 'CONECTA_UPAV',
  ECO_ECONOMIA = 'ECO_ECONOMIA',
  CABINEO = 'CABINEO'
}

export interface AnalyzedContent {
  title: string;
  description: string;
  program: UpavProgram;
  suggestedTags: string[];
  compatibilityScore: number; // 0-100
}

export interface SpotifyTarget {
  programName: string;
  playlistName: string;
  programId: string;
  playlistId: string;
}

export interface UploadRecord {
  id: string;
  date: Date;
  title: string;
  programName: string;
  playlistName: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  jobId?: string;
}

export interface BackendConfig {
  url: string;
  apiKey?: string;
}

// MAPPING EXACTLY TO EXISTING PUBLIC PLAYLISTS OF USER 31nqij6lzxrqkijn7cflbbd7nze4
export const PROGRAM_MAPPING: Record<UpavProgram, SpotifyTarget> = {
  [UpavProgram.CORRE_TIEMPO]: {
    programName: "Corre Tiempo",
    playlistName: "CORRE TIEMPO",
    programId: "show_corre_tiempo",
    playlistId: "pl_corre_tiempo_ex"
  },
  [UpavProgram.EDUPAV]: {
    programName: "EdUPAV",
    playlistName: "EdUPAV",
    programId: "show_edupav",
    playlistId: "pl_edupav_ex"
  },
  [UpavProgram.EN_CASO_DE_EMERGENCIA]: {
    programName: "En caso de emergencia",
    playlistName: "EN CASO DE EMERGENCIA",
    programId: "show_emergencia",
    playlistId: "pl_emergencia_ex"
  },
  [UpavProgram.LA_RUTA_DE_CUATE]: {
    programName: "La ruta de Cuate",
    playlistName: "LA RUTA DE CUATE",
    programId: "show_ruta_cuate",
    playlistId: "pl_ruta_cuate_ex"
  },
  [UpavProgram.LIENZO_SONORO]: {
    programName: "Lienzo Sonoro",
    playlistName: "LIENZO SONORO",
    programId: "show_lienzo",
    playlistId: "pl_lienzo_ex"
  },
  [UpavProgram.MENTE_SANA]: {
    programName: "Mente sana en cuerpo sano",
    playlistName: "MENTE SANA EN CUERPO SANO",
    programId: "show_mente_sana",
    playlistId: "pl_mente_sana_ex"
  },
  [UpavProgram.MIRADAS_DIVERSAS]: {
    programName: "Miradas Diversas",
    playlistName: "MIRADAS DIVERSAS",
    programId: "show_miradas",
    playlistId: "pl_miradas_ex"
  },
  [UpavProgram.NOTICIERO_UPAV]: {
    programName: "NOTICIERO UPAV",
    playlistName: "NOTICIERO UPAV",
    programId: "show_noticiero",
    playlistId: "pl_noticiero_ex"
  },
  [UpavProgram.VOCES_INDIGENAS]: {
    programName: "Voces Indígenas de Veracruz",
    playlistName: "VOCES INDÍGENAS DE VERACRUZ",
    programId: "show_voces",
    playlistId: "pl_voces_ex"
  },
  [UpavProgram.CONECTA_UPAV]: {
    programName: "Conecta UPAV",
    playlistName: "CONECTA UPAV",
    programId: "show_conecta",
    playlistId: "pl_conecta_ex"
  },
  [UpavProgram.ECO_ECONOMIA]: {
    programName: "ECO de ECOnomía",
    playlistName: "ECO de ECOnomía y ECO de ECOlogía",
    programId: "show_eco",
    playlistId: "pl_eco_ex"
  },
  [UpavProgram.CABINEO]: {
    programName: "Cabineo",
    playlistName: "CABINEO",
    programId: "show_cabineo",
    playlistId: "pl_cabineo_ex"
  }
};