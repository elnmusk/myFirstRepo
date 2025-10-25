import { useEffect } from "react";
import { useMissionStore } from "../lib/store";

export const useCountdown = (active: boolean) => {
  const simulationSpeed = useMissionStore((state) => state.settings.simulationSpeed);
  const autoHold = useMissionStore((state) => state.settings.autoHold);
  const setPhase = useMissionStore((state) => state.setPhase);
  const addLog = useMissionStore((state) => state.addLog);
  const setCountdown = useMissionStore((state) => state.setCountdown);

  useEffect(() => {
    if (!active) return;

    let lastTick = performance.now();
    let raf: number;

    const tick = (time: number) => {
      const deltaSeconds = ((time - lastTick) / 1000) * simulationSpeed;
      lastTick = time;

      const state = useMissionStore.getState();
      const current = state.countdown - deltaSeconds;

      if (autoHold && current <= 10 && current > 0) {
        setPhase("pre-launch");
        setCountdown(600);
        addLog({
          phase: "countdown",
          message: "Auto-hold triggered at T-10 seconds",
          level: "warning"
        });
        return;
      }

      if (current <= 0) {
        setCountdown(0);
        setPhase("liftoff");
        addLog({
          phase: "liftoff",
          message: "Liftoff! Starship is committed to flight.",
          level: "success"
        });
        return;
      }

      setCountdown(current);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [active, simulationSpeed, autoHold, setPhase, setCountdown, addLog]);
};
