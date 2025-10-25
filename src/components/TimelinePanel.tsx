import { useMemo } from "react";
import { useMissionStore } from "../lib/store";
import { TIMELINE_EVENTS } from "../lib/missionData";

export const TimelinePanel = () => {
  const { phase, countdown } = useMissionStore((state) => ({
    phase: state.phase,
    countdown: state.countdown
  }));

  const activeEventId = useMemo(() => {
    const byPhase = TIMELINE_EVENTS.find((event) => event.phase === phase)?.id;
    if (byPhase) return byPhase;
    const elapsed = phase === "countdown" ? -countdown : Math.abs(countdown);
    return TIMELINE_EVENTS.find((event) => elapsed >= event.time)?.id;
  }, [phase, countdown]);

  return (
    <section className="bg-panel/80 border border-slate-800/60 rounded-3xl p-6 shadow-panel">
      <header className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold font-display">Mission Timeline</h2>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
            Key events from engine chill to landing
          </p>
        </div>
      </header>
      <ol className="space-y-4">
        {TIMELINE_EVENTS.map((event) => (
          <li
            key={event.id}
            className={`rounded-2xl border px-4 py-3 transition ${
              activeEventId === event.id
                ? "border-accent/80 bg-accent/10"
                : "border-slate-800/50 bg-panel-light/50"
            }`}
          >
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-white">{event.label}</span>
              <span className="text-xs font-mono text-slate-400">
                T{event.time >= 0 ? "+" : "-"}
                {Math.abs(event.time)}s
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              {event.description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
};
