"use client";

import { motion } from "motion/react";

const OrbitLoader = ({ label = "Loading the cosmos…", size = 96 }) => (
  <div
    role="status"
    aria-live="polite"
    className="flex flex-col items-center justify-center gap-4 py-10"
  >
    <div
      className="relative"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* Star core */}
      <motion.span
        className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gradient-to-br from-aqua to-lavender shadow-[0_0_24px_rgba(51,194,204,0.7)]"
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      />

      {/* Outer orbit */}
      <motion.span
        className="absolute inset-0 rounded-full border border-lavender/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-lavender shadow-[0_0_12px_rgba(122,87,219,0.9)]" />
      </motion.span>

      {/* Inner orbit */}
      <motion.span
        className="absolute inset-3 rounded-full border border-aqua/30"
        animate={{ rotate: -360 }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-aqua shadow-[0_0_10px_rgba(51,194,204,0.9)]" />
      </motion.span>
    </div>

    {label && <p className="text-xs md:text-sm text-neutral-400">{label}</p>}
    <span className="sr-only">Loading content</span>
  </div>
);

export default OrbitLoader;
