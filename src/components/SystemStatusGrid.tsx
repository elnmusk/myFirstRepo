import { BoltIcon, CpuChipIcon, SignalIcon } from "@heroicons/react/24/outline";
import { useMissionStore } from "../lib/store";

const statusCards = [
  {
    id: "propulsion",
    title: "Propulsion",
    icon: BoltIcon,
    description: "Raptor chamber pressures nominal",
    phase: "liftoff"
  },
  {
    id: "guidance",
    title: "Guidance",
    icon: CpuChipIcon,
    description: "IMU alignment verified",
    phase: "pre-launch"
  },
  {
    id: "comms",
    title: "Communications",
    icon: SignalIcon,
    description: "Starlink uplink locked",
    phase: "orbit-insertion"
  }
];

export const SystemStatusGrid = () => {
  const phase = useMissionStore((state) => state.phase);

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {statusCards.map((card) => {
        const Icon = card.icon;
        const isActive = phase === card.phase;
        return (
          <article
            key={card.id}
            className={`rounded-3xl border px-4 py-5 transition shadow-panel ${
              isActive
                ? "border-accent/70 bg-accent/10"
                : "border-slate-800/60 bg-panel-light/60"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`rounded-2xl border p-3 transition ${
                  isActive
                    ? "border-accent/60 bg-accent/20 text-accent"
                    : "border-slate-700/50 bg-slate-800/60 text-slate-300"
                }`}
              >
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-semibold text-white">{card.title}</h3>
                <p className="text-xs text-slate-400">{card.description}</p>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
};
