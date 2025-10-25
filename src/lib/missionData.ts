import type { GoNoGoTeam, TimelineEvent } from "./types";

export const TEAMS: GoNoGoTeam[] = [
  { id: "guidance", label: "Guidance", status: "go" },
  { id: "prop", label: "Propulsion", status: "go" },
  { id: "comm", label: "Communications", status: "go" },
  { id: "nav", label: "Navigation", status: "go" },
  { id: "weather", label: "Weather", status: "go" },
  { id: "recovery", label: "Recovery", status: "standby" }
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: "engine-chill",
    time: -420,
    label: "Engine Chill",
    description: "Raptor engines thermal conditioning begins.",
    phase: "pre-launch"
  },
  {
    id: "final-go",
    time: -60,
    label: "Final Go/No-Go",
    description: "Flight director takes final status.",
    phase: "countdown"
  },
  {
    id: "ignition",
    time: 0,
    label: "Ignition & Liftoff",
    description: "Raptors ignite, vehicle commits to launch.",
    phase: "liftoff"
  },
  {
    id: "maxq",
    time: 78,
    label: "Max-Q",
    description: "Vehicle experiences maximum dynamic pressure.",
    phase: "maxq"
  },
  {
    id: "meco",
    time: 180,
    label: "MECO",
    description: "Main engine cutoff.",
    phase: "stage-separation"
  },
  {
    id: "seco",
    time: 520,
    label: "SECO",
    description: "Second engine cutoff and orbit insertion.",
    phase: "orbit-insertion"
  },
  {
    id: "entry-burn",
    time: 1260,
    label: "Entry Burn",
    description: "Booster begins controlled re-entry burn.",
    phase: "landing"
  },
  {
    id: "landing",
    time: 1320,
    label: "Landing",
    description: "Booster landing burn and touchdown.",
    phase: "landing"
  }
];
