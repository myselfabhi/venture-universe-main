"use client";

import { useState } from "react";
import { Timeline } from "../components/Timeline";
import { cosmicMilestones } from "../constants";
import { Particles } from "../components/Particles";
import { ExternalLink, Sparkles } from "lucide-react";
import Link from "next/link";

const CosmicJourney = () => {
  const [expandedMilestone, setExpandedMilestone] = useState(null);

  return (
    <section className="relative c-space section-spacing">
      {/* ISRO Logo Watermark - Subtle */}
      <div
        className="fixed inset-0 -z-50 opacity-5 bg-center bg-no-repeat bg-contain pointer-events-none"
        style={{
          backgroundImage: "url('/assets/ISRO.png')",
          backgroundPosition: "center",
          backgroundSize: "60%",
        }}
      />

      {/* Particle Effect */}
      <Particles
        className="absolute inset-0 -z-40"
        options={{
          particles: {
            number: { value: 100 },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            size: { value: 3, random: true },
            move: { enable: true, speed: 2, direction: "none", random: true },
            opacity: { value: 0.8, random: true },
          },
          interactivity: {
            events: { onHover: { enable: false }, onClick: { enable: false } },
          },
        }}
      />

      <div className="w-full pt-20">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-lavender" />
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              ISRO Odyssey
            </h2>
          </div>
          <p className="text-lg md:text-xl text-neutral-400 max-w-3xl leading-relaxed">
            From humble beginnings to lunar and interplanetary missions, witness ISRO's historic milestones 
            from Aryabhata to Chandrayaan-3 and beyond.
          </p>
        </div>

        {/* Timeline */}
        <Timeline 
          data={cosmicMilestones} 
          expandedMilestone={expandedMilestone}
          onExpand={setExpandedMilestone}
        />

        {/* CTA Section */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 items-center justify-between p-6 rounded-xl bg-gradient-to-br from-storm to-indigo border border-white/10">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Continue Your Journey</h3>
            <p className="text-neutral-400">Explore more space discoveries and news</p>
          </div>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 rounded-lg bg-gradient-to-r from-royal to-lavender hover:from-lavender hover:to-royal hover:scale-105 hover:shadow-lg hover:shadow-lavender/50"
          >
            Explore Space News
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CosmicJourney;
