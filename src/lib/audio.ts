const AUDIO_FREQUENCIES: Record<string, number> = {
  commit: 660,
  abort: 200,
  "max-q": 880,
  landing: 523,
  nominal: 440
};

let audioContext: AudioContext | null = null;

const ensureContext = () => {
  if (typeof window === "undefined") return null;
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
};

export const playMissionCue = (cue: keyof typeof AUDIO_FREQUENCIES) => {
  const ctx = ensureContext();
  if (!ctx) return;

  if (ctx.state === "suspended") {
    ctx.resume().catch(() => undefined);
  }

  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.type = "sine";
  oscillator.frequency.value = AUDIO_FREQUENCIES[cue];

  gainNode.gain.value = 0;
  gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.start();
  oscillator.stop(ctx.currentTime + 0.65);
};
