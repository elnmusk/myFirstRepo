import { useEffect } from "react";
import { useMissionStore } from "../lib/store";
import type { TelemetryPoint } from "../lib/types";

const generatePoint = (baseTime: number, elapsed: number): TelemetryPoint => {
  const t = baseTime + elapsed * 1000;
  const apex = 120_000;
  const ascentDuration = 600;
  const descentStart = 900;
  const descentDuration = 480;

  const ascentProgress = Math.min(elapsed / ascentDuration, 1);
  const altitudeAscent = apex * (1 - Math.pow(1 - ascentProgress, 3));
  const descentProgress = Math.max((elapsed - descentStart) / descentDuration, 0);
  const altitudeDescent = apex * Math.max(0, 1 - descentProgress);
  const altitude = elapsed < descentStart ? altitudeAscent : altitudeDescent;

  const velocity =
    elapsed < descentStart
      ? Math.min(7600, Math.pow(elapsed * 1.1, 1.12))
      : Math.max(0, 5500 - (elapsed - descentStart) * 9);
  const fuel = Math.max(5, 100 - elapsed * 0.07);
  return {
    timestamp: t,
    altitude,
    velocity,
    fuel,
    roll: Math.sin(elapsed / 25) * 2,
    pitch: Math.max(-5, 85 - elapsed * 0.03),
    yaw: Math.cos(elapsed / 30) * 2
  };
};

export const useTelemetry = (running: boolean, speed: number) => {
  const pushTelemetry = useMissionStore((state) => state.pushTelemetry);

  useEffect(() => {
    if (!running) return;
    let animationFrame: number;
    let start = performance.now();
    let offset = 0;

    const tick = () => {
      const now = performance.now();
      const delta = (now - start) / 1000;
      start = now;
      offset += delta * speed;
      const point = generatePoint(Date.now(), offset);
      pushTelemetry(point);
      animationFrame = requestAnimationFrame(tick);
    };

    animationFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrame);
  }, [pushTelemetry, running, speed]);
};
