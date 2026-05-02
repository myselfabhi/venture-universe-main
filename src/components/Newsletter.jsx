"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Send, Check } from "lucide-react";

const Newsletter = ({ compact = false }) => {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle"); // idle | sending | done | error
  const [msg, setMsg] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setState("sending");
    setMsg("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Subscription failed");
      setState("done");
      setMsg(data?.message || "You're on board. Welcome to Venture Universe!");
      setEmail("");
    } catch (err) {
      setState("error");
      setMsg(err.message || "Something went wrong. Try again.");
    }
  };

  return (
    <div className={`vu-glass rounded-2xl ${compact ? "p-5" : "p-8 md:p-10"}`}>
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 rounded-lg bg-gradient-to-br from-royal/30 to-lavender/30">
          <Mail className="w-5 h-5 text-aqua" />
        </div>
        <div>
          <h3 className={compact ? "text-lg font-semibold" : "text-xl md:text-2xl font-bold"}>
            Cosmic dispatch
          </h3>
          <p className="text-sm text-neutral-400">
            Weekly highlights — APOD, missions, launches. No spam, ever.
          </p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@galaxy.io"
          aria-label="Email address"
          className="flex-1 px-4 py-2.5 rounded-lg bg-white/5 border border-white/15 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-aqua/50 focus:border-aqua/50 transition"
          disabled={state === "sending" || state === "done"}
        />
        <button
          type="submit"
          disabled={state === "sending" || state === "done"}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-royal to-lavender text-white font-medium hover:shadow-lg hover:shadow-lavender/30 transition disabled:opacity-50"
        >
          {state === "done" ? (
            <>
              <Check className="w-4 h-4" /> Subscribed
            </>
          ) : state === "sending" ? (
            "…"
          ) : (
            <>
              <Send className="w-4 h-4" /> Subscribe
            </>
          )}
        </button>
      </form>

      <AnimatePresence>
        {msg && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mt-3 text-xs ${
              state === "error" ? "text-coral" : "text-mint"
            }`}
          >
            {msg}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Newsletter;
