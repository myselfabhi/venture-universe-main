"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Sparkles,
  Rocket,
  Satellite,
  Award,
  ArrowRight,
} from "lucide-react";
import { Timeline } from "../components/Timeline";
import { cosmicMilestones } from "../constants";
import { Particles } from "../components/Particles";
import { fadeUp, viewportOnce, staggerContainer } from "../lib/motion";

const ISRO_STATS = [
  { value: "120+", label: "Successful launches", icon: Rocket, color: "aqua" },
  { value: "430+", label: "Satellites deployed", icon: Satellite, color: "lavender" },
  { value: "1969", label: "Founded", icon: Sparkles, color: "fuchsia" },
  { value: "4", label: "Crewed missions ahead", icon: Award, color: "mint" },
];

const HIGHLIGHTS = [
  { year: 1975, title: "Aryabhata", desc: "India's first satellite launched aboard a Soviet Kosmos rocket." },
  { year: 1980, title: "Rohini RS-1", desc: "First successful Indian satellite launch on SLV-3 — India's space age begins." },
  { year: 2008, title: "Chandrayaan-1", desc: "Confirmed water on the Moon — a discovery that reshaped lunar science." },
  { year: 2014, title: "Mangalyaan", desc: "First Asian nation, first attempt — India reached Mars on its maiden try." },
  { year: 2017, title: "PSLV-C37", desc: "104 satellites in a single launch — a world record at the time." },
  { year: 2023, title: "Chandrayaan-3", desc: "First soft-landing near the Moon's south pole. The world watched." },
];

const CosmicJourney = () => {
  const [expandedMilestone, setExpandedMilestone] = useState(null);

  return (
    <section className="relative">
      {/* Hero */}
      <div className="relative c-space pt-28 pb-12 overflow-hidden">
        <Particles
          className="absolute inset-0 -z-10"
          quantity={60}
          ease={80}
          color={"#ffffff"}
          refresh
        />
        <div
          className="absolute -z-10 inset-0 opacity-[0.04] pointer-events-none bg-center bg-no-repeat bg-contain"
          style={{ backgroundImage: "url('/assets/ISRO.png')" }}
          aria-hidden="true"
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full vu-glass text-xs uppercase tracking-widest text-aqua mb-4">
            <Sparkles className="w-3 h-3" />
            ISRO Odyssey
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-[1.05]">
            From{" "}
            <span className="bg-gradient-to-br from-aqua via-lavender to-fuchsia bg-clip-text text-transparent">
              bullock carts
            </span>{" "}
            to the Moon's south pole
          </h1>
          <p className="text-lg text-neutral-300 leading-relaxed max-w-2xl">
            Six decades of bold engineering on a shoestring budget. India&apos;s space programme
            has redefined what frugal, fearless ambition looks like.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10"
          variants={staggerContainer(0.08, 0.2)}
          initial="hidden"
          animate="show"
        >
          {ISRO_STATS.map((s) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              className="vu-card p-5"
            >
              <s.icon className={`w-5 h-5 text-${s.color} mb-2`} />
              <p className="text-2xl md:text-3xl font-bold text-white">{s.value}</p>
              <p className="text-xs uppercase tracking-wider text-neutral-400 mt-1">
                {s.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Highlights ribbon */}
      <div className="c-space pb-8">
        <motion.h2
          className="text-xl font-semibold mb-4 text-neutral-300"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          Defining moments
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {HIGHLIGHTS.map((h, i) => (
            <motion.div
              key={h.year}
              className="vu-card p-5 group"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: i * 0.05 }}
            >
              <div className="text-3xl font-bold bg-gradient-to-br from-aqua to-lavender bg-clip-text text-transparent mb-1">
                {h.year}
              </div>
              <h3 className="font-semibold text-white mb-1.5">{h.title}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">{h.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full timeline */}
      <div className="c-space pb-16">
        <motion.div
          className="flex items-center justify-between mb-6"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <h2 className="text-2xl md:text-3xl font-bold">Full timeline</h2>
          <span className="text-xs text-neutral-500">
            Tap a milestone to expand
          </span>
        </motion.div>
        <Timeline
          data={cosmicMilestones}
          expandedMilestone={expandedMilestone}
          onExpand={setExpandedMilestone}
        />
      </div>

      {/* CTA */}
      <div className="c-space pb-12">
        <motion.div
          className="vu-card p-6 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-gradient-to-br from-aqua/20 to-lavender/20 blur-3xl pointer-events-none" />
          <div className="relative">
            <h3 className="text-xl md:text-2xl font-bold mb-2">The journey continues</h3>
            <p className="text-neutral-400">
              Gaganyaan, Aditya-L1 follow-ups, the Bharatiya Antariksh Station — the next decade
              is going to be wild.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 relative">
            <Link
              href="/missions"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-royal to-lavender text-white font-medium hover:shadow-lg hover:shadow-lavender/30 transition"
            >
              Explore missions <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/news"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full vu-glass hover:bg-white/15 transition"
            >
              Latest news
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CosmicJourney;
