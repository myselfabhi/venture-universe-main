"use client";

import { motion } from "motion/react";
import {
  Moon,
  Telescope,
  Rocket,
  Globe,
  Orbit,
  Satellite,
  Sparkles,
  Compass,
} from "lucide-react";

// Per-tag visual identity. First tag wins.
const PALETTES = {
  Moon: {
    gradient: "from-indigo via-storm to-primary",
    glow: "from-aqua/30 to-lavender/30",
    accent: "text-aqua",
    icon: Moon,
    body: { from: "#e8e8ec", to: "#9aa0b0" },
  },
  Mars: {
    gradient: "from-[#3a1a0e] via-[#7a2d18] to-[#1a0d0a]",
    glow: "from-coral/40 to-orange/40",
    accent: "text-orange",
    icon: Globe,
    body: { from: "#ff7a3a", to: "#7a2d18" },
  },
  Telescope: {
    gradient: "from-[#0d1f3a] via-[#1a3a6e] to-primary",
    glow: "from-aqua/40 to-lavender/30",
    accent: "text-aqua",
    icon: Telescope,
    body: { from: "#7af0ff", to: "#5c33cc" },
  },
  L2: {
    gradient: "from-[#0d1f3a] via-[#1a3a6e] to-primary",
    glow: "from-aqua/40 to-lavender/30",
    accent: "text-aqua",
    icon: Telescope,
    body: { from: "#7af0ff", to: "#5c33cc" },
  },
  Crewed: {
    gradient: "from-royal via-storm to-primary",
    glow: "from-fuchsia/30 to-coral/30",
    accent: "text-fuchsia",
    icon: Rocket,
    body: { from: "#ea4884", to: "#5c33cc" },
  },
  Jupiter: {
    gradient: "from-[#3a2a0e] via-[#7a5a2d] to-[#1a1208]",
    glow: "from-sand/40 to-orange/30",
    accent: "text-sand",
    icon: Orbit,
    body: { from: "#d6995c", to: "#7a4a18" },
  },
  Saturn: {
    gradient: "from-[#3a2a0e] via-[#7a5a2d] to-[#1a1208]",
    glow: "from-sand/40 to-mint/30",
    accent: "text-sand",
    icon: Orbit,
    body: { from: "#d6995c", to: "#a8b87a" },
  },
  Asteroid: {
    gradient: "from-storm via-indigo to-primary",
    glow: "from-mint/30 to-aqua/30",
    accent: "text-mint",
    icon: Sparkles,
    body: { from: "#9aa0b0", to: "#454858" },
  },
  ISRO: {
    gradient: "from-[#0d2a3a] via-[#1f1e39] to-primary",
    glow: "from-orange/30 to-aqua/30",
    accent: "text-orange",
    icon: Rocket,
    body: { from: "#ff7a3a", to: "#33c2cc" },
  },
  SpaceX: {
    gradient: "from-storm via-navy to-primary",
    glow: "from-aqua/30 to-fuchsia/30",
    accent: "text-aqua",
    icon: Rocket,
    body: { from: "#33c2cc", to: "#5c33cc" },
  },
  Reusable: {
    gradient: "from-storm via-navy to-primary",
    glow: "from-aqua/30 to-fuchsia/30",
    accent: "text-aqua",
    icon: Rocket,
    body: { from: "#33c2cc", to: "#5c33cc" },
  },
  LEO: {
    gradient: "from-[#0d1f3a] via-storm to-primary",
    glow: "from-aqua/30 to-mint/30",
    accent: "text-aqua",
    icon: Satellite,
    body: { from: "#33c2cc", to: "#57db96" },
  },
  default: {
    gradient: "from-storm via-indigo to-primary",
    glow: "from-lavender/30 to-aqua/30",
    accent: "text-lavender",
    icon: Compass,
    body: { from: "#7a57db", to: "#33c2cc" },
  },
};

const pickPalette = (tags = []) => {
  for (const t of tags) {
    if (PALETTES[t]) return PALETTES[t];
  }
  return PALETTES.default;
};

const hashStars = (seed = "x", count = 18) => {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  const out = [];
  for (let i = 0; i < count; i++) {
    h = (h * 1103515245 + 12345) & 0x7fffffff;
    const x = (h % 1000) / 10;
    h = (h * 1103515245 + 12345) & 0x7fffffff;
    const y = (h % 1000) / 10;
    h = (h * 1103515245 + 12345) & 0x7fffffff;
    const s = 0.6 + ((h % 100) / 100) * 1.6;
    out.push({ x, y, s, d: i * 0.18 });
  }
  return out;
};

const MissionArt = ({ tags = [], slug = "", small = false }) => {
  const p = pickPalette(tags);
  const Icon = p.icon;
  const stars = hashStars(slug, small ? 12 : 22);

  return (
    <div
      className={`relative w-full h-full overflow-hidden bg-gradient-to-br ${p.gradient}`}
      aria-hidden="true"
    >
      {/* nebula glow */}
      <div
        className={`absolute -top-1/4 -right-1/4 w-2/3 h-2/3 rounded-full bg-gradient-to-br ${p.glow} blur-3xl`}
      />
      <div
        className={`absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-gradient-to-br ${p.glow} blur-3xl opacity-60`}
      />

      {/* stars */}
      {stars.map((st, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${st.x}%`,
            top: `${st.y}%`,
            width: st.s,
            height: st.s,
          }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: st.d }}
        />
      ))}

      {/* central body */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            viewBox="0 0 200 200"
            className={small ? "w-24 h-24" : "w-44 h-44 md:w-56 md:h-56"}
          >
            <defs>
              <radialGradient id={`g-${slug}`} cx="35%" cy="30%">
                <stop offset="0%" stopColor={p.body.from} stopOpacity="1" />
                <stop offset="100%" stopColor={p.body.to} stopOpacity="1" />
              </radialGradient>
              <radialGradient id={`atm-${slug}`} cx="50%" cy="50%">
                <stop offset="60%" stopColor={p.body.from} stopOpacity="0" />
                <stop offset="100%" stopColor={p.body.from} stopOpacity="0.28" />
              </radialGradient>
            </defs>
            <circle cx="100" cy="100" r="98" fill={`url(#atm-${slug})`} />
            <circle cx="100" cy="100" r="70" fill={`url(#g-${slug})`} />
            {/* terminator shadow */}
            <circle
              cx="100"
              cy="100"
              r="70"
              fill="black"
              opacity="0.35"
              style={{ clipPath: "inset(0 0 0 50%)" }}
            />
          </svg>
        </motion.div>
      </div>

      {/* orbiting tag icon */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <div
          className={small ? "w-32 h-32" : "w-60 h-60 md:w-72 md:h-72"}
          style={{ position: "relative" }}
        >
          <span
            className={`absolute -top-1 left-1/2 -translate-x-1/2 p-1.5 rounded-full vu-glass ${p.accent}`}
          >
            <Icon className={small ? "w-3 h-3" : "w-4 h-4"} />
          </span>
        </div>
      </motion.div>

      {/* subtle orbit ring */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className={`${
            small ? "w-32 h-32" : "w-60 h-60 md:w-72 md:h-72"
          } rounded-full border border-white/10`}
        />
      </div>
    </div>
  );
};

export default MissionArt;
