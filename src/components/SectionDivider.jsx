"use client";

import { motion } from "motion/react";

const SectionDivider = ({ count = 30 }) => {
  const stars = Array.from({ length: count }).map((_, i) => ({
    id: i,
    x: (i / count) * 100,
    y: 20 + (i % 5) * 15,
    s: 1 + (i % 3) * 0.5,
    d: (i % 7) * 0.3,
  }));

  return (
    <div
      className="relative h-12 md:h-16 c-space pointer-events-none"
      aria-hidden="true"
    >
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
      >
        {stars.map((s) => (
          <motion.circle
            key={s.id}
            cx={s.x}
            cy={s.y + 30}
            r={s.s * 0.3}
            fill="white"
            initial={{ opacity: 0.2 }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: s.d }}
          />
        ))}
      </svg>
    </div>
  );
};

export default SectionDivider;
