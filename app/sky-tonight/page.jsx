"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  Telescope,
  Sun,
  Moon,
  MapPin,
  Sparkles,
  Sunset,
  Sunrise,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../../src/sections/Footer";
import {
  moonPhase,
  moonPhaseName,
  moonIllumination,
  sunTimes,
  visiblePlanets,
} from "../../src/lib/astronomy";

const MoonGraphic = ({ phase }) => {
  const illum = moonIllumination(phase);
  return (
    <div className="relative w-28 h-28 mx-auto">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neutral-300 to-neutral-500 shadow-[0_0_60px_rgba(255,255,255,0.15)]" />
      <div
        className="absolute inset-0 rounded-full bg-primary mix-blend-darken"
        style={{
          clipPath:
            phase < 0.5
              ? `inset(0 ${illum}% 0 0)`
              : `inset(0 0 0 ${illum}%)`,
        }}
      />
    </div>
  );
};

export default function SkyTonightPage() {
  const [coords, setCoords] = useState({ lat: 28.6139, lng: 77.209, label: "New Delhi (default)" });
  const [requesting, setRequesting] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !navigator.geolocation) return;
    setRequesting(true);
    navigator.geolocation.getCurrentPosition(
      (p) => {
        setCoords({
          lat: p.coords.latitude,
          lng: p.coords.longitude,
          label: "Your location",
        });
        setRequesting(false);
      },
      () => setRequesting(false),
      { timeout: 6000 }
    );
  }, []);

  const today = useMemo(() => new Date(), []);
  const phase = moonPhase(today);
  const phaseName = moonPhaseName(phase);
  const illum = moonIllumination(phase);
  const sun = sunTimes(today, coords.lat, coords.lng);
  const planets = visiblePlanets(today);

  return (
    <>
      <Navbar />
      <main className="container mx-auto max-w-7xl c-space pt-28 pb-16 min-h-screen">
        <motion.header
          className="mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-aqua/20 to-lavender/20">
              <Telescope className="w-6 h-6 text-aqua" />
            </div>
            <span className="text-xs uppercase tracking-widest text-aqua">
              Tonight at a glance
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-2">Sky Tonight</h1>
          <p className="text-neutral-400 max-w-2xl flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {requesting ? "Locating…" : coords.label} · {today.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}
          </p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.section
            className="vu-card p-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-xs uppercase tracking-widest text-neutral-400 mb-4 flex items-center gap-2">
              <Moon className="w-3.5 h-3.5" /> Moon
            </h2>
            <MoonGraphic phase={phase} />
            <p className="mt-4 text-center text-lg font-semibold">{phaseName}</p>
            <p className="text-center text-sm text-neutral-400">
              {illum}% illuminated
            </p>
          </motion.section>

          <motion.section
            className="vu-card p-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <h2 className="text-xs uppercase tracking-widest text-neutral-400 mb-4 flex items-center gap-2">
              <Sun className="w-3.5 h-3.5" /> Sun
            </h2>
            <div className="flex items-center justify-around py-4">
              <div className="text-center">
                <Sunrise className="w-6 h-6 mx-auto mb-2 text-orange" />
                <p className="font-mono text-lg font-semibold">
                  {sun.sunrise || "—"}
                </p>
                <p className="text-xs text-neutral-500">Sunrise</p>
              </div>
              <div className="text-center">
                <Sunset className="w-6 h-6 mx-auto mb-2 text-coral" />
                <p className="font-mono text-lg font-semibold">{sun.sunset || "—"}</p>
                <p className="text-xs text-neutral-500">Sunset</p>
              </div>
            </div>
            <p className="text-xs text-neutral-500 text-center">
              Times in your local timezone
            </p>
          </motion.section>

          <motion.section
            className="vu-card p-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-xs uppercase tracking-widest text-neutral-400 mb-4 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" /> ISS Visibility
            </h2>
            <p className="text-sm text-neutral-300 mb-3">
              The ISS makes 16 orbits a day. Look northwest after sunset or southeast before
              sunrise.
            </p>
            <a
              href="/iss"
              className="inline-flex items-center gap-2 text-aqua hover:underline text-sm"
            >
              Open live tracker →
            </a>
          </motion.section>
        </div>

        <motion.section
          className="vu-card p-6 md:p-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-xl md:text-2xl font-bold mb-1">Planets to spot</h2>
          <p className="text-sm text-neutral-400 mb-6">
            Visible to the naked eye tonight from {coords.label.toLowerCase()}.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {planets.map((p, i) => (
              <motion.div
                key={p.name}
                className="vu-glass rounded-xl p-5"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
              >
                <div
                  className={`w-12 h-12 rounded-full mb-3 bg-gradient-to-br ${p.color} shadow-lg`}
                />
                <h3 className="font-semibold text-lg">{p.name}</h3>
                <p className="text-xs text-neutral-400 mb-2">{p.visibility}</p>
                <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10">
                  mag {p.magnitude}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>
      <Footer />
    </>
  );
}
