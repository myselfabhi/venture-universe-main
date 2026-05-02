"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  Users,
  Satellite,
  Orbit,
  Telescope,
  Calendar,
  Sparkles,
} from "lucide-react";
import CountUp from "../components/CountUp";
import { fadeUp, viewportOnce, staggerContainer } from "../lib/motion";

const daysSince = (dateStr) =>
  Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000);

const CosmicDashboard = () => {
  const [crew, setCrew] = useState({ count: 0, people: [] });

  useEffect(() => {
    fetch("/api/iss-crew")
      .then((r) => r.json())
      .then((d) => setCrew({ count: d.number || 0, people: d.people || [] }))
      .catch(() => {});
  }, []);

  // ISS orbits Earth every ~92 minutes → ~15.65 orbits/day
  const issOrbitsToday = Math.floor(((Date.now() - new Date().setUTCHours(0, 0, 0, 0)) / 60000) / 92);

  const cards = [
    {
      icon: Users,
      label: "People in space",
      value: crew.count,
      suffix: "",
      accent: "aqua",
      detail: crew.people.length
        ? crew.people.slice(0, 4).map((p) => p.name).join(" · ")
        : "Continuously crewed since 2000",
    },
    {
      icon: Orbit,
      label: "ISS orbits today",
      value: issOrbitsToday,
      suffix: "",
      accent: "lavender",
      detail: "~16 sunrises every Earth day",
    },
    {
      icon: Satellite,
      label: "Active satellites",
      value: 11500,
      suffix: "+",
      accent: "mint",
      detail: "Tracked in low & geostationary orbit",
    },
    {
      icon: Telescope,
      label: "JWST years",
      value: Math.max(1, Math.floor(daysSince("2021-12-25") / 365)),
      suffix: "",
      accent: "fuchsia",
      detail: "Discovering since Christmas 2021",
    },
    {
      icon: Calendar,
      label: "Days since Apollo 11",
      value: daysSince("1969-07-20"),
      suffix: "",
      accent: "coral",
      detail: "First step on another world",
    },
    {
      icon: Sparkles,
      label: "Hubble photos",
      value: 1500000,
      suffix: "+",
      accent: "sand",
      detail: "Taken since 1990 launch",
    },
  ];

  return (
    <motion.section
      className="c-space py-12 md:py-16"
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      <div className="mb-8">
        <p className="text-xs uppercase tracking-widest text-aqua mb-2">
          Cosmic dashboard
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          The universe, by the numbers
        </h2>
        <p className="text-neutral-400">
          A live snapshot of what humanity is doing in space — right now.
        </p>
      </div>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
        variants={staggerContainer(0.07)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        {cards.map((c) => (
          <motion.div
            key={c.label}
            variants={fadeUp}
            className="vu-card p-5 md:p-6 group relative overflow-hidden"
          >
            <div
              className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-${c.accent} opacity-10 blur-3xl group-hover:opacity-20 transition`}
              aria-hidden="true"
            />
            <c.icon className={`w-5 h-5 text-${c.accent} mb-3`} />
            <p className={`text-3xl md:text-5xl font-extrabold text-${c.accent}`}>
              <CountUp to={c.value} suffix={c.suffix} duration={1800} />
            </p>
            <p className="text-[11px] uppercase tracking-widest text-neutral-400 mt-1.5">
              {c.label}
            </p>
            <p className="text-xs text-neutral-500 mt-2 line-clamp-2">{c.detail}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default CosmicDashboard;
