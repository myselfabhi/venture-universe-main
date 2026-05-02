"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Compass, Search, ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../../src/sections/Footer";
import MissionArt from "../../src/components/MissionArt";
import { missions } from "../../src/data/missions";

const STATUSES = ["All", "Active", "Upcoming", "En route", "Test flights", "Mission complete"];

export default function MissionsPage() {
  const [status, setStatus] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let list = missions;
    if (status !== "All") list = list.filter((m) => m.status === status);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.agency.toLowerCase().includes(q) ||
          m.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return list;
  }, [status, query]);

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
              <Compass className="w-6 h-6 text-aqua" />
            </div>
            <span className="text-xs uppercase tracking-widest text-aqua">Mission control</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-2">Mission Explorer</h1>
          <p className="text-neutral-400 max-w-2xl">
            Curated dossiers on the most important active and upcoming missions across the solar
            system.
          </p>
        </motion.header>

        <div className="flex flex-col md:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search missions, agencies, tags…"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/5 border border-white/15 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-aqua/50 focus:border-aqua/50 transition"
              aria-label="Search missions"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`flex-shrink-0 px-3 py-2 rounded-full text-xs font-medium transition ${
                  status === s
                    ? "bg-gradient-to-r from-royal to-lavender text-white shadow-lg shadow-lavender/30"
                    : "vu-glass text-neutral-300 hover:text-white"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-neutral-500">
            <p>No missions match your filters.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((m, i) => (
            <motion.div
              key={m.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
            >
              <Link
                href={`/missions/${m.slug}`}
                className="group block vu-card overflow-hidden h-full"
              >
                <div className="relative h-44 overflow-hidden">
                  <MissionArt tags={m.tags} slug={m.slug} />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent pointer-events-none" />
                  <span
                    className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold ${
                      m.status === "Active"
                        ? "bg-mint/20 text-mint border border-mint/30"
                        : m.status === "Upcoming"
                        ? "bg-aqua/20 text-aqua border border-aqua/30"
                        : "bg-white/10 text-white border border-white/20"
                    }`}
                  >
                    {m.status}
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-xs uppercase tracking-wider text-lavender mb-1">
                    {m.agency}
                  </p>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-aqua transition-colors">
                    {m.name}
                  </h3>
                  <p className="text-sm text-neutral-400 line-clamp-2 mb-3">{m.summary}</p>
                  <div className="flex items-center justify-between text-xs text-neutral-500">
                    <span>{m.type}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
