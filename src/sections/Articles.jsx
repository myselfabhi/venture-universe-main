"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Particles } from "../components/Particles";
import { spaceArticles } from "../constants";
import { 
  Search, 
  Filter, 
  X, 
  ExternalLink, 
  Clock, 
  Share2, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  User,
  BookOpen,
  Quote
} from "lucide-react";

const ArticleCard = ({ article }) => {
  const { img, author, title, excerpt, link, category, readingTime } = article;
  const [imageFailed, setImageFailed] = useState(false);

  const handleShare = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: excerpt,
          url: link,
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Share failed:', err);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(link);
      } catch (err) {
        console.error('Copy failed:', err);
      }
    }
  };

  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-storm to-indigo border border-white/10 hover:border-lavender/50 transition-all duration-300 hover:shadow-xl hover:shadow-lavender/10 hover:-translate-y-1 block"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="p-4 md:p-5">
        <div className="flex gap-4">
          {/* Author Image - Left Side */}
          <div className="flex-shrink-0">
            {img ? (
              <div className="relative">
                <img
                  src={img}
                  alt={author}
                  className="w-14 h-14 md:w-16 md:h-16 rounded-xl border-2 border-white/20 group-hover:border-lavender/50 transition-all duration-300 object-cover"
                  onError={() => setImageFailed(true)}
                />
                {!imageFailed && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-gradient-to-br from-royal to-lavender border-2 border-primary flex items-center justify-center">
                    <Quote className="w-2.5 h-2.5 text-white" />
                  </div>
                )}
              </div>
            ) : (
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-royal/30 to-lavender/30 border-2 border-white/20 group-hover:border-lavender/50 transition-all duration-300 flex items-center justify-center">
                <User className="w-7 h-7 md:w-8 md:h-8 text-white/60" />
              </div>
            )}
          </div>

          {/* Content - Right Side */}
          <div className="flex-1 min-w-0">
            {/* Author & Category */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="text-base md:text-lg font-bold text-white mb-1 group-hover:text-lavender transition-colors duration-300 line-clamp-1">
                  {author}
                </h3>
                {category && (
                  <span className="inline-block px-2 py-0.5 text-xs font-medium text-lavender rounded-full bg-lavender/10 border border-lavender/20">
                    {category}
                  </span>
                )}
              </div>
              <button
                onClick={handleShare}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 opacity-0 group-hover:opacity-100 flex-shrink-0"
                title="Share article"
              >
                <Share2 className="w-3.5 h-3.5 text-white/70" />
              </button>
            </div>

            {/* Article Title */}
            <h4 className="text-lg md:text-xl font-bold text-white mb-2 leading-tight group-hover:text-lavender transition-colors duration-300 line-clamp-2">
              {title}
            </h4>

            {/* Excerpt */}
            <p className="text-xs md:text-sm text-neutral-400 mb-3 line-clamp-2 leading-relaxed">
              {excerpt}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              {readingTime && (
                <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{readingTime} min</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 text-neutral-500 group-hover:text-lavender transition-colors">
                <span className="text-xs font-medium">Read</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.a>
  );
};

const FeaturedArticleCard = ({ article }) => {
  const { img, author, title, excerpt, link, category, readingTime } = article;
  const [imageFailed, setImageFailed] = useState(false);

  const handleShare = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: excerpt,
          url: link,
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Share failed:', err);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(link);
      } catch (err) {
        console.error('Copy failed:', err);
      }
    }
  };

  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-lavender to-royal border border-white/10 hover:border-white/30 transition-all duration-300 hover:shadow-xl hover:shadow-lavender/20 block"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="p-5 md:p-6">
        {/* Badges */}
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-semibold text-white">
            Featured
          </span>
          {category && (
            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs text-white/90">
              {category}
            </span>
          )}
        </div>

        {/* Author Section */}
        <div className="flex items-center gap-3 mb-4">
          {img ? (
            <div className="relative">
              <img
                src={img}
                alt={author}
                className="w-12 h-12 rounded-xl border-2 border-white/30 object-cover"
                onError={() => setImageFailed(true)}
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-white/20 border-2 border-primary flex items-center justify-center">
                <Quote className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
          ) : (
            <div className="w-12 h-12 rounded-xl bg-white/20 border-2 border-white/30 flex items-center justify-center">
              <User className="w-6 h-6 text-white/60" />
            </div>
          )}
          <div>
            <p className="text-base font-bold text-white">{author}</p>
            {readingTime && (
              <div className="flex items-center gap-1 text-xs text-white/60 mt-0.5">
                <Clock className="w-3 h-3" />
                <span>{readingTime} min</span>
              </div>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight group-hover:text-white/90 transition-colors line-clamp-2">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm md:text-base text-white/80 mb-4 line-clamp-2">
          {excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all group-hover:scale-110"
              title="Share article"
            >
              <Share2 className="w-4 h-4 text-white" />
            </button>
            <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm group-hover:scale-110 transition-transform">
              <ExternalLink className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </motion.a>
  );
};

export default function FamousArticlesSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const categories = useMemo(() => {
    const cats = [...new Set(spaceArticles.map(article => article.category))];
    return cats.sort();
  }, []);

  const featuredArticles = useMemo(() => 
    spaceArticles.filter(article => article.featured),
    []
  );

  // Exclude featured articles from the main list
  const allArticles = useMemo(() => 
    spaceArticles
      .filter(article => !article.featured)
      .map(article => ({
        ...article,
      })),
    []
  );

  const filteredArticles = useMemo(() => {
    let filtered = [...allArticles];

    if (selectedCategory !== "all") {
      filtered = filtered.filter(article => 
        article.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.author.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.category?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory, allArticles]);

  const displayedArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredArticles.slice(startIndex, endIndex);
  }, [filteredArticles, currentPage]);

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  return (
    <section className="relative c-space section-spacing">
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
            Famous Space Articles
          </h2>
        </div>
        <p className="text-lg md:text-xl text-neutral-400 max-w-3xl">
          Explore articles from great space scientists, astronomers, and thought leaders who shaped our understanding of the cosmos
        </p>
      </motion.div>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h3 className="text-2xl font-bold text-white mb-6">Featured Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredArticles.map((article) => (
              <FeaturedArticleCard key={article.id} article={article} />
            ))}
          </div>
        </motion.div>
      )}

      {/* Search and Filters */}
      <motion.div
        className="mb-8 space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search articles by title, author, or topic..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-12 pr-10 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-lavender focus:border-transparent transition-all duration-300"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setCurrentPage(1);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="relative sm:w-48">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none z-10" />
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-lavender focus:border-transparent appearance-none cursor-pointer transition-all duration-300"
            >
              <option value="all" className="bg-primary text-white">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category} className="bg-primary text-white">
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {(searchQuery || selectedCategory !== "all") && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setCurrentPage(1);
              }}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
              Clear Filters
            </button>
            <span className="text-sm text-neutral-400">
              {filteredArticles.length} {filteredArticles.length === 1 ? "article" : "articles"} found
            </span>
          </div>
        )}
      </motion.div>

      {/* Articles List */}
      {filteredArticles.length === 0 ? (
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <BookOpen className="w-16 h-16 text-neutral-600 mx-auto mb-4" />
          <p className="text-neutral-400 text-lg mb-2">No articles found</p>
          <p className="text-neutral-500 text-sm mb-6">
            {searchQuery || selectedCategory !== "all"
              ? "Try adjusting your search or filters"
              : "Check back later for new articles"
            }
          </p>
          {(searchQuery || selectedCategory !== "all") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setCurrentPage(1);
              }}
              className="px-6 py-3 text-sm font-medium text-white transition-all duration-300 rounded-lg bg-gradient-to-r from-royal to-lavender hover:from-lavender hover:to-royal hover:scale-105"
            >
              Clear Filters
            </button>
          )}
        </motion.div>
      ) : (
        <>
          <motion.div
            className="space-y-3 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <AnimatePresence mode="popLayout">
              {displayedArticles.map((article, index) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Pagination */}
          {filteredArticles.length > itemsPerPage && (
            <motion.div
              className="flex flex-col items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
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
                Page {currentPage} of {totalPages} • Showing {displayedArticles.length} of {filteredArticles.length} articles
              </p>
            </motion.div>
          )}
        </>
      )}
    </section>
  );
}
