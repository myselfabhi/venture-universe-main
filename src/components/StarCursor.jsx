"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

const StarCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fineHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fineHover || reduced) return;

    setEnabled(true);
    document.documentElement.classList.add("vu-cursor-active");

    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.classList.remove("vu-cursor-active");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[70] -translate-x-1/2 -translate-y-1/2"
        style={{ left: pos.x, top: pos.y }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.6, repeat: Infinity }}
        aria-hidden="true"
      >
        <span className="block w-2 h-2 rounded-full bg-aqua shadow-[0_0_12px_rgba(51,194,204,0.9)]" />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed z-[70] -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
        animate={{ left: pos.x, top: pos.y }}
        transition={{ type: "spring", damping: 22, stiffness: 250, mass: 0.5 }}
        aria-hidden="true"
      >
        <span className="block w-8 h-8 rounded-full border border-lavender/40" />
      </motion.div>
    </>
  );
};

export default StarCursor;
