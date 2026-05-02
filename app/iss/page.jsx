"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { Globe, Gauge, MapPin, Users, Activity, Radio } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../../src/sections/Footer";
import { StarfieldLoader } from "../../src/components/loaders";

const IssGlobe = dynamic(() => import("../../src/components/IssGlobe"), {
  ssr: false,
  loading: () => <StarfieldLoader label="Calibrating orbital telemetry…" />,
});

const Stat = ({ icon: Icon, label, value, accent = "lavender" }) => (
  <motion.div
    className="vu-glass rounded-xl p-4"
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
      <Icon className={`w-3.5 h-3.5 text-${accent}`} />
      {label}
    </div>
    <div className="text-lg md:text-xl font-mono font-semibold text-white tabular-nums">
      {value}
    </div>
  </motion.div>
);

export default function IssPage() {
  const [pos, setPos] = useState(null);
  const [crew, setCrew] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPos = async () => {
      try {
        const r = await fetch("https://api.wheretheiss.at/v1/satellites/25544");
        if (!r.ok) throw new Error("position fetch failed");
        const d = await r.json();
        setPos(d);
        setError(null);
      } catch (err) {
        setError("Telemetry feed temporarily unavailable.");
      }
    };
    fetchPos();
    const id = setInterval(fetchPos, 5000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    fetch("/api/iss-crew")
      .then((r) => r.json())
      .then((d) => setCrew(d.people || []))
      .catch(() => {});
  }, []);

  return (
    <>
      <Navbar />
      <main className="container mx-auto max-w-7xl c-space pt-28 pb-12 min-h-screen">
        <motion.header
          className="mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-aqua/20 to-lavender/20">
              <Globe className="w-6 h-6 text-aqua" />
            </div>
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-mint">
              <span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse" />
              Live telemetry
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-2">
            International Space Station
          </h1>
          <p className="text-neutral-400 max-w-2xl">
            Real-time position, velocity, and crew of humanity&apos;s outpost in low Earth orbit.
            Telemetry updates every 5 seconds.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 vu-card overflow-hidden p-4 md:p-6">
            <div className="flex items-center justify-center min-h-[320px]">
              {pos ? (
                <IssGlobe lat={pos.latitude} lng={pos.longitude} size={520} />
              ) : (
                <StarfieldLoader />
              )}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Stat
                icon={MapPin}
                label="Latitude"
                value={pos ? `${pos.latitude.toFixed(2)}°` : "—"}
                accent="aqua"
              />
              <Stat
                icon={MapPin}
                label="Longitude"
                value={pos ? `${pos.longitude.toFixed(2)}°` : "—"}
                accent="aqua"
              />
              <Stat
                icon={Activity}
                label="Altitude"
                value={pos ? `${pos.altitude.toFixed(1)} km` : "—"}
                accent="mint"
              />
              <Stat
                icon={Gauge}
                label="Velocity"
                value={pos ? `${(pos.velocity / 1000).toFixed(2)} km/s` : "—"}
                accent="fuchsia"
              />
            </div>

            <div className="vu-glass rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-4 h-4 text-lavender" />
                <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-300">
                  Crew on board
                </h2>
              </div>
              {crew.length > 0 ? (
                <ul className="space-y-2">
                  {crew.map((p) => (
                    <li
                      key={`${p.name}-${p.craft}`}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-white">{p.name}</span>
                      <span className="text-xs text-neutral-500">{p.craft}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-neutral-500">Crew manifest loading…</p>
              )}
            </div>

            <div className="vu-glass rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <Radio className="w-4 h-4 text-coral" />
                <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-300">
                  About the ISS
                </h2>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Orbiting at ~400 km, the ISS completes one orbit roughly every 92 minutes — about
                16 sunrises every Earth day. It&apos;s a continuously crewed outpost since November
                2000.
              </p>
            </div>
          </div>
        </div>

        {error && (
          <p className="mt-6 text-sm text-coral text-center">{error}</p>
        )}
      </main>
      <Footer />
    </>
  );
}
