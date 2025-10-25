export type MissionPhase =
  | "idle"
  | "pre-launch"
  | "countdown"
  | "liftoff"
  | "maxq"
  | "stage-separation"
  | "orbit-insertion"
  | "landing"
  | "complete"
  | "abort";

export interface TelemetryPoint {
  timestamp: number;
  altitude: number;
  velocity: number;
  fuel: number;
  roll: number;
  pitch: number;
  yaw: number;
}

export interface GoNoGoTeam {
  id: string;
  label: string;
  status: "go" | "no-go" | "standby";
  notes?: string;
}

export interface MissionLogEntry {
  id: string;
  timestamp: number;
  phase: MissionPhase;
  message: string;
  level: "info" | "success" | "warning" | "danger";
}

export interface MissionSettings {
  autoHold: boolean;
  soundEnabled: boolean;
  simulationSpeed: number;
  theme: "dark" | "light" | "system";
}

export interface TimelineEvent {
  id: string;
  time: number;
  label: string;
  description: string;
  phase: MissionPhase;
}
