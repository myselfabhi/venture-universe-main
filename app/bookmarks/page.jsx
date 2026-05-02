"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Bookmark, Trash2, ExternalLink } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../../src/sections/Footer";
import {
  getBookmarks,
  removeBookmark,
  subscribeBookmarks,
} from "../../src/lib/bookmarks";

export default function BookmarksPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getBookmarks());
    return subscribeBookmarks((next) => setItems(next));
  }, []);

  return (
    <>
      <Navbar />
      <main className="container mx-auto max-w-5xl c-space pt-28 pb-16 min-h-screen">
        <motion.header
          className="mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-aqua/20 to-lavender/20">
              <Bookmark className="w-6 h-6 text-aqua" />
            </div>
            <span className="text-xs uppercase tracking-widest text-aqua">Read later</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-2">Bookmarks</h1>
          <p className="text-neutral-400">
            Saved missions, articles, and launches. Stored locally in your browser.
          </p>
        </motion.header>

        {items.length === 0 ? (
          <div className="vu-card p-12 text-center">
            <Bookmark className="w-12 h-12 mx-auto mb-4 text-neutral-600" />
            <p className="text-lg font-semibold mb-2">No bookmarks yet</p>
            <p className="text-neutral-400 text-sm mb-6">
              Tap the bookmark icon on any mission, article, or launch to save it.
            </p>
            <Link
              href="/missions"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-royal to-lavender text-white font-medium hover:shadow-lg hover:shadow-lavender/30 transition"
            >
              Browse missions
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence>
              {items.map((b) => (
                <motion.div
                  key={b.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="vu-card p-5 flex gap-4 items-start"
                >
                  {b.image && (
                    <img
                      src={b.image}
                      alt=""
                      className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] uppercase tracking-widest text-lavender mb-1">
                      {b.type || "saved"}
                    </p>
                    <h3 className="font-semibold mb-2 line-clamp-2">{b.title}</h3>
                    <div className="flex items-center gap-2 text-xs">
                      <Link
                        href={b.href}
                        className="inline-flex items-center gap-1 text-aqua hover:underline"
                        target={b.href?.startsWith("http") ? "_blank" : undefined}
                        rel="noopener"
                      >
                        Open <ExternalLink className="w-3 h-3" />
                      </Link>
                      <button
                        onClick={() => removeBookmark(b.id)}
                        className="inline-flex items-center gap-1 text-neutral-500 hover:text-coral transition"
                      >
                        <Trash2 className="w-3 h-3" /> Remove
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
