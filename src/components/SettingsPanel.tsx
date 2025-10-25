import { useMissionStore } from "../lib/store";
export const SettingsPanel = () => {
  const { settings, updateSettings } = useMissionStore((state) => ({
    settings: state.settings,
    updateSettings: state.updateSettings
  }));

  return (
    <section className="bg-panel/80 border border-slate-800/60 rounded-3xl p-6 shadow-panel space-y-6">
      <header>
        <h2 className="text-xl font-semibold font-display">Settings</h2>
        <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
          Local to this workstation
        </p>
      </header>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-sm">Auto-hold</h3>
            <p className="text-xs text-slate-500">
              Automatically pause at T-10 seconds if configured.
            </p>
          </div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={settings.autoHold}
              onChange={(event) => updateSettings({ autoHold: event.target.checked })}
              className="peer sr-only"
            />
            <div className="peer h-6 w-12 rounded-full border border-slate-600 bg-slate-700 transition peer-checked:border-accent peer-checked:bg-accent/40"></div>
            <span className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-6" />
          </label>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-sm">Mission sounds</h3>
            <p className="text-xs text-slate-500">Audio cues for key events.</p>
          </div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={settings.soundEnabled}
              onChange={(event) => updateSettings({ soundEnabled: event.target.checked })}
              className="peer sr-only"
            />
            <div className="peer h-6 w-12 rounded-full border border-slate-600 bg-slate-700 transition peer-checked:border-accent peer-checked:bg-accent/40"></div>
            <span className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-6" />
          </label>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-sm">Simulation speed</h3>
              <p className="text-xs text-slate-500">Fine-tune update cadence.</p>
            </div>
            <span className="text-sm font-semibold text-accent">{settings.simulationSpeed.toFixed(1)}x</span>
          </div>
          <div className="relative">
            <input
              type="range"
              min={0.5}
              max={3}
              step={0.1}
              value={settings.simulationSpeed}
              onChange={(event) => updateSettings({ simulationSpeed: Number(event.target.value) })}
              className="w-full cursor-pointer appearance-none rounded-full bg-slate-800/60 accent-accent"
            />
            <div className="pointer-events-none absolute inset-0 rounded-full border border-slate-700/60" />
          </div>
        </div>
        <div>
          <h3 className="font-medium text-sm mb-2">Interface theme</h3>
          <div className="grid grid-cols-3 gap-2 text-xs">
            {["dark", "light", "system"].map((theme) => (
              <button
                key={theme}
                type="button"
                onClick={() => updateSettings({ theme: theme as typeof settings.theme })}
                className={`rounded-xl border px-3 py-2 capitalize transition ${
                  settings.theme === theme
                    ? "border-accent text-accent"
                    : "border-slate-700/60 text-slate-300"
                }`}
              >
                {theme}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
