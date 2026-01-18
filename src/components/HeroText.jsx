"use client";

import { FlipWords } from "./FlipWords";
import { motion } from "motion/react";

const HeroText = () => {
  const words = [
    "space news",
    "cosmic discoveries",
    "stellar insights",
    "galactic events",
    "insightful articles",
  ];
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="absolute top-1/4 left-1/2 z-10 max-w-2xl -translate-x-1/2 rounded-2xl bg-white/10 p-6 backdrop-blur-md shadow-xl md:left-24 md:top-1/3 md:translate-x-0">
      <motion.h1
        className="text-4xl md:text-6xl font-extrabold text-white"
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        Venture Universe
      </motion.h1>

      <motion.p
        className="mt-3 text-lg md:text-2xl text-neutral-300"
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        Your gateway to
      </motion.p>

      <motion.div
        className="mt-2"
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <FlipWords
          words={words}
          className="text-3xl md:text-5xl font-bold text-white"
        />
      </motion.div>
      
      <motion.div
        className="flex flex-col gap-4 mt-8 sm:flex-row"
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <a
          href="/news"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white transition-colors rounded-lg bg-gradient-to-r from-royal to-lavender hover:from-lavender hover:to-royal hover-animation"
        >
          Explore Latest News
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
        <a
          href="/missions"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white transition-colors rounded-lg bg-white/10 hover:bg-white/20 hover-animation"
        >
          Discover Missions
        </a>
      </motion.div>
    </div>
  );
};

export default HeroText;
