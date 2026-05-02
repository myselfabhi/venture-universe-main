"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const ShareButton = ({ title, text, url, className = "" }) => {
  const [copied, setCopied] = useState(false);

  const onShare = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const data = { title, text, url };
    try {
      if (navigator.share) {
        await navigator.share(data);
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (err) {
      if (err?.name === "AbortError") return;
      console.error(err);
    }
  };

  return (
    <motion.button
      onClick={onShare}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      aria-label="Share"
      className={`relative p-2 rounded-full vu-glass hover:bg-white/15 transition ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="ok"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            className="block"
          >
            <Check className="w-4 h-4 text-mint" />
          </motion.span>
        ) : (
          <motion.span
            key="share"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            className="block"
          >
            <Share2 className="w-4 h-4 text-white/80" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default ShareButton;
