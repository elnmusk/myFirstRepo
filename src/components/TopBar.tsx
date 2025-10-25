import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useMissionStore } from "../lib/store";

export const TopBar = () => {
  const { phase, countdown, settings, updateSettings } = useMissionStore((state) => ({
    phase: state.phase,
    countdown: state.countdown,
    settings: state.settings,
    updateSettings: state.updateSettings
  }));

  const toggleTheme = () => {
    updateSettings({ theme: settings.theme === "dark" ? "light" : "dark" });
  };

  const formatCountdown = (value: number) => {
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

  return (
    <header className="bg-panel/70 backdrop-blur rounded-3xl shadow-panel border border-slate-800/60 p-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
      <div>
        <p className="uppercase tracking-[0.35em] text-xs text-slate-400 font-semibold">
          Starship Mission Control
        </p>
        <h1 className="text-3xl font-display font-semibold">Flight Director Console</h1>
      </div>
      <div className="flex items-center gap-4 text-sm">
        <div className="bg-panel-light/60 border border-slate-800/40 rounded-xl px-4 py-2 text-slate-300">
          <p className="text-xs uppercase tracking-widest text-slate-400">Phase</p>
          <p className="font-medium text-lg text-white">{phase.replace(/-/g, " ")}</p>
        </div>
        <div className="bg-panel-light/60 border border-slate-800/40 rounded-xl px-4 py-2 text-slate-300">
          <p className="text-xs uppercase tracking-widest text-slate-400">Countdown</p>
          <p className="font-medium text-lg text-white">{formatCountdown(countdown)}</p>
        </div>
        <button
          type="button"
          onClick={toggleTheme}
          className="inline-flex items-center justify-center rounded-full bg-panel-light/60 border border-slate-700/60 p-3 text-slate-200 hover:text-white hover:border-accent transition"
        >
          {settings.theme === "dark" ? (
            <SunIcon className="h-5 w-5" aria-hidden="true" />
          ) : (
            <MoonIcon className="h-5 w-5" aria-hidden="true" />
          )}
          <span className="sr-only">Toggle theme</span>
        </button>
      </div>
    </header>
  );
};
