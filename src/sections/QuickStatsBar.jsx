"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { 
  Image as ImageIcon, 
  Rocket, 
  Newspaper, 
  Calendar,
  ArrowRight,
  Clock
} from "lucide-react";

const QuickStatsBar = () => {
  const [stats, setStats] = useState({
    apod: null,
    launches: { count: 0, nextLaunch: null },
    news: { count: 0, latestHeadline: null },
    isLoading: true,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch all data in parallel
        const [apodRes, launchesRes, newsRes] = await Promise.all([
          fetch('/api/apod').catch(() => null),
          fetch('/api/launches?limit=5&ordering=net').catch(() => null),
          fetch('/api/news?limit=1&ordering=-published_at').catch(() => null),
        ]);

        const newStats = {
          apod: null,
          launches: { count: 0, nextLaunch: null },
          news: { count: 0, latestHeadline: null },
          isLoading: false,
        };

        // Process APOD
        if (apodRes?.ok) {
          const apodData = await apodRes.json();
          if (apodData.media_type === 'image') {
            newStats.apod = {
              title: apodData.title,
              url: apodData.url,
              date: apodData.date,
            };
          }
        }

        // Process Launches
        if (launchesRes?.ok) {
          const launchesData = await launchesRes.json();
          if (launchesData.results && Array.isArray(launchesData.results)) {
            const validLaunches = launchesData.results.filter(
              launch => launch.net && 
              !launch.mission?.name?.toLowerCase().includes('unknown payload') &&
              !launch.mission?.name?.toLowerCase().includes('tbd')
            );
            newStats.launches.count = validLaunches.length;
            if (validLaunches.length > 0) {
              newStats.launches.nextLaunch = {
                name: validLaunches[0].name,
                date: validLaunches[0].net,
              };
            }
          }
        }

        // Process News
        if (newsRes?.ok) {
          const newsData = await newsRes.json();
          if (newsData.results && Array.isArray(newsData.results)) {
            newStats.news.count = newsData.count || newsData.results.length;
            if (newsData.results.length > 0) {
              newStats.news.latestHeadline = {
                title: newsData.results[0].title,
                url: newsData.results[0].url,
              };
            }
          }
        }

        setStats(newStats);
      } catch (err) {
        console.error("Error fetching stats:", err);
        setStats(prev => ({ ...prev, isLoading: false }));
      }
    };

    fetchStats();
  }, []);

  // Calculate days until next launch
  const getDaysUntil = (dateString) => {
    if (!dateString) return null;
    const now = new Date();
    const launch = new Date(dateString);
    const diffTime = launch - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  if (stats.isLoading) {
    return (
      <section className="c-space py-6 md:py-8">
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-6xl">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-full h-32 rounded-xl bg-white/5 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const statsCards = [
    {
      id: 'apod',
      title: "Today's APOD",
      icon: ImageIcon,
      href: "/news",
      gradient: "from-royal to-lavender",
      content: stats.apod ? (
        <div className="flex items-center gap-3">
          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={stats.apod.url}
              alt={stats.apod.title}
              className="object-cover w-full h-full"
              loading="lazy"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-white/80 line-clamp-2">{stats.apod.title}</p>
            <p className="text-xs text-white/60 mt-1">{formatDate(stats.apod.date)}</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-white/60">
          <ImageIcon className="w-5 h-5" />
          <span className="text-sm">No image today</span>
        </div>
      ),
    },
    {
      id: 'launches',
      title: "Upcoming Launches",
      icon: Rocket,
      href: "/launches",
      gradient: "from-lavender to-royal",
      content: stats.launches.count > 0 ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-white">{stats.launches.count}</span>
            <Rocket className="w-6 h-6 text-white/80" />
          </div>
          {stats.launches.nextLaunch && (
            <div className="space-y-1">
              <p className="text-xs text-white/80 line-clamp-1">
                {stats.launches.nextLaunch.name.split('|')[0].trim()}
              </p>
              {(() => {
                const daysUntil = getDaysUntil(stats.launches.nextLaunch.date);
                return daysUntil !== null && daysUntil >= 0 ? (
                  <div className="flex items-center gap-1 text-xs text-white/60">
                    <Clock className="w-3 h-3" />
                    <span>{daysUntil === 0 ? 'Today' : daysUntil === 1 ? 'Tomorrow' : `${daysUntil} days`}</span>
                  </div>
                ) : null;
              })()}
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2 text-white/60">
          <Rocket className="w-5 h-5" />
          <span className="text-sm">No upcoming launches</span>
        </div>
      ),
    },
    {
      id: 'news',
      title: "Latest News",
      icon: Newspaper,
      href: "/news",
      gradient: "from-indigo to-storm",
      content: stats.news.count > 0 ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-white">{stats.news.count}+</span>
            <Newspaper className="w-6 h-6 text-white/80" />
          </div>
          {stats.news.latestHeadline && (
            <p className="text-xs text-white/80 line-clamp-2">
              {stats.news.latestHeadline.title}
            </p>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2 text-white/60">
          <Newspaper className="w-5 h-5" />
          <span className="text-sm">No news available</span>
        </div>
      ),
    },
  ];

  return (
    <section className="c-space py-6 md:py-8 -mt-4">
      <div className="relative">
        {/* Centered Grid Container */}
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-6xl">
            {statsCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-full"
                >
                <Link
                  href={card.href}
                  className="group relative block h-full p-5 rounded-xl bg-gradient-to-br bg-white/10 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-white/80" />
                        <span className="text-xs font-medium text-white/80 uppercase tracking-wide">
                          {card.title}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                    </div>

                    {/* Content */}
                    <div className="min-h-[60px]">
                      {card.content}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickStatsBar;
