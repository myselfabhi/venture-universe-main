"use client";

import { motion, useScroll, useSpring } from "motion/react";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    mass: 0.4,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[55] bg-gradient-to-r from-aqua via-lavender to-fuchsia shadow-[0_0_8px_rgba(122,87,219,0.6)]"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
};

export default ScrollProgress;
