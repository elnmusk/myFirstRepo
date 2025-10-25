import { useEffect, useState } from "react";
import { RocketLaunchIcon, PauseIcon, PlayIcon } from "@heroicons/react/24/solid";
import { useMissionStore } from "../lib/store";
import { useCountdown } from "../hooks/useCountdown";

const formatTime = (value: number) => {
  const prefix = value >= 0 ? "T-" : "T+";
  const absValue = Math.abs(value);
  const minutes = Math.floor(absValue / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(absValue % 60)
    .toString()
    .padStart(2, "0");
  return `${prefix}${minutes}:${seconds}`;
};

export const CountdownPanel = () => {
  const { countdown, setCountdown, setPhase, addLog, phase, settings } = useMissionStore(
    (state) => ({
      countdown: state.countdown,
      setCountdown: state.setCountdown,
      setPhase: state.setPhase,
      addLog: state.addLog,
      phase: state.phase,
      settings: state.settings
    })
  );
  const [isRunning, setIsRunning] = useState(false);
  useCountdown(isRunning);

  useEffect(() => {
    if (phase === "liftoff") {
      setIsRunning(false);
    }
  }, [phase]);

  const handleStart = () => {
    setPhase("countdown");
    setIsRunning(true);
    addLog({
      phase: "countdown",
      message: "Countdown resumed by flight director.",
      level: "info"
    });
  };

  const handlePause = () => {
    setIsRunning(false);
    addLog({
      phase: "countdown",
      message: "Countdown paused.",
      level: "warning"
    });
  };

  const handleReset = () => {
    setCountdown(600);
    setPhase("pre-launch");
    setIsRunning(false);
    addLog({
      phase: "pre-launch",
      message: "Countdown recycled to T-10 minutes.",
      level: "info"
    });
  };

  return (
    <section className="bg-panel/80 border border-slate-800/60 rounded-3xl p-6 shadow-panel">
      <header className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold font-display">Launch Countdown</h2>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
            Auto-hold {settings.autoHold ? "enabled" : "disabled"}
          </p>
        </div>
      </header>
      <div className="flex flex-col gap-6">
        <div className="text-center">
          <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-full border border-accent/60 bg-panel-light/40 shadow-inner">
            <span className="text-4xl font-display tracking-[0.3em] text-accent">
              {formatTime(countdown)}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700/60 bg-panel-light/60 px-4 py-2 text-xs uppercase tracking-widest text-slate-300 hover:border-accent hover:text-accent transition"
          >
            <RocketLaunchIcon className="h-4 w-4" /> Recycle
          </button>
          {isRunning ? (
            <button
              type="button"
              onClick={handlePause}
              className="inline-flex items-center gap-2 rounded-xl border border-accent/60 bg-accent/10 px-4 py-2 text-xs uppercase tracking-widest text-accent hover:bg-accent/20 transition"
            >
              <PauseIcon className="h-4 w-4" /> Hold
            </button>
          ) : (
            <button
              type="button"
              onClick={handleStart}
              className="inline-flex items-center gap-2 rounded-xl border border-accent-success/70 bg-accent-success/10 px-4 py-2 text-xs uppercase tracking-widest text-accent-success hover:bg-accent-success/20 transition"
            >
              <PlayIcon className="h-4 w-4" /> Resume
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
