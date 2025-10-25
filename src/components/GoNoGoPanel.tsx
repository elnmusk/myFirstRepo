import { Switch } from "@headlessui/react";
import { useMissionStore } from "../lib/store";
import type { GoNoGoTeam } from "../lib/types";

interface GoNoGoPanelProps {
  teams: GoNoGoTeam[];
}

export const GoNoGoPanel = ({ teams }: GoNoGoPanelProps) => {
  const setGoNoGoStatus = useMissionStore((state) => state.setGoNoGoStatus);

  return (
    <section className="bg-panel/80 border border-slate-800/60 rounded-3xl p-6 shadow-panel">
      <header className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold font-display">Go / No-Go Poll</h2>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Flight Loop</p>
        </div>
      </header>
      <ul className="space-y-4">
        {teams.map((team) => (
          <li
            key={team.id}
            className="flex items-center justify-between gap-4 bg-panel-light/60 border border-slate-800/40 rounded-2xl px-4 py-3"
          >
            <div>
              <p className="font-medium text-white">{team.label}</p>
              <p className="text-xs text-slate-400">{team.notes ?? "Awaiting status"}</p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest ${
                  team.status === "go"
                    ? "bg-accent/20 text-accent"
                    : team.status === "no-go"
                    ? "bg-accent-danger/20 text-accent-danger"
                    : "bg-slate-700/40 text-slate-300"
                }`}
              >
                {team.status}
              </span>
              <Switch
                checked={team.status === "go"}
                onChange={(value: boolean) =>
                  setGoNoGoStatus(team.id, value ? "go" : "no-go")
                }
                className={`relative inline-flex h-8 w-16 items-center rounded-full transition ${
                  team.status === "go"
                    ? "bg-accent/50 border border-accent/80"
                    : "bg-slate-700/60 border border-slate-600/70"
                }`}
              >
                <span className="sr-only">Toggle status</span>
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${
                    team.status === "go" ? "translate-x-9" : "translate-x-1"
                  }`}
                />
              </Switch>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
