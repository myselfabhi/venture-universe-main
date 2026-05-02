"use client";

import { motion } from "motion/react";
import { Rocket } from "lucide-react";

const RocketLoader = ({ label = "Lighting the engines…" }) => (
  <div
    role="status"
    aria-live="polite"
    className="flex flex-col items-center justify-center gap-4 py-12"
  >
    <div className="relative w-24 h-24">
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ y: [-4, -16, -4] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Rocket className="w-10 h-10 text-aqua drop-shadow-[0_0_12px_rgba(51,194,204,0.8)]" />
      </motion.div>
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-10 rounded-full bg-gradient-to-t from-coral via-orange to-transparent blur-sm"
        animate={{ opacity: [0.4, 1, 0.4], scaleY: [0.7, 1.2, 0.7] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      />
    </div>
    {label && <p className="text-xs md:text-sm text-neutral-400">{label}</p>}
    <span className="sr-only">Loading launches</span>
  </div>
);

export default RocketLoader;
