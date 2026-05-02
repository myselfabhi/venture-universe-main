"use client";

import { motion } from "motion/react";

const StarfieldLoader = ({ label = "Charting the stars…" }) => {
  const stars = Array.from({ length: 24 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 2,
    size: 1 + Math.random() * 2,
  }));

  return (
    <div
      role="status"
      aria-live="polite"
      className="relative flex flex-col items-center justify-center gap-4 py-16 min-h-[200px]"
    >
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        {stars.map((s) => (
          <motion.span
            key={s.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
            }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.6, 1] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              delay: s.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      <div className="relative z-10 flex flex-col items-center gap-3">
        <motion.div
          className="w-12 h-12 rounded-full border-2 border-lavender/30 border-t-lavender"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        />
        {label && <p className="text-xs md:text-sm text-neutral-400">{label}</p>}
      </div>
    </div>
  );
};

export default StarfieldLoader;
