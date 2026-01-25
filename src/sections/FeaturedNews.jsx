"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Newspaper, Clock, ExternalLink, Sparkles } from "lucide-react";

const FeaturedNews = () => {
  const [latestNews, setLatestNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [failedImages, setFailedImages] = useState(new Set());

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        // Use internal API route with 10-minute caching - fetch more for featured treatment
        const response = await fetch('/api/news?limit=5&ordering=-published_at');
        
        if (response.ok) {
          const data = await response.json();
          if (data.results && Array.isArray(data.results)) {
            const mappedData = data.results
              .filter((item) => item.image_url)
              .slice(0, 5)
              .map((item) => ({
                id: item.id,
                title: item.title,
                excerpt: item.summary?.slice(0, 150) + "..." || "Read more about this space discovery...",
                fullExcerpt: item.summary || "Read more about this space discovery...",
                image: item.image_url,
                url: item.url,
                publishedAt: new Date(item.published_at).toLocaleDateString(),
                publishedAtFull: item.published_at,
                source: item.news_site || "Space News",
                authors: item.authors || [],
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

  // Calculate reading time (average 200 words per minute)
  const getReadingTime = (text) => {
    if (!text) return 2;
    const words = text.split(/\s+/).length;
    return Math.ceil(words / 200) || 2;
  };

  if (isLoading) {
    return (
      <section className="c-space py-12 md:py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-6 h-6 text-lavender" />
              <h2 className="text-heading">Latest Space News</h2>
            </div>
            <p className="text-neutral-400">Stay updated with the cosmos</p>
          </div>
        </div>
        <div className="text-neutral-400">Loading latest news...</div>
      </section>
    );
  }

  if (latestNews.length === 0) {
    return null;
  }

  const featuredNews = latestNews[0];
  const otherNews = latestNews.slice(1);

  return (
    <section className="c-space py-12 md:py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-6 h-6 text-lavender" />
            <h2 className="text-heading">Latest Space News</h2>
          </div>
          <p className="text-neutral-400">Breaking discoveries and cosmic updates</p>
        </div>
        <Link
          href="/news"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-all duration-300 rounded-lg bg-white/10 hover:bg-white/20 hover:scale-105 hover-animation"
        >
          View All
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Featured Article - Large Card */}
      {featuredNews && (
        <motion.a
          href={featuredNews.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block mb-8 overflow-hidden rounded-2xl bg-gradient-to-br from-storm to-indigo border border-white/10 hover:border-lavender/50 transition-all duration-300 hover:shadow-2xl hover:shadow-lavender/20 hover:-translate-y-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="relative h-64 md:h-80 overflow-hidden bg-gradient-to-br from-royal to-lavender">
              {featuredNews.image && !failedImages.has(featuredNews.id) ? (
                <img
                  src={featuredNews.image}
                  alt={featuredNews.title}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  onError={() => {
                    setFailedImages(prev => new Set(prev).add(featuredNews.id));
                  }}
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  <Newspaper className="w-20 h-20 text-white/40" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
              
              {/* Featured Badge */}
              <div className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold text-white rounded-full bg-gradient-to-r from-lavender to-royal backdrop-blur-md border border-white/20">
                Featured
              </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col justify-between p-6 md:p-8">
              <div>
                {/* Source and Date */}
                <div className="flex items-center justify-between mb-3 text-xs text-neutral-400">
                  <span className="px-2 py-1 rounded-md bg-white/10">{featuredNews.source}</span>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    <span>{getReadingTime(featuredNews.fullExcerpt)} min read</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="mb-3 text-2xl md:text-3xl font-bold text-white leading-tight group-hover:text-lavender transition-colors line-clamp-3">
                  {featuredNews.title}
                </h3>

                {/* Excerpt */}
                <p className="mb-4 text-base text-neutral-300 leading-relaxed line-clamp-3">
                  {featuredNews.fullExcerpt}
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className="text-xs text-neutral-400">{featuredNews.publishedAt}</span>
                <div className="flex items-center gap-2 text-lavender group-hover:text-white transition-colors">
                  <span className="text-sm font-medium">Read More</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </motion.a>
      )}

      {/* Other News - 2 Column Grid */}
      {otherNews.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2">
          {otherNews.map((news, index) => (
            <motion.a
              key={news.id}
              href={news.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-storm to-indigo border border-white/10 hover:border-lavender/50 transition-all duration-300 hover:shadow-xl hover:shadow-lavender/10 hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (index + 1) * 0.1 }}
            >
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-royal to-lavender">
                {news.image && !failedImages.has(news.id) ? (
                  <img
                    src={news.image}
                    alt={news.title}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                    onError={() => {
                      setFailedImages(prev => new Set(prev).add(news.id));
                    }}
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full">
                    <Newspaper className="w-16 h-16 text-white/40" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
                
                {/* Source Badge */}
                <div className="absolute top-3 left-3 px-2 py-1 text-xs font-medium text-white rounded-md bg-white/10 backdrop-blur-md border border-white/20">
                  {news.source}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2 text-xs text-neutral-400">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    <span>{getReadingTime(news.fullExcerpt)} min read</span>
                  </div>
                  <span>{news.publishedAt}</span>
                </div>
                
                <h3 className="mb-2 text-lg font-semibold text-white line-clamp-2 group-hover:text-lavender transition-colors">
                  {news.title}
                </h3>
                
                <p className="text-sm text-neutral-400 line-clamp-2 mb-4">
                  {news.excerpt}
                </p>

                <div className="flex items-center gap-2 text-lavender text-sm group-hover:text-white transition-colors">
                  <span className="font-medium">Read Article</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedNews;
