import { useMemo } from "react";
import { scaleLinear } from "d3-scale";
import { line, curveMonotoneX } from "d3-shape";
import { useMissionStore } from "../lib/store";

interface TelemetryChartProps {
  title: string;
  dataKey: "altitude" | "velocity" | "fuel";
  unit: string;
  maxValue: number;
}

const TelemetryChart = ({ title, dataKey, unit, maxValue }: TelemetryChartProps) => {
  const telemetry = useMissionStore((state) => state.telemetry);
  const points = telemetry.slice(-180);

  const path = useMemo(() => {
    if (!points.length) return "";

    const xScale = scaleLinear()
      .domain([0, points.length - 1])
      .range([0, 440]);
    const yScale = scaleLinear()
      .domain([0, maxValue])
      .range([180, 0]);

    const generator = line<typeof points[number]>()
      .x((_, i) => xScale(i))
      .y((d) => yScale(d[dataKey]))
      .curve(curveMonotoneX);

    return generator(points) ?? "";
  }, [points, dataKey, maxValue]);

  const latest = points.at(-1)?.[dataKey] ?? 0;

  return (
    <div className="bg-panel-light/60 border border-slate-800/50 rounded-3xl p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg font-semibold">{title}</h3>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Live Telemetry</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-semibold text-accent">{latest.toFixed(0)}</p>
          <p className="text-xs text-slate-400">{unit}</p>
        </div>
      </div>
      <svg viewBox="0 0 440 200" className="w-full">
        <defs>
          <linearGradient id={`gradient-${dataKey}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(56, 189, 248, 0.8)" />
            <stop offset="100%" stopColor="rgba(56, 189, 248, 0.05)" />
          </linearGradient>
        </defs>
        <rect width="440" height="200" rx="16" className="fill-slate-900/20" />
        <path
          d={path}
          fill="none"
          stroke={`url(#gradient-${dataKey})`}
          strokeWidth={3}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export const TelemetryPanel = () => (
  <section className="grid gap-4 lg:grid-cols-3">
    <TelemetryChart title="Altitude" dataKey="altitude" unit="Meters" maxValue={120000} />
    <TelemetryChart title="Velocity" dataKey="velocity" unit="m/s" maxValue={7500} />
    <TelemetryChart title="Fuel" dataKey="fuel" unit="%" maxValue={100} />
  </section>
);
