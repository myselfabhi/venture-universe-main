"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { RefreshCw, Home } from "lucide-react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-primary text-white px-6">
      <motion.div
        className="max-w-lg text-center vu-glass rounded-2xl p-10"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-6xl mb-4">🛰️</div>
        <h1 className="text-3xl font-bold mb-2">Signal lost</h1>
        <p className="text-neutral-400 mb-8">
          Something went off-course. Try reconnecting, or head back to base.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-royal to-lavender text-white font-medium hover:scale-105 transition-transform"
          >
            <RefreshCw className="w-4 h-4" />
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full vu-glass hover:bg-white/15 transition"
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
