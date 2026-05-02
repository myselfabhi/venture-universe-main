"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Rocket,
  Calendar,
  MapPin,
  Building2,
  Search,
  Filter,
  X,
  Radio,
  Sparkles,
} from "lucide-react";
import Countdown from "../components/Countdown";
import BookmarkButton from "../components/BookmarkButton";
import ShareButton from "../components/ShareButton";
import { RocketLoader, SkeletonGrid } from "../components/loaders";
import { useDebounce } from "../hooks/useDebounce";
import { fadeUp, viewportOnce } from "../lib/motion";

const LaunchSchedule = () => {
  const [launches, setLaunches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [agency, setAgency] = useState("all");
  const [failedImages, setFailedImages] = useState(new Set());
  const debouncedQuery = useDebounce(query, 250);

  useEffect(() => {
    const fetchLaunches = async () => {
      try {
        const r = await fetch("/api/launches?limit=50&ordering=net");
        if (!r.ok) throw new Error(`status ${r.status}`);
        const data = await r.json();
        const mapped = (data.results || [])
          .filter((l) => l.net)
          .filter((l) => {
            const m = l.mission?.name || "";
            const n = l.name || "";
            return (
              !m.toLowerCase().includes("unknown payload") &&
              !m.toLowerCase().includes("tbd") &&
              !n.toLowerCase().includes("unknown payload")
            );
          })
          .map((l) => ({
            id: l.id,
            name: l.name,
            mission: l.mission?.name || null,
            description: l.mission?.description || null,
            net: l.net,
            location: l.pad?.location?.name || "Launch Site",
            pad: l.pad?.name || null,
            agency: l.launch_service_provider?.name || "Unknown",
            image:
              l.image ||
              l.rocket?.configuration?.image_url ||
              l.launch_service_provider?.logo_url ||
              null,
            webcastLive: l.webcast_live || false,
            status: l.status?.name || "Scheduled",
          }));
        setLaunches(mapped);
      } catch (err) {
        setError("Could not load the launch manifest. Try again in a moment.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchLaunches();
  }, []);

  const agencies = useMemo(() => {
    const counts = {};
    launches.forEach((l) => {
      counts[l.agency] = (counts[l.agency] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name]) => name);
  }, [launches]);

  const filtered = useMemo(() => {
    let list = launches;
    if (agency !== "all") list = list.filter((l) => l.agency === agency);
    if (debouncedQuery.trim()) {
      const q = debouncedQuery.toLowerCase();
      list = list.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.mission?.toLowerCase().includes(q) ||
          l.location.toLowerCase().includes(q) ||
          l.agency.toLowerCase().includes(q)
      );
    }
    return list;
  }, [launches, debouncedQuery, agency]);

  const stats = useMemo(() => {
    const now = Date.now();
    const week = launches.filter(
      (l) => new Date(l.net).getTime() - now < 7 * 86400000 && new Date(l.net).getTime() > now
    ).length;
    return {
      total: launches.length,
      thisWeek: week,
      live: launches.filter((l) => l.webcastLive).length,
    };
  }, [launches]);

  const formatDate = (s) =>
    new Date(s).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

  return (
    <section className="c-space pt-28 pb-16">
      <motion.header
        className="mb-8"
        variants={fadeUp}
        initial="hidden"
        animate="show"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-coral/20 to-fuchsia/20">
            <Rocket className="w-6 h-6 text-coral" />
          </div>
          <span className="text-xs uppercase tracking-widest text-coral">Mission control</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold mb-2">Launch Schedule</h1>
        <p className="text-neutral-400 max-w-2xl">
          Every confirmed launch from every agency, with live countdowns and one-tap reminders.
        </p>
      </motion.header>

      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { label: "Total upcoming", value: stats.total, color: "aqua" },
          { label: "Within 7 days", value: stats.thisWeek, color: "coral" },
          { label: "Live webcasts", value: stats.live, color: "mint" },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
            className="vu-glass rounded-xl p-4 md:p-5"
          >
            <p className="text-[10px] md:text-xs uppercase tracking-widest text-neutral-400 mb-1">
              {s.label}
            </p>
            <p
              className={`text-2xl md:text-4xl font-bold tabular-nums text-${s.color}`}
            >
              {s.value}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search rockets, missions, sites…"
            className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-white/5 border border-white/15 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-aqua/50 focus:border-aqua/50 transition"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-6">
        <button
          onClick={() => setAgency("all")}
          className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition ${
            agency === "all"
              ? "bg-gradient-to-r from-royal to-lavender text-white"
              : "vu-glass text-neutral-300 hover:text-white"
          }`}
        >
          All
        </button>
        {agencies.map((a) => (
          <button
            key={a}
            onClick={() => setAgency(a)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition ${
              agency === a
                ? "bg-gradient-to-r from-royal to-lavender text-white"
                : "vu-glass text-neutral-300 hover:text-white"
            }`}
          >
            {a}
          </button>
        ))}
      </div>

      {isLoading && <RocketLoader label="Locking onto launch windows…" />}

      {error && !isLoading && (
        <div className="vu-glass rounded-xl p-5 text-coral text-sm">{error}</div>
      )}

      {!isLoading && filtered.length === 0 && (
        <div className="text-center py-16 text-neutral-500">
          <Rocket className="w-12 h-12 mx-auto mb-3 opacity-40" />
          No launches match. Try a different filter.
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((l, i) => (
            <motion.article
              key={l.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: Math.min(i * 0.04, 0.6) }}
              className="vu-card overflow-hidden flex flex-col group"
            >
              <div className="relative h-40 overflow-hidden bg-gradient-to-br from-storm to-indigo">
                {l.image && !failedImages.has(l.id) ? (
                  <img
                    src={l.image}
                    alt={l.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={() =>
                      setFailedImages((prev) => new Set(prev).add(l.id))
                    }
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full">
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 2.4, repeat: Infinity }}
                    >
                      <Rocket className="w-14 h-14 text-white/40" />
                    </motion.div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent" />

                <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
                  {l.webcastLive && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-coral/90 text-white">
                      <Radio className="w-3 h-3" />
                      LIVE
                    </span>
                  )}
                  <div className="ml-auto flex gap-1.5">
                    <BookmarkButton
                      item={{
                        id: `launch-${l.id}`,
                        type: "launch",
                        title: l.name.split("|")[0].trim(),
                        href: "/launches",
                        image: l.image,
                      }}
                    />
                    <ShareButton
                      title={l.name}
                      text={`Watch ${l.name} launch on ${formatDate(l.net)}`}
                      url={typeof window !== "undefined" ? window.location.href : ""}
                    />
                  </div>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-semibold text-white line-clamp-2 mb-1.5">
                  {l.name.split("|")[0].trim()}
                </h3>
                {l.mission && l.mission !== l.name && (
                  <p className="text-xs text-lavender line-clamp-1 mb-3">{l.mission}</p>
                )}

                <div className="space-y-1.5 mb-4 text-xs text-neutral-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(l.net)}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="line-clamp-1">{l.location}</span>
                  </div>
                  {l.agency && l.agency !== "Unknown" && (
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5" />
                      <span className="line-clamp-1">{l.agency}</span>
                    </div>
                  )}
                </div>

                <div className="mt-auto">
                  <Countdown target={l.net} />
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default LaunchSchedule;
