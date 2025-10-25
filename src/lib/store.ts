import { nanoid } from "nanoid";
import { create } from "zustand";
import { persistLog } from "./storage";
import { playMissionCue } from "./audio";
import type {
  GoNoGoTeam,
  MissionLogEntry,
  MissionPhase,
  MissionSettings,
  TelemetryPoint
} from "./types";

interface MissionState {
  phase: MissionPhase;
  countdown: number;
  telemetry: TelemetryPoint[];
  goNoGo: GoNoGoTeam[];
  logs: MissionLogEntry[];
  settings: MissionSettings;
  setPhase: (phase: MissionPhase) => void;
  setCountdown: (value: number) => void;
  pushTelemetry: (point: TelemetryPoint) => void;
  setGoNoGoStatus: (id: string, status: GoNoGoTeam["status"], notes?: string) => void;
  initializeGoNoGo: (teams: GoNoGoTeam[]) => void;
  addLog: (entry: Omit<MissionLogEntry, "id" | "timestamp"> & { timestamp?: number }) => void;
  loadLogs: (entries: MissionLogEntry[]) => void;
  updateSettings: (settings: Partial<MissionSettings>) => void;
  clearLogs: () => void;
}

const defaultSettings: MissionSettings = {
  autoHold: true,
  soundEnabled: true,
  simulationSpeed: 1,
  theme: "dark"
};

export const useMissionStore = create<MissionState>((set, get) => ({
  phase: "idle",
  countdown: 600,
  telemetry: [],
  goNoGo: [],
  logs: [],
  settings: defaultSettings,
  setPhase: (phase) => set({ phase }),
  setCountdown: (value) => set({ countdown: value }),
  pushTelemetry: (point) =>
    set((state) => ({ telemetry: [...state.telemetry.slice(-600), point] })),
  setGoNoGoStatus: (id, status, notes) =>
    set((state) => {
      const exists = state.goNoGo.some((team) => team.id === id);
      if (!exists) {
        return {
          goNoGo: [...state.goNoGo, { id, label: id, status, notes }]
        };
      }
      return {
        goNoGo: state.goNoGo.map((team) =>
          team.id === id ? { ...team, status, notes } : team
        )
      };
    }),
  initializeGoNoGo: (teams) => set({ goNoGo: teams }),
  addLog: (entry) => {
    const { settings } = get();
    const log: MissionLogEntry = {
      id: nanoid(),
      timestamp: entry.timestamp ?? Date.now(),
      ...entry
    };
    if (settings.soundEnabled) {
      const cue =
        entry.level === "danger"
          ? "abort"
          : entry.phase === "liftoff"
          ? "commit"
          : entry.phase === "maxq"
          ? "max-q"
          : entry.phase === "landing"
          ? "landing"
          : "nominal";
      playMissionCue(cue as Parameters<typeof playMissionCue>[0]);
    }
    persistLog(log).catch(console.error);
    set((state) => ({ logs: [...state.logs, log] }));
  },
  loadLogs: (entries) => set({ logs: entries }),
  updateSettings: (settings) => set((state) => ({
    settings: { ...state.settings, ...settings }
  })),
  clearLogs: () => set({ logs: [] })
}));
