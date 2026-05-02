"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Home, Compass } from "lucide-react";

export default function NotFound() {
  const stars = Array.from({ length: 60 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 3,
    size: 1 + Math.random() * 2,
  }));

  return (
    <main className="relative min-h-screen overflow-hidden flex items-center justify-center bg-primary text-white">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {stars.map((s) => (
          <motion.span
            key={s.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
            }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, delay: s.delay }}
          />
        ))}
      </div>

      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-br from-royal/20 via-lavender/10 to-transparent blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 8, repeat: Infinity }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-2xl mx-auto text-center px-6">
        <motion.h1
          className="text-[120px] md:text-[200px] font-extrabold leading-none bg-gradient-to-br from-aqua via-lavender to-fuchsia bg-clip-text text-transparent"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          404
        </motion.h1>
        <motion.h2
          className="text-2xl md:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Lost in the void
        </motion.h2>
        <motion.p
          className="text-neutral-400 mb-10 text-base md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
        >
          This page drifted past the event horizon. Let&apos;s navigate you home.
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-royal to-lavender text-white font-medium shadow-lg shadow-lavender/30 hover:shadow-lavender/60 transition-all hover:scale-105"
          >
            <Home className="w-4 h-4" />
            Return home
          </Link>
          <Link
            href="/sky-tonight"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full vu-glass text-white hover:bg-white/15 transition-all"
          >
            <Compass className="w-4 h-4" />
            Explore the sky
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
