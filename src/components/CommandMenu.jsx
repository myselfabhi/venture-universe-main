"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Home,
  Newspaper,
  Rocket,
  Compass,
  Telescope,
  Globe,
  Bookmark,
  Mail,
  Sparkles,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";

const STATIC_ITEMS = [
  { id: "home", title: "Home", path: "/", icon: Home, group: "Pages" },
  { id: "news", title: "Latest News", path: "/news", icon: Newspaper, group: "Pages" },
  { id: "articles", title: "Articles", path: "/articles", icon: Sparkles, group: "Pages" },
  { id: "launches", title: "Launch Schedule", path: "/launches", icon: Rocket, group: "Pages" },
  { id: "iss", title: "Live ISS Tracker", path: "/iss", icon: Globe, group: "Tools" },
  { id: "sky", title: "Sky Tonight", path: "/sky-tonight", icon: Telescope, group: "Tools" },
  { id: "missions", title: "Mission Explorer", path: "/missions", icon: Compass, group: "Tools" },
  { id: "isro", title: "ISRO Odyssey", path: "/isro", icon: Sparkles, group: "Pages" },
  { id: "bookmarks", title: "Bookmarks", path: "/bookmarks", icon: Bookmark, group: "Pages" },
  { id: "contact", title: "Contact", path: "/contact", icon: Mail, group: "Pages" },
];

const score = (text, q) => {
  if (!q) return 1;
  const t = text.toLowerCase();
  const query = q.toLowerCase();
  if (t === query) return 1;
  if (t.startsWith(query)) return 0.9;
  if (t.includes(query)) return 0.7;
  let qi = 0;
  for (let i = 0; i < t.length && qi < query.length; i++) {
    if (t[i] === query[qi]) qi++;
  }
  return qi === query.length ? 0.5 : 0;
};

const CommandMenu = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const router = useRouter();
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 30);
      setQuery("");
      setActive(0);
    }
  }, [open]);

  const items = useMemo(() => {
    const themeItem = {
      id: "theme",
      title: theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
      icon: theme === "dark" ? Sun : Moon,
      group: "Actions",
      action: () => toggle(),
    };
    const all = [...STATIC_ITEMS, themeItem];
    if (!query.trim()) return all;
    return all
      .map((it) => ({ ...it, _s: score(it.title, query) }))
      .filter((it) => it._s > 0)
      .sort((a, b) => b._s - a._s);
  }, [query, theme, toggle]);

  const grouped = useMemo(() => {
    const out = {};
    items.forEach((it) => {
      out[it.group] = out[it.group] || [];
      out[it.group].push(it);
    });
    return out;
  }, [items]);

  const flat = items;

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, flat.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const it = flat[active];
      if (!it) return;
      if (it.action) {
        it.action();
        setOpen(false);
      } else if (it.path) {
        router.push(it.path);
        setOpen(false);
      }
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open command menu"
        className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg vu-glass text-xs text-neutral-300 hover:text-white hover:bg-white/15 transition"
      >
        <Search className="w-3.5 h-3.5" />
        <span>Search</span>
        <kbd className="ml-2 px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-mono">⌘K</kbd>
      </button>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open search"
        className="md:hidden p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-white/10 transition"
      >
        <Search className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-start justify-center pt-[12vh] px-4 bg-primary/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-label="Command menu"
              className="w-full max-w-xl vu-glass-strong rounded-2xl overflow-hidden shadow-2xl shadow-lavender/20"
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
                <Search className="w-4 h-4 text-neutral-400" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActive(0);
                  }}
                  onKeyDown={onKeyDown}
                  placeholder="Search pages, tools, missions…"
                  className="flex-1 bg-transparent text-white placeholder-neutral-500 focus:outline-none text-sm"
                />
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-mono text-neutral-400">
                  ESC
                </kbd>
              </div>

              <div className="max-h-[55vh] overflow-y-auto p-2">
                {flat.length === 0 ? (
                  <div className="p-8 text-center text-sm text-neutral-500">
                    No results — try a different query.
                  </div>
                ) : (
                  Object.entries(grouped).map(([group, list]) => (
                    <div key={group} className="mb-2 last:mb-0">
                      <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-neutral-500">
                        {group}
                      </div>
                      {list.map((it) => {
                        const idx = flat.indexOf(it);
                        const Icon = it.icon;
                        const isActive = idx === active;
                        const inner = (
                          <div
                            onMouseEnter={() => setActive(idx)}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                              isActive
                                ? "bg-gradient-to-r from-royal/30 to-lavender/30 text-white"
                                : "text-neutral-300 hover:bg-white/5"
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            <span className="text-sm">{it.title}</span>
                          </div>
                        );
                        if (it.action) {
                          return (
                            <button
                              key={it.id}
                              onClick={() => {
                                it.action();
                                setOpen(false);
                              }}
                              className="block w-full text-left"
                            >
                              {inner}
                            </button>
                          );
                        }
                        return (
                          <Link
                            key={it.id}
                            href={it.path}
                            onClick={() => setOpen(false)}
                            className="block"
                          >
                            {inner}
                          </Link>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              <div className="flex items-center justify-between px-4 py-2 border-t border-white/10 text-[10px] text-neutral-500">
                <span>↑↓ Navigate</span>
                <span>↵ Open</span>
                <span>⌘K Toggle</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CommandMenu;
