"use client";

import { motion } from "motion/react";

const facts = [
  "🌌 The observable universe is 93 billion light-years across.",
  "🪐 Saturn is so light it would float in water.",
  "☀️ The Sun makes up 99.86% of the solar system's mass.",
  "🌑 A day on Venus is longer than its year.",
  "🚀 The fastest human-made object: Parker Solar Probe at 692,000 km/h.",
  "🛰️ The ISS travels at 7.66 km/s — sunrise every 92 minutes.",
  "✨ Neutron stars are so dense, a teaspoon weighs 6 billion tonnes.",
  "🌍 Earth is the only known place with active plate tectonics.",
  "🌒 The Moon is moving 3.8 cm farther from Earth every year.",
  "🔭 JWST can see galaxies that formed 13.5 billion years ago.",
  "💫 Olympus Mons on Mars is 22 km tall — three times Everest.",
  "🌟 There are more stars in the universe than grains of sand on Earth.",
];

const FunFactTicker = () => (
  <div
    className="relative overflow-hidden border-y border-white/5 bg-gradient-to-r from-primary via-navy to-primary"
    aria-label="Space facts ticker"
  >
    <motion.div
      className="flex gap-12 py-3 whitespace-nowrap"
      animate={{ x: [0, -1200] }}
      transition={{
        duration: 60,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {[...facts, ...facts].map((fact, i) => (
        <span
          key={i}
          className="inline-block text-sm md:text-base text-neutral-300 px-2"
        >
          {fact}
        </span>
      ))}
    </motion.div>
    <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-primary to-transparent" />
    <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-primary to-transparent" />
  </div>
);

export default FunFactTicker;
