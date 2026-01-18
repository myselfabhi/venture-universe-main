"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Rocket, Newspaper, BookOpen, Satellite } from "lucide-react";

const QuickAccess = () => {
  const sections = [
    {
      id: 1,
      title: "Space News",
      description: "Latest discoveries, launches, and cosmic events",
      href: "/news",
      icon: Newspaper,
      gradient: "from-indigo to-storm",
      hoverGradient: "group-hover:from-lavender group-hover:to-royal",
    },
    {
      id: 2,
      title: "ISRO Odyssey",
      description: "India's journey from Aryabhata to Chandrayaan-3",
      href: "/isro",
      icon: Satellite,
      gradient: "from-royal to-lavender",
      hoverGradient: "group-hover:from-indigo group-hover:to-storm",
    },
    {
      id: 3,
      title: "Missions",
      description: "Explore current and future space missions",
      href: "/missions",
      icon: Rocket,
      gradient: "from-storm to-royal",
      hoverGradient: "group-hover:from-lavender group-hover:to-indigo",
    },
    {
      id: 4,
      title: "Articles",
      description: "Insights from great space scientists and thinkers",
      href: "/articles",
      icon: BookOpen,
      gradient: "from-lavender to-indigo",
      hoverGradient: "group-hover:from-royal group-hover:to-storm",
    },
  ];

  return (
    <section className="c-space py-12 md:py-16">
      <div className="mb-8">
        <h2 className="text-heading">Explore the Cosmos</h2>
        <p className="mt-2 text-neutral-400">Dive into space news, missions, and discoveries</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {sections.map((section, index) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={section.href}
                className={`group relative flex flex-col h-full p-6 rounded-xl bg-gradient-to-br ${section.gradient} ${section.hoverGradient} transition-all duration-300 hover-animation hover:shadow-2xl`}
              >
                <div className="mb-4">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-white">
                  {section.title}
                </h3>
                <p className="text-sm text-white/80 flex-grow">
                  {section.description}
                </p>
                <div className="mt-4 flex items-center text-sm text-white/90 group-hover:text-white">
                  Explore
                  <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default QuickAccess;
