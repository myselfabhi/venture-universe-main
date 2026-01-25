"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Rocket, Newspaper, BookOpen, Satellite, ArrowRight, Sparkles } from "lucide-react";

const QuickAccess = () => {
  // Generate particle positions once
  const particlePositions = useMemo(() => {
    return Array.from({ length: 8 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
    }));
  }, []);

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
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-6 h-6 text-lavender" />
          <h2 className="text-heading">Explore the Cosmos</h2>
        </div>
        <p className="text-neutral-400">Dive into space news, missions, and discoveries</p>
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
                className={`group relative flex flex-col h-full p-6 md:p-8 rounded-xl bg-gradient-to-br ${section.gradient} border border-white/10 hover:border-white/30 transition-all duration-300 hover:shadow-2xl hover:shadow-lavender/20 hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-lavender focus:ring-offset-2 focus:ring-offset-primary`}
              >
                {/* Animated Background Glow */}
                <motion.div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-br ${section.hoverGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  initial={false}
                />

                {/* Decorative Particles */}
                <div className="absolute inset-0 overflow-hidden rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  {particlePositions.map((pos, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full"
                      style={{
                        left: `${pos.left}%`,
                        top: `${pos.top}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>

                <div className="relative z-10">
                  {/* Icon with Animation */}
                  <div className="mb-6">
                    <motion.div
                      className="relative inline-block"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="absolute inset-0 bg-white/20 rounded-lg blur-xl group-hover:bg-white/30 transition-colors" />
                      <div className="relative p-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                        <Icon className="w-10 h-10 md:w-12 md:h-12 text-white" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 text-xl md:text-2xl font-bold text-white group-hover:text-white transition-colors">
                    {section.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm md:text-base text-white/80 flex-grow mb-6 leading-relaxed">
                    {section.description}
                  </p>

                  {/* Explore Button */}
                  <div className="flex items-center text-sm font-semibold text-white/90 group-hover:text-white transition-colors">
                    <span>Explore</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="ml-2"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>
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
