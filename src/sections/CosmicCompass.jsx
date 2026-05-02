"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Compass } from "lucide-react";
import MissionArt from "../components/MissionArt";
import { fadeUp, viewportOnce } from "../lib/motion";

const DESTINATIONS = [
  {
    id: "iss",
    title: "Track the ISS",
    subtitle: "Live, right now",
    desc: "Watch humanity's outpost orbit Earth at 27,600 km/h.",
    href: "/iss",
    tags: ["LEO"],
    cta: "Open tracker",
  },
  {
    id: "moon",
    title: "Lunar missions",
    subtitle: "Artemis & Chandrayaan",
    desc: "From Apollo's footprints to the south-polar future.",
    href: "/missions",
    tags: ["Moon"],
    cta: "See missions",
  },
  {
    id: "mars",
    title: "Mars rovers",
    subtitle: "On the red surface",
    desc: "Perseverance, Curiosity, and the long road to sample return.",
    href: "/missions",
    tags: ["Mars"],
    cta: "See missions",
  },
  {
    id: "telescope",
    title: "JWST horizons",
    subtitle: "1.5M km from home",
    desc: "Observing the universe's first galaxies in infrared.",
    href: "/missions/jwst",
    tags: ["Telescope"],
    cta: "Read dossier",
  },
  {
    id: "saturn",
    title: "Outer worlds",
    subtitle: "Jupiter, Saturn, beyond",
    desc: "Europa Clipper, Dragonfly, Lucy — the gas-giant tour.",
    href: "/missions",
    tags: ["Saturn"],
    cta: "Explore",
  },
  {
    id: "tonight",
    title: "Sky tonight",
    subtitle: "From your spot",
    desc: "Moon phase, planet visibility, sunrise — based on where you are.",
    href: "/sky-tonight",
    tags: ["default"],
    cta: "Open sky map",
  },
];

const CosmicCompass = () => {
  const [active, setActive] = useState(DESTINATIONS[0].id);

  return (
    <motion.section
      className="c-space py-12 md:py-16"
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      <div className="mb-8 flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Compass className="w-4 h-4 text-aqua" />
            <span className="text-xs uppercase tracking-widest text-aqua">
              Cosmic compass
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-1">
            Where will you go today?
          </h2>
          <p className="text-neutral-400">
            Pick a destination — we&apos;ll plot the course.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Tab list */}
        <div className="lg:col-span-1 grid grid-cols-2 lg:grid-cols-1 gap-2">
          {DESTINATIONS.map((d) => (
            <button
              key={d.id}
              onClick={() => setActive(d.id)}
              onMouseEnter={() => setActive(d.id)}
              className={`text-left vu-glass rounded-xl px-4 py-3 transition group ${
                active === d.id
                  ? "bg-gradient-to-r from-royal/30 to-lavender/20 border-lavender/40"
                  : "hover:bg-white/10"
              }`}
            >
              <p
                className={`text-sm font-semibold ${
                  active === d.id ? "text-white" : "text-neutral-300"
                }`}
              >
                {d.title}
              </p>
              <p className="text-[11px] text-neutral-500">{d.subtitle}</p>
            </button>
          ))}
        </div>

        {/* Preview */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {DESTINATIONS.filter((d) => d.id === active).map((d) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="vu-card overflow-hidden h-full min-h-[280px] grid grid-cols-1 md:grid-cols-2"
              >
                <div className="relative h-44 md:h-auto overflow-hidden">
                  <MissionArt tags={d.tags} slug={d.id} />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/60 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-aqua mb-2">
                      {d.subtitle}
                    </p>
                    <h3 className="text-2xl md:text-3xl font-bold mb-3">{d.title}</h3>
                    <p className="text-neutral-400 leading-relaxed">{d.desc}</p>
                  </div>
                  <Link
                    href={d.href}
                    className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-royal to-lavender text-white font-medium hover:shadow-lg hover:shadow-lavender/40 transition self-start"
                  >
                    {d.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
};

export default CosmicCompass;
