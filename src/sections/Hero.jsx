"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { easing } from "maath";
import { motion, useScroll, useTransform } from "motion/react";
import {
  ArrowDown,
  Globe,
  Rocket,
  Telescope,
  Activity,
  Radio,
  Sparkles,
} from "lucide-react";
import Loader from "../components/Loader";
import { Astronaut } from "../components/Astronaut";

const ROTATING_WORDS = [
  { word: "the cosmos", color: "from-aqua to-lavender" },
  { word: "the ISS", color: "from-mint to-aqua" },
  { word: "tonight's sky", color: "from-fuchsia to-coral" },
  { word: "every mission", color: "from-orange to-coral" },
  { word: "the unknown", color: "from-lavender to-fuchsia" },
];

const HudCorner = ({ position }) => {
  const map = {
    tl: "top-3 left-3 border-t border-l rounded-tl-lg",
    tr: "top-3 right-3 border-t border-r rounded-tr-lg",
    bl: "bottom-3 left-3 border-b border-l rounded-bl-lg",
    br: "bottom-3 right-3 border-b border-r rounded-br-lg",
  };
  return (
    <div
      className={`pointer-events-none absolute w-10 h-10 border-aqua/50 ${map[position]}`}
      aria-hidden="true"
    />
  );
};

const TelemetryBar = () => {
  const [iss, setIss] = useState(null);

  useEffect(() => {
    const fetchPos = async () => {
      try {
        const r = await fetch("https://api.wheretheiss.at/v1/satellites/25544");
        if (!r.ok) return;
        const d = await r.json();
        setIss(d);
      } catch {}
    };
    fetchPos();
    const id = setInterval(fetchPos, 5000);
    return () => clearInterval(id);
  }, []);

  const cells = [
    {
      label: "ISS Lat",
      value: iss ? `${iss.latitude.toFixed(2)}°` : "—",
      icon: Globe,
      color: "text-aqua",
    },
    {
      label: "ISS Lng",
      value: iss ? `${iss.longitude.toFixed(2)}°` : "—",
      icon: Globe,
      color: "text-aqua",
    },
    {
      label: "Altitude",
      value: iss ? `${iss.altitude.toFixed(0)} km` : "—",
      icon: Activity,
      color: "text-mint",
    },
    {
      label: "Velocity",
      value: iss ? `${(iss.velocity / 1000).toFixed(2)} km/s` : "—",
      icon: Radio,
      color: "text-fuchsia",
    },
  ];

  return (
    <div className="vu-glass rounded-xl px-4 py-3 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl">
      {cells.map((c) => (
        <div key={c.label} className="flex items-center gap-2">
          <c.icon className={`w-3.5 h-3.5 ${c.color}`} />
          <div>
            <p className="text-[9px] uppercase tracking-widest text-neutral-500">
              {c.label}
            </p>
            <p className="text-xs md:text-sm font-mono font-semibold tabular-nums">
              {c.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

const RotatingWord = () => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % ROTATING_WORDS.length),
      2400
    );
    return () => clearInterval(id);
  }, []);
  const current = ROTATING_WORDS[index];

  return (
    <span className="relative inline-block min-h-[1.1em] align-baseline">
      <motion.span
        key={index}
        className={`inline-block bg-gradient-to-r ${current.color} bg-clip-text text-transparent`}
        initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {current.word}
      </motion.span>
    </span>
  );
};

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const yText = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacityText = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
    >
      {/* Animated nebula backdrop */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <motion.div
          className="absolute top-[10%] left-[10%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-br from-royal/30 via-lavender/20 to-transparent blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.75, 0.5] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[5%] right-[10%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-br from-aqua/25 via-mint/10 to-transparent blur-3xl"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.65, 0.4] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[40%] right-[30%] w-[30vw] h-[30vw] rounded-full bg-gradient-to-br from-fuchsia/20 to-transparent blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(circle at center, black 30%, transparent 80%)",
          }}
        />

        {/* Twinkling stars */}
        {Array.from({ length: 60 }).map((_, i) => {
          const left = (i * 37) % 100;
          const top = (i * 23) % 100;
          const size = 1 + (i % 3) * 0.6;
          return (
            <motion.span
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: size,
                height: size,
              }}
              animate={{ opacity: [0.15, 0.9, 0.15] }}
              transition={{
                duration: 2.4 + (i % 5) * 0.4,
                repeat: Infinity,
                delay: (i % 7) * 0.3,
              }}
            />
          );
        })}
      </div>

      {/* 3D astronaut canvas — shifted right on desktop */}
      <figure
        className="absolute inset-0 md:inset-y-0 md:right-0 md:left-1/3 pointer-events-none"
        style={{ width: isMobile ? "100vw" : undefined, height: "100vh" }}
        aria-hidden="true"
      >
        <Canvas camera={{ position: [0, 1, 3] }}>
          <Suspense fallback={<Loader />}>
            <Float>
              <Astronaut
                scale={isMobile ? 0.22 : undefined}
                position={isMobile ? [0, -1.2, 0] : undefined}
              />
            </Float>
            <Rig />
          </Suspense>
        </Canvas>
      </figure>

      {/* HUD foreground */}
      <motion.div
        className="relative z-10 c-space pt-32 md:pt-36 pb-24"
        style={{ y: yText, opacity: opacityText }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full vu-glass mb-6"
        >
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-mint"
            animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
          <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-mint font-semibold">
            Live telemetry · {new Date().getUTCFullYear()}
          </span>
        </motion.div>

        <div className="max-w-3xl">
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.02] tracking-tight"
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="block text-white">Witness</span>
            <span className="block">
              <RotatingWord />
            </span>
            <span className="block text-white/90 text-3xl md:text-5xl lg:text-6xl mt-2 md:mt-4 font-semibold">
              in real time.
            </span>
          </motion.h1>

          <motion.p
            className="mt-6 max-w-xl text-base md:text-lg text-neutral-300 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Live ISS tracking, tonight&apos;s sky, every active mission, and the latest from
            beyond Earth — built for the curious, from age 9 to 99.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
          >
            <Link
              href="/iss"
              className="group relative inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-royal to-lavender text-white font-semibold overflow-hidden hover:shadow-lg hover:shadow-lavender/40 transition"
            >
              <Globe className="w-4 h-4" />
              Track the ISS
              <span className="absolute inset-0 bg-gradient-to-r from-aqua/0 via-aqua/25 to-aqua/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </Link>
            <Link
              href="/sky-tonight"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full vu-glass hover:bg-white/15 transition"
            >
              <Telescope className="w-4 h-4" />
              Sky tonight
            </Link>
            <Link
              href="/missions"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full vu-glass hover:bg-white/15 transition"
            >
              <Rocket className="w-4 h-4" />
              Active missions
            </Link>
          </motion.div>
        </div>

        {/* Telemetry strip */}
        <motion.div
          className="mt-12 md:mt-16 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
        >
          <HudCorner position="tl" />
          <HudCorner position="tr" />
          <HudCorner position="bl" />
          <HudCorner position="br" />
          <div className="px-4 py-1">
            <TelemetryBar />
          </div>
        </motion.div>

        {/* Floating data badges — anchored to text column, below CTAs */}
        <motion.div
          className="hidden md:grid grid-cols-2 gap-3 mt-10 max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          <Link
            href="/news"
            className="group vu-glass rounded-xl px-4 py-3 hover:bg-white/15 transition relative overflow-hidden"
          >
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-3 h-3 text-aqua" />
              <p className="text-[9px] uppercase tracking-widest text-neutral-400">
                Today's APOD
              </p>
            </div>
            <p className="text-xs text-white leading-snug">
              NASA's daily cosmic wonder, fresh.
            </p>
            <span className="mt-1.5 inline-flex items-center gap-1 text-[10px] text-aqua">
              View
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </span>
          </Link>

          <Link
            href="/launches"
            className="group vu-glass rounded-xl px-4 py-3 hover:bg-white/15 transition relative overflow-hidden"
          >
            <div className="flex items-center gap-2 mb-1">
              <Rocket className="w-3 h-3 text-coral" />
              <p className="text-[9px] uppercase tracking-widest text-neutral-400">
                Next launch
              </p>
            </div>
            <p className="text-xs text-white leading-snug">
              Live countdowns on every rocket.
            </p>
            <span className="mt-1.5 inline-flex items-center gap-1 text-[10px] text-coral">
              See manifest
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.button
        type="button"
        onClick={() =>
          window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
        }
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-neutral-400 hover:text-white transition cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.4 }}
        aria-label="Scroll down"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Descend</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.button>
    </section>
  );
};

function Rig() {
  return useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [state.mouse.x / 10, 1 + state.mouse.y / 10, 3],
      0.5,
      delta
    );
  });
}

export default Hero;
