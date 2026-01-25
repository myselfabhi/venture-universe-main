"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Particles } from "../components/Particles";
import NewsDetails from "../components/NewsDetails";
import { Search, Filter, X, Clock, ExternalLink, Newspaper, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

const News = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [displayedNews, setDisplayedNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSource, setSelectedSource] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNews, setSelectedNews] = useState(null);
  const [failedImages, setFailedImages] = useState(new Set());
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/news?limit=50&ordering=-published_at');
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (!data.results || !Array.isArray(data.results)) {
          throw new Error("Invalid API response format");
        }
        
        const mappedData = data.results
          .filter((item) => item.image_url)
          .map((item) => ({
            id: item.id,
            title: item.title,
            description: item.summary?.slice(0, 150) + "..." || "Read more about this space discovery...",
            subDescription: [
              item.summary || "Read more about this space discovery...",
              `Published: ${new Date(item.published_at).toLocaleDateString()}`,
              `Source: ${item.news_site || "Unknown"}`,
            ],
            excerpt: item.summary?.slice(0, 120) + "..." || "Read more about this space discovery...",
            fullExcerpt: item.summary || "Read more about this space discovery...",
            href: item.url,
            image: item.image_url,
            publishedAt: new Date(item.published_at).toLocaleDateString(),
            publishedAtFull: item.published_at,
            source: item.news_site || "Space News",
            authors: item.authors || [],
            tags: [
              { id: 1, name: item.news_site || "Space News" },
              { id: 2, name: "Space" },
              { id: 3, name: item.authors?.[0]?.name || "Space News" },
            ],
          }));
        
        if (mappedData.length > 0) {
          setNewsItems(mappedData);
          setFilteredNews(mappedData);
        } else {
          throw new Error("No articles with images found in API response");
        }
      } catch (err) {
        console.error("Error fetching space news:", err);
        setError(`Failed to load news: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = [...newsItems];

    if (selectedSource !== "all") {
      filtered = filtered.filter((item) =>
        item.tags.some((tag) => tag.name.toLowerCase() === selectedSource.toLowerCase())
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.tags.some((tag) => tag.name.toLowerCase().includes(query))
      );
    }

    setFilteredNews(filtered);
    setCurrentPage(1);
  }, [searchQuery, selectedSource, newsItems]);

  // Pagination logic
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedNews(filteredNews.slice(startIndex, endIndex));
  }, [filteredNews, currentPage]);

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);

  const uniqueSources = useMemo(() => {
    const sources = new Set();
    newsItems.forEach((item) => {
      item.tags.forEach((tag) => {
        if (tag.id === 1) sources.add(tag.name);
      });
    });
    return Array.from(sources).sort();
  }, [newsItems]);

  const getReadingTime = (text) => {
    if (!text) return 2;
    const words = text.split(/\s+/).length;
    return Math.ceil(words / 200) || 2;
  };

  const handleImageError = (id) => {
    setFailedImages((prev) => new Set([...prev, id]));
  };

  const handleNewsClick = (news) => {
    setSelectedNews(news);
  };

  const closeModal = () => {
    setSelectedNews(null);
  };

  return (
    <section className="relative c-space section-spacing" id="news">
      <Particles
        className="absolute inset-0 -z-50"
        quantity={100}
        ease={80}
        color={"#ffffff"}
        refresh
      />

      {/* Header */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-8 h-8 text-lavender" />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Latest Space News
          </h2>
        </div>
        <p className="text-lg md:text-xl text-neutral-400 max-w-3xl">
          Stay updated with the latest space discoveries, missions, and cosmic events from around the universe
        </p>
      </motion.div>

      {/* Search and Filter Bar */}
      <motion.div
        className="flex flex-col gap-4 mb-8 sm:flex-row"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Search news articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-10 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-lavender focus:border-transparent transition-all duration-300"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="relative sm:w-48">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none z-10" />
          <select
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-lavender focus:border-transparent appearance-none cursor-pointer transition-all duration-300"
          >
            <option value="all" className="bg-primary text-white">All Sources</option>
            {uniqueSources.map((source) => (
              <option key={source} value={source} className="bg-primary text-white">
                {source}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Results Count */}
      {!isLoading && filteredNews.length > 0 && (
        <motion.p
          className="mb-6 text-sm text-neutral-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {searchQuery || selectedSource !== "all" 
            ? `Found ${filteredNews.length} article${filteredNews.length !== 1 ? 's' : ''}` 
            : `Showing ${filteredNews.length} articles`
          }
        </motion.p>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white/5 border border-white/10 p-6 animate-pulse"
            >
              <div className="w-full h-48 bg-white/10 rounded-lg mb-4" />
              <div className="h-4 bg-white/10 rounded w-3/4 mb-2" />
              <div className="h-4 bg-white/10 rounded w-1/2" />
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <motion.div
          className="p-6 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.div>
      )}

      {/* Empty State */}
      {!isLoading && filteredNews.length === 0 && (
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Search className="w-16 h-16 text-neutral-600 mx-auto mb-4" />
          <p className="text-neutral-400 text-lg mb-2">No articles found</p>
          <p className="text-neutral-500 text-sm mb-6">
            {searchQuery || selectedSource !== "all"
              ? "Try adjusting your search or filters"
              : "Check back later for new articles"
            }
          </p>
          {(searchQuery || selectedSource !== "all") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedSource("all");
              }}
              className="px-6 py-3 text-sm font-medium text-white transition-all duration-300 rounded-lg bg-gradient-to-r from-royal to-lavender hover:from-lavender hover:to-royal hover:scale-105"
            >
              Clear Filters
            </button>
          )}
        </motion.div>
      )}

      {/* News Grid */}
      {!isLoading && displayedNews.length > 0 && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <AnimatePresence mode="popLayout">
            {displayedNews.map((news, index) => (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-storm to-indigo border border-white/10 hover:border-lavender/50 transition-all duration-300 hover:shadow-xl hover:shadow-lavender/10 hover:-translate-y-2 cursor-pointer"
                onClick={() => handleNewsClick(news)}
              >
                {/* Image */}
                <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-royal via-lavender to-indigo">
                  {failedImages.has(news.id) ? (
                    <div className="flex flex-col items-center justify-center w-full h-full p-4">
                      {/* Animated Newspaper Icon */}
                      <motion.div
                        animate={{ 
                          y: [0, -8, 0],
                          rotate: [0, 3, -3, 0]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="mb-3"
                      >
                        <Newspaper className="w-20 h-20 text-white/70" />
                      </motion.div>
                      
                      {/* News Title */}
                      <div className="text-center max-w-[90%]">
                        <p className="text-sm font-semibold text-white/90 line-clamp-2 mb-1">
                          {news.title}
                        </p>
                        <p className="text-xs text-white/60">
                          {news.source}
                        </p>
                      </div>
                      
                      {/* Decorative Stars */}
                      <div className="absolute inset-0 overflow-hidden">
                        {[...Array(8)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-white rounded-full"
                            style={{
                              left: `${15 + (i * 12) % 80}%`,
                              top: `${10 + (i % 4) * 25}%`,
                            }}
                            animate={{
                              opacity: [0.3, 0.9, 0.3],
                              scale: [1, 1.8, 1],
                            }}
                            transition={{
                              duration: 2.5,
                              repeat: Infinity,
                              delay: i * 0.25,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <>
                      <img
                        src={news.image}
                        alt={news.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={() => handleImageError(news.id)}
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-60" />
                    </>
                  )}
                  
                  {/* Source Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-3 py-1 text-xs font-semibold text-white rounded-full bg-black/50 backdrop-blur-sm border border-white/20">
                      {news.source}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-lavender transition-colors duration-300">
                    {news.title}
                  </h3>
                  
                  <p className="text-sm text-neutral-400 mb-4 line-clamp-2">
                    {news.excerpt}
                  </p>

                  {/* Metadata */}
                  <div className="flex items-center justify-between text-xs text-neutral-500">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {getReadingTime(news.fullExcerpt)} min read
                      </span>
                      <span>{news.publishedAt}</span>
                    </div>
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Pagination */}
      {!isLoading && filteredNews.length > itemsPerPage && (
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-all duration-300 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                        currentPage === page
                          ? "bg-gradient-to-r from-royal to-lavender text-white shadow-lg shadow-lavender/50"
                          : "bg-white/10 text-white hover:bg-white/20"
                      } hover:scale-105`}
                    >
                      {page}
                    </button>
                  );
                } else if (
                  page === currentPage - 2 ||
                  page === currentPage + 2
                ) {
                  return <span key={page} className="text-neutral-400 px-2">...</span>;
                }
                return null;
              })}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-all duration-300 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <p className="text-sm text-neutral-500">
            Page {currentPage} of {totalPages} • Showing {displayedNews.length} of {filteredNews.length} articles
          </p>
        </motion.div>
      )}

      {/* News Details Modal */}
      <AnimatePresence>
        {selectedNews && (
          <NewsDetails
            title={selectedNews.title}
            description={selectedNews.description}
            subDescription={selectedNews.subDescription}
            image={selectedNews.image}
            tags={selectedNews.tags}
            href={selectedNews.href}
            closeModal={closeModal}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default News;
