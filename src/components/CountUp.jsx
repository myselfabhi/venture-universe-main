"use client";

import { useEffect, useRef, useState } from "react";

const CountUp = ({ to, duration = 1800, decimals = 0, suffix = "", className = "" }) => {
  const [v, setV] = useState(0);
  const ref = useRef(null);
  const seen = useRef(false);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      setV(to);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !seen.current) {
            seen.current = true;
            const start = performance.now();
            const tick = (t) => {
              const p = Math.min(1, (t - start) / duration);
              const eased = 1 - Math.pow(1 - p, 3);
              setV(eased * to);
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {decimals > 0 ? v.toFixed(decimals) : Math.floor(v).toLocaleString()}
      {suffix}
    </span>
  );
};

export default CountUp;
