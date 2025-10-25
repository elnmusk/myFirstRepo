import { useEffect, useState } from "react";
import { ArrowPathIcon, TrashIcon } from "@heroicons/react/24/outline";
import { loadLogs, clearLogs } from "../lib/storage";
import { useMissionStore } from "../lib/store";
import type { MissionLogEntry } from "../lib/types";

const levelStyles: Record<MissionLogEntry["level"], string> = {
  info: "text-slate-300",
  success: "text-accent-success",
  warning: "text-accent-warning",
  danger: "text-accent-danger"
};

export const MissionLogs = () => {
  const { logs, loadLogs: hydrateLogs, clearLogs: resetLogs } = useMissionStore((state) => ({
    logs: state.logs,
    loadLogs: state.loadLogs,
    clearLogs: state.clearLogs
  }));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hydrate = async () => {
      const entries = await loadLogs();
      hydrateLogs(entries);
      setIsLoading(false);
    };
    hydrate();
  }, [hydrateLogs]);

  const handleClear = async () => {
    await clearLogs();
    resetLogs();
  };

  return (
    <section className="bg-panel/80 border border-slate-800/60 rounded-3xl p-6 shadow-panel flex flex-col h-full">
      <header className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold font-display">Mission Log</h2>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
            Persistent event history
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => loadLogs().then(hydrateLogs)}
            className="flex items-center gap-2 rounded-xl border border-slate-700/60 bg-panel-light/60 px-3 py-2 text-xs uppercase tracking-widest text-slate-300 hover:border-accent hover:text-accent transition"
          >
            <ArrowPathIcon className="h-4 w-4" /> Refresh
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="flex items-center gap-2 rounded-xl border border-slate-700/60 bg-panel-light/60 px-3 py-2 text-xs uppercase tracking-widest text-slate-300 hover:border-accent-danger hover:text-accent-danger transition"
          >
            <TrashIcon className="h-4 w-4" /> Clear
          </button>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        {isLoading ? (
          <p className="text-sm text-slate-400 animate-pulse">Loading mission logs…</p>
        ) : logs.length === 0 ? (
          <p className="text-sm text-slate-500">
            No logs yet. Events will appear as the simulation progresses.
          </p>
        ) : (
          logs.map((entry) => (
            <article
              key={entry.id}
              className="rounded-2xl border border-slate-800/40 bg-panel-light/60 p-4"
            >
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="uppercase tracking-[0.2em]">{entry.phase}</span>
                <time dateTime={new Date(entry.timestamp).toISOString()}>
                  {new Date(entry.timestamp).toLocaleTimeString()}
                </time>
              </div>
              <p className={`mt-2 text-sm font-medium ${levelStyles[entry.level]}`}>
                {entry.message}
              </p>
            </article>
          ))
        )}
      </div>
    </section>
  );
};
