import { useEffect, useRef } from "react";
import { Layout } from "./components/Layout";
import { TopBar } from "./components/TopBar";
import { CountdownPanel } from "./components/CountdownPanel";
import { TelemetryPanel } from "./components/TelemetryPanel";
import { MissionLogs } from "./components/MissionLogs";
import { GoNoGoPanel } from "./components/GoNoGoPanel";
import { TimelinePanel } from "./components/TimelinePanel";
import { SettingsPanel } from "./components/SettingsPanel";
import { SystemStatusGrid } from "./components/SystemStatusGrid";
import { useMissionStore } from "./lib/store";
import { useTelemetry } from "./hooks/useTelemetry";
import { TEAMS } from "./lib/missionData";

const App = () => {
  const { settings, goNoGo, setPhase, addLog, initializeGoNoGo, phase, telemetry } = useMissionStore((state) => ({
    settings: state.settings,
    goNoGo: state.goNoGo,
    setPhase: state.setPhase,
    addLog: state.addLog,
    initializeGoNoGo: state.initializeGoNoGo,
    phase: state.phase,
    telemetry: state.telemetry
  }));
  const simulationSpeed = settings.simulationSpeed;
  const milestones = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!goNoGo.length) {
      initializeGoNoGo(TEAMS);
      setPhase("pre-launch");
      addLog({
        phase: "pre-launch",
        message: "Mission control initialized.",
        level: "info"
      });
    }
  }, [goNoGo.length, setPhase, addLog, initializeGoNoGo]);

  useEffect(() => {
    if (settings.theme === "system") {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      const apply = () =>
        document.documentElement.classList.toggle("dark", media.matches);
      apply();
      media.addEventListener("change", apply);
      return () => media.removeEventListener("change", apply);
    } else {
      document.documentElement.classList.toggle("dark", settings.theme === "dark");
    }
  }, [settings.theme]);

  useTelemetry(true, simulationSpeed);

  useEffect(() => {
    if (phase === "pre-launch") {
      milestones.current.clear();
    }
  }, [phase]);

  useEffect(() => {
    const last = telemetry.at(-1);
    if (!last) return;

    if (phase === "liftoff" && last.altitude > 15000 && !milestones.current.has("maxq")) {
      milestones.current.add("maxq");
      setPhase("maxq");
      addLog({
        phase: "maxq",
        message: "Vehicle through Max-Q.",
        level: "success"
      });
    }

    if (last.altitude > 60000 && !milestones.current.has("stage-separation")) {
      milestones.current.add("stage-separation");
      setPhase("stage-separation");
      addLog({
        phase: "stage-separation",
        message: "Stage separation confirmed.",
        level: "success"
      });
    }

    if (last.altitude > 100000 && !milestones.current.has("orbit-insertion")) {
      milestones.current.add("orbit-insertion");
      setPhase("orbit-insertion");
      addLog({
        phase: "orbit-insertion",
        message: "Starship achieved orbital insertion.",
        level: "success"
      });
    }

    if (phase === "orbit-insertion" && last.altitude < 50000 && !milestones.current.has("landing")) {
      milestones.current.add("landing");
      setPhase("landing");
      addLog({
        phase: "landing",
        message: "Booster performing landing burn.",
        level: "success"
      });
    }

    if (phase === "landing" && last.altitude < 1000 && !milestones.current.has("complete")) {
      milestones.current.add("complete");
      setPhase("complete");
      addLog({
        phase: "complete",
        message: "Starship safely landed. Mission complete.",
        level: "success"
      });
    }
  }, [telemetry, phase, addLog, setPhase]);

  return (
    <Layout
      sidebar={
        <div className="space-y-6">
          <CountdownPanel />
          <GoNoGoPanel teams={goNoGo.length ? goNoGo : TEAMS} />
          <SettingsPanel />
        </div>
      }
    >
      <TopBar />
      <SystemStatusGrid />
      <TelemetryPanel />
      <TimelinePanel />
      <MissionLogs />
    </Layout>
  );
};

export default App;
