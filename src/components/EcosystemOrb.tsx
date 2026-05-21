import { motion, useTransform, type MotionValue } from "framer-motion";
import {
  Phone, Server, Camera, Network, Video, Cpu, Wifi, ShieldCheck,
  Radio, MonitorSpeaker, Database, Cable,
} from "lucide-react";

const orbitIcons = [
  Phone, Camera, Server, Network, Video, ShieldCheck,
  Radio, MonitorSpeaker, Database, Wifi, Cable, Cpu,
];

interface Props {
  progress: MotionValue<number>; // 0 -> 1 across entire page
}

/**
 * Persistent orb that travels down the page as the user scrolls.
 * Morphs scale, hue, ring count and wireframe opacity based on progress.
 */
export function EcosystemOrb({ progress }: Props) {
  // Vertical travel: stays roughly centered but drifts
  const y = useTransform(progress, [0, 1], ["0vh", "12vh"]);
  const x = useTransform(
    progress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    ["0vw", "-8vw", "10vw", "-6vw", "8vw", "0vw"]
  );
  const scale = useTransform(
    progress,
    [0, 0.15, 0.35, 0.55, 0.75, 0.95],
    [1, 0.85, 0.95, 0.8, 0.9, 1.15]
  );
  const hue = useTransform(progress, [0, 0.5, 1], [0, 25, -10]);
  const wireframe = useTransform(progress, [0.1, 0.3, 0.55, 0.8], [0, 1, 0.7, 1]);
  const coreGlow = useTransform(progress, [0, 1], [0.6, 1]);

  return (
    <motion.div
      style={{ y, x, scale, filter: useTransform(hue, (h) => `hue-rotate(${h}deg)`) }}
      className="pointer-events-none fixed left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
    >
      <div className="relative h-[78vmin] w-[78vmin] max-h-[720px] max-w-[720px]">
        {/* Outer glow */}
        <motion.div
          style={{ opacity: coreGlow }}
          className="absolute inset-0 rounded-full bg-radial-brand blur-2xl"
        />

        {/* Wireframe rings */}
        <motion.div style={{ opacity: wireframe }} className="absolute inset-0">
          {[0.55, 0.7, 0.85, 1].map((s, i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-full border"
              style={{
                transform: `scale(${s})`,
                borderColor: `color-mix(in oklch, var(--brand-accent) ${20 + i * 10}%, transparent)`,
              }}
            />
          ))}
        </motion.div>

        {/* Spinning orbit ring with icons */}
        <div className="orbit-spin absolute inset-0">
          {orbitIcons.map((Icon, i) => {
            const angle = (i / orbitIcons.length) * Math.PI * 2;
            const r = 46; // % from center
            const left = 50 + Math.cos(angle) * r;
            const top = 50 + Math.sin(angle) * r;
            return (
              <div
                key={i}
                className="absolute flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full glass"
                style={{ left: `${left}%`, top: `${top}%` }}
              >
                <Icon className="h-4 w-4 text-brand-accent" style={{ color: "var(--brand-accent)" }} />
              </div>
            );
          })}
        </div>

        {/* Counter spinning inner ring */}
        <div className="orbit-spin-reverse absolute inset-[12%] rounded-full border border-dashed"
          style={{ borderColor: "color-mix(in oklch, var(--brand-accent) 40%, transparent)" }} />

        {/* Core */}
        <motion.div
          style={{ opacity: coreGlow }}
          className="pulse-ring absolute inset-[28%] flex items-center justify-center rounded-full"
        >
          <div
            className="h-full w-full rounded-full"
            style={{
              background:
                "radial-gradient(circle at 35% 30%, color-mix(in oklch, var(--brand-accent) 80%, white), var(--brand-deep) 70%)",
              boxShadow:
                "0 0 80px 10px color-mix(in oklch, var(--brand-accent) 45%, transparent), inset 0 0 60px color-mix(in oklch, var(--brand-deep) 60%, transparent)",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="font-display text-3xl font-bold tracking-tight text-white md:text-5xl">
              T
            </div>
          </div>
        </motion.div>

        {/* Connection lines */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.g style={{ opacity: wireframe }} stroke="url(#orbGrad)" strokeWidth="0.15" fill="none">
            {[...Array(8)].map((_, i) => {
              const a = (i / 8) * Math.PI * 2;
              return (
                <line key={i} x1="50" y1="50"
                  x2={50 + Math.cos(a) * 46}
                  y2={50 + Math.sin(a) * 46} />
              );
            })}
          </motion.g>
          <defs>
            <linearGradient id="orbGrad" x1="0" x2="1">
              <stop offset="0" stopColor="#C84FB1" stopOpacity="0.8" />
              <stop offset="1" stopColor="#6D006F" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </motion.div>
  );
}
