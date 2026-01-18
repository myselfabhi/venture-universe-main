"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const FeaturedNews = () => {
  const [latestNews, setLatestNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const response = await fetch(
          `https://api.spaceflightnewsapi.net/v4/articles/?limit=3&ordering=-published_at`
        );
        
        if (response.ok) {
          const data = await response.json();
          if (data.results && Array.isArray(data.results)) {
            const mappedData = data.results
              .filter((item) => item.image_url)
              .slice(0, 3)
              .map((item) => ({
                id: item.id,
                title: item.title,
                excerpt: item.summary?.slice(0, 150) + "..." || "Read more about this space discovery...",
                image: item.image_url,
                url: item.url,
                publishedAt: new Date(item.published_at).toLocaleDateString(),
                source: item.news_site || "Space News",
              }));
            setLatestNews(mappedData);
          }
        }
      } catch (err) {
        console.error("Error fetching featured news:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestNews();
  }, []);

  if (isLoading) {
    return (
      <section className="c-space section-spacing">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-heading">Latest Space News</h2>
            <p className="mt-2 text-neutral-400">Stay updated with the cosmos</p>
          </div>
        </div>
        <div className="text-neutral-400">Loading latest news...</div>
      </section>
    );
  }

  if (latestNews.length === 0) {
    return null;
  }

  return (
    <section className="c-space section-spacing">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-heading">Latest Space News</h2>
          <p className="mt-2 text-neutral-400">Breaking discoveries and cosmic updates</p>
        </div>
        <Link
          href="/news"
          className="flex items-center gap-2 px-4 py-2 text-sm text-white transition-colors rounded-md bg-white/10 hover:bg-white/20 hover-animation"
        >
          View All
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {latestNews.map((news, index) => (
          <motion.a
            key={news.id}
            href={news.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-xl bg-gradient-to-b from-storm to-indigo hover-animation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={news.image}
                alt={news.title}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2 text-xs text-neutral-400">
                <span>{news.source}</span>
                <span>{news.publishedAt}</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white line-clamp-2 group-hover:text-lavender transition-colors">
                {news.title}
              </h3>
              <p className="text-sm text-neutral-400 line-clamp-2">
                {news.excerpt}
              </p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default FeaturedNews;
