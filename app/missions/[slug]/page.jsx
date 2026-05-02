"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "motion/react";
import { ArrowLeft, Calendar, Tag, ExternalLink } from "lucide-react";
import { use } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../../src/sections/Footer";
import ShareButton from "../../../src/components/ShareButton";
import BookmarkButton from "../../../src/components/BookmarkButton";
import MissionArt from "../../../src/components/MissionArt";
import { findMission } from "../../../src/data/missions";

export default function MissionDetail({ params }) {
  const { slug } = use(params);
  const m = findMission(slug);
  if (!m) notFound();

  const launchDate = new Date(m.launchDate).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Navbar />
      <main className="container mx-auto max-w-5xl c-space pt-28 pb-16 min-h-screen">
        <Link
          href="/missions"
          className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" /> All missions
        </Link>

        <motion.article
          className="vu-card overflow-hidden"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="relative h-64 md:h-96 overflow-hidden">
            <MissionArt tags={m.tags} slug={m.slug} />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <p className="text-xs uppercase tracking-widest text-lavender mb-2">
                {m.agency}
              </p>
              <h1 className="text-3xl md:text-5xl font-bold mb-2">{m.name}</h1>
              <p className="text-neutral-300">{m.type}</p>
            </div>
            <div className="absolute top-4 right-4 flex gap-2">
              <BookmarkButton item={{ id: m.slug, type: "mission", title: m.name, href: `/missions/${m.slug}`, image: m.image }} />
              <ShareButton title={m.name} text={m.summary} url={typeof window !== "undefined" ? window.location.href : ""} />
            </div>
          </div>

          <div className="p-6 md:p-10 grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold mb-3">Overview</h2>
              <p className="text-neutral-300 leading-relaxed mb-6">{m.summary}</p>

              <h3 className="text-sm uppercase tracking-widest text-neutral-400 mb-3">
                Mission tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {m.tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs vu-glass"
                  >
                    <Tag className="w-3 h-3 text-aqua" />
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <aside className="space-y-3">
              <div className="vu-glass rounded-xl p-4">
                <p className="text-[10px] uppercase tracking-widest text-neutral-400 mb-1">
                  Status
                </p>
                <p className="font-semibold">{m.status}</p>
              </div>
              <div className="vu-glass rounded-xl p-4">
                <p className="text-[10px] uppercase tracking-widest text-neutral-400 mb-1">
                  Launch
                </p>
                <p className="font-semibold flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-aqua" />
                  {launchDate}
                </p>
              </div>
              {m.facts.map((f) => (
                <div key={f.label} className="vu-glass rounded-xl p-4">
                  <p className="text-[10px] uppercase tracking-widest text-neutral-400 mb-1">
                    {f.label}
                  </p>
                  <p className="font-semibold">{f.value}</p>
                </div>
              ))}
            </aside>
          </div>
        </motion.article>
      </main>
      <Footer />
    </>
  );
}
