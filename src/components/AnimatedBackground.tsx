import { motion } from "framer-motion";

type Orb = {
  id: number;
  x: string;
  y: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
};

const orbs: Orb[] = [
  { id: 0, x: "10%", y: "20%", size: 500, duration: 18, delay: 0, opacity: 0.07 },
  { id: 1, x: "75%", y: "10%", size: 380, duration: 22, delay: 4, opacity: 0.05 },
  { id: 2, x: "55%", y: "60%", size: 300, duration: 16, delay: 8, opacity: 0.06 },
  { id: 3, x: "20%", y: "75%", size: 420, duration: 24, delay: 2, opacity: 0.04 },
  { id: 4, x: "85%", y: "55%", size: 260, duration: 20, delay: 6, opacity: 0.05 },
];

const particles = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  x: `${(i * 37 + 5) % 100}%`,
  y: `${(i * 53 + 10) % 100}%`,
  size: 1 + (i % 3),
  duration: 6 + (i % 8),
  delay: (i * 0.4) % 5,
}));

export function AnimatedBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* Animated gradient orbs */}
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          style={{
            position: "absolute",
            left: orb.x,
            top: orb.y,
            width: orb.size,
            height: orb.size,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(197,66,37,${orb.opacity * 2}) 0%, rgba(197,66,37,${orb.opacity}) 40%, transparent 70%)`,
            filter: "blur(60px)",
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            x: [0, 40, -30, 20, 0],
            y: [0, -30, 40, -20, 0],
            scale: [1, 1.15, 0.92, 1.08, 1],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "rgba(197,66,37,0.5)",
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Subtle grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />
    </div>
  );
}
