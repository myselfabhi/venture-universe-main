"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import { Clock } from "lucide-react";
import { getTodaysEvent } from "../data/onThisDay";
import { fadeUp, viewportOnce } from "../lib/motion";

const OnThisDay = () => {
  const today = useMemo(() => new Date(), []);
  const item = useMemo(() => getTodaysEvent(today), [today]);

  return (
    <motion.section
      className="c-space py-10"
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      <div className="vu-card p-6 md:p-8 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br from-fuchsia/20 to-lavender/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-shrink-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full vu-glass text-xs uppercase tracking-widest text-aqua">
              <Clock className="w-3 h-3" />
              On this day
            </div>
            <p className="mt-3 text-5xl md:text-6xl font-extrabold leading-none bg-gradient-to-br from-aqua to-lavender bg-clip-text text-transparent">
              {item.year}
            </p>
            <p className="text-xs text-neutral-500 mt-1">
              {today.toLocaleDateString(undefined, { month: "long", day: "numeric" })}
            </p>
          </div>
          <div className="flex-1">
            <p className="text-base md:text-lg text-neutral-200 leading-relaxed">
              {item.event}
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default OnThisDay;
