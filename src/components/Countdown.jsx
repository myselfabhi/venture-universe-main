"use client";

import { useEffect, useState } from "react";

const pad = (n) => String(n).padStart(2, "0");

const Countdown = ({ target, className = "", compact = false }) => {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const ms = new Date(target).getTime() - now;
  if (Number.isNaN(ms)) return null;

  if (ms <= 0) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-mint to-aqua ${className}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        Live now
      </span>
    );
  }

  const total = Math.floor(ms / 1000);
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;

  if (compact) {
    return (
      <span
        className={`inline-flex items-center gap-1 font-mono text-xs text-white ${className}`}
      >
        T-{days}d {pad(hours)}:{pad(minutes)}:{pad(seconds)}
      </span>
    );
  }

  const Cell = ({ value, label }) => (
    <div className="flex flex-col items-center min-w-[44px]">
      <span className="text-base md:text-lg font-mono font-bold text-white tabular-nums">
        {pad(value)}
      </span>
      <span className="text-[9px] uppercase tracking-wider text-neutral-400">{label}</span>
    </div>
  );

  return (
    <div
      className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg vu-glass ${className}`}
      role="timer"
      aria-label={`Countdown: ${days} days ${hours} hours ${minutes} minutes`}
    >
      <Cell value={days} label="days" />
      <span className="text-neutral-500">:</span>
      <Cell value={hours} label="hrs" />
      <span className="text-neutral-500">:</span>
      <Cell value={minutes} label="min" />
      <span className="text-neutral-500">:</span>
      <Cell value={seconds} label="sec" />
    </div>
  );
};

export default Countdown;
