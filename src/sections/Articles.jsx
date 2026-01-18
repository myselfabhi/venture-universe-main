"use client";

import { useState, useMemo, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import Marquee from "../components/Marquee";
import { spaceArticles } from "../constants";
import { Search, Filter, X, Grid3x3, Move, ExternalLink, Clock, Share2, BookOpen, Sparkles } from "lucide-react";

const SpaceArticleCard = ({ img, author, title, excerpt, link, category, readingTime, isGrid = false }) => {
  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: title,
        text: excerpt,
        url: link,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(link);
    }
  };

  // Consistent card dimensions
  const cardClasses = twMerge(
    "relative flex flex-col h-full min-h-[280px] cursor-pointer overflow-hidden rounded-xl border p-4 border-gray-50/[.1] bg-gradient-to-r bg-indigo to-storm hover:bg-royal transition-all duration-300 hover-animation group",
    isGrid ? "w-full" : "w-64"
  );

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="no-underline h-full"
      id="article"
    >
      <figure className={cardClasses}>
        {/* Author Section - Fixed height */}
        <div className="flex flex-row items-center gap-2 mb-3 flex-shrink-0">
          <img
            className="rounded-full bg-white/10 border-2 border-white/20 group-hover:border-white/40 transition-colors flex-shrink-0"
            width={isGrid ? "40" : "32"}
            height={isGrid ? "40" : "32"}
            alt={author}
            src={img}
          />
          <div className="flex-1 flex flex-col min-w-0">
            <figcaption className="text-sm font-medium text-white truncate">
              {author}
            </figcaption>
            {category && (
              <span className="text-xs text-white/60 mt-0.5 line-clamp-1">{category}</span>
            )}
          </div>
        </div>
        
        {/* Title - Fixed max height with line-clamp */}
        <blockquote className={twMerge("font-semibold text-white mb-3 line-clamp-2 flex-shrink-0", isGrid ? "text-base min-h-[3rem]" : "text-sm min-h-[2.5rem]")}>
          {title}
        </blockquote>
        
        {/* Excerpt - Flexible, takes remaining space */}
        <p className={twMerge("text-white/60 mb-3 line-clamp-2 flex-grow", isGrid ? "text-sm" : "text-xs")}>
          {excerpt}
        </p>

        {/* Footer - Fixed at bottom */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/10 flex-shrink-0">
          {readingTime && (
            <div className="flex items-center gap-1 text-xs text-white/50">
              <Clock className="w-3 h-3" />
              <span>{readingTime} min</span>
            </div>
          )}
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors opacity-0 group-hover:opacity-100"
              title="Share article"
            >
              <Share2 className="w-3 h-3 text-white/70" />
            </button>
            <ExternalLink className="w-3 h-3 text-white/50" />
          </div>
        </div>
      </figure>
    </a>
  );
};

const FeaturedArticleCard = ({ article }) => {
  const { img, author, title, excerpt, link, category, readingTime } = article;

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: title,
        text: excerpt,
        url: link,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(link);
    }
  };

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="no-underline block"
    >
      <div className="relative group overflow-hidden rounded-2xl border border-gray-50/10 bg-gradient-to-br from-indigo/80 via-purple/60 to-royal/80 hover:from-indigo hover:via-purple hover:to-royal transition-all duration-500 hover-animation">
        <div className="p-8 md:p-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-medium text-white">
              Featured Article
            </div>
            {category && (
              <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs text-white/80">
                {category}
              </div>
            )}
          </div>

          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight group-hover:text-white/90 transition-colors">
            {title}
          </h3>

          <p className="text-lg text-white/80 mb-6 line-clamp-2">
            {excerpt}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <img
                  className="rounded-full bg-white/20 border-2 border-white/30"
                  width="48"
                  height="48"
                  alt={author}
                  src={img}
                />
                <div>
                  <div className="text-base font-semibold text-white">{author}</div>
                  {readingTime && (
                    <div className="flex items-center gap-1 text-sm text-white/60">
                      <Clock className="w-3 h-3" />
                      <span>{readingTime} min read</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleShare}
                className="p-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all group-hover:scale-110"
                title="Share article"
              >
                <Share2 className="w-5 h-5 text-white" />
              </button>
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm group-hover:scale-110 transition-transform">
                <ExternalLink className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default function FamousArticlesSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("marquee"); // "marquee" or "grid"
  const [recentArticles, setRecentArticles] = useState([]);
  const [isLoadingRecent, setIsLoadingRecent] = useState(false);
  const [showRecent, setShowRecent] = useState(false);

  // Prestigious sources more likely to have articles by famous space scientists
  const prestigiousSources = [
    'NASA', 'ESA', 'Space.com', 'SpaceNews', 'Universe Today', 
    'Scientific American', 'Nature', 'Science', 'Astronomy', 
    'Sky & Telescope', 'National Geographic'
  ];

  // Fetch recent articles from Spaceflight News API
  useEffect(() => {
    const fetchRecentArticles = async () => {
      setIsLoadingRecent(true);
      try {
        // Use internal API route with 15-minute caching
        const response = await fetch('/api/articles?limit=20&ordering=-published_at');
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.results && Array.isArray(data.results)) {
          // Filter articles from prestigious sources and map to our format
          const mappedArticles = data.results
            .filter((item) => {
              const newsSite = item.news_site || '';
              return prestigiousSources.some(source => 
                newsSite.toLowerCase().includes(source.toLowerCase())
              ) && item.image_url; // Only include items with images
            })
            .slice(0, 8) // Limit to 8 recent articles
            .map((item, index) => ({
              id: `recent-${item.id}`,
              author: item.authors?.[0]?.name || item.news_site || 'Space News',
              title: item.title,
              excerpt: item.summary?.slice(0, 120) || 'Read more about this space discovery...',
              img: item.image_url || 'https://via.placeholder.com/150',
              link: item.url,
              category: item.news_site || 'Space News',
              featured: false,
              readingTime: Math.ceil((item.summary?.length || 500) / 200) || 5, // Estimate reading time
              isRecent: true,
              publishedAt: item.published_at,
            }));
          
          setRecentArticles(mappedArticles);
        }
      } catch (err) {
        console.error("Error fetching recent articles:", err);
        // Don't show error to user, just silently fail
      } finally {
        setIsLoadingRecent(false);
      }
    };

    fetchRecentArticles();
  }, []);

  const categories = useMemo(() => {
    const cats = [...new Set(spaceArticles.map(article => article.category))];
    return cats.sort();
  }, []);

  const featuredArticles = useMemo(() => 
    spaceArticles.filter(article => article.featured),
    []
  );

  const regularArticles = useMemo(() => 
    spaceArticles.filter(article => !article.featured),
    []
  );

  // Combine static articles with recent API articles
  const allArticles = useMemo(() => {
    return [...regularArticles, ...recentArticles];
  }, [regularArticles, recentArticles]);

  const filteredArticles = useMemo(() => {
    let filtered = [...allArticles];

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(article => 
        article.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by search query
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

  const firstRow = filteredArticles.slice(0, Math.ceil(filteredArticles.length / 2));
  const secondRow = filteredArticles.slice(Math.ceil(filteredArticles.length / 2));

  const hasActiveFilters = searchQuery.trim() || selectedCategory !== "all";

  return (
    <section className="c-space section-spacing">
      <div className="flex items-center gap-3 mb-2">
        <BookOpen className="w-6 h-6 text-white/60" />
        <h2 className="text-heading">Famous Articles from Great Space People</h2>
      </div>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <div className="mb-12 mt-8">
          <h3 className="text-xl font-semibold text-white/80 mb-4">Featured Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredArticles.map((article) => (
              <FeaturedArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      )}

      {/* Recent Articles from API */}
      {recentArticles.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-lavender" />
              <h3 className="text-xl font-semibold text-white/80">
                Recent Space Articles from Top Sources
              </h3>
            </div>
            <button
              onClick={() => setShowRecent(!showRecent)}
              className="text-sm text-lavender hover:text-white transition-colors"
            >
              {showRecent ? 'Hide' : 'Show'} Recent Articles
            </button>
          </div>
          
          {showRecent && (
            <div className={twMerge(
              "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr",
              isLoadingRecent && "opacity-50"
            )}>
              {recentArticles.map((article) => (
                <SpaceArticleCard key={article.id} {...article} isGrid={true} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Search articles by title, author, or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-lavender/50 focus:border-lavender/50 transition-all"
            />
          </div>

          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-white/60" />
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <button
                onClick={() => setSelectedCategory("all")}
                className={twMerge(
                  "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
                  selectedCategory === "all"
                    ? "bg-gradient-to-r from-lavender to-royal text-white"
                    : "bg-white/10 text-white/70 hover:bg-white/20"
                )}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={twMerge(
                    "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
                    selectedCategory === category
                      ? "bg-gradient-to-r from-lavender to-royal text-white"
                      : "bg-white/10 text-white/70 hover:bg-white/20"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 border border-white/20 rounded-lg p-1 bg-white/5">
            <button
              onClick={() => setViewMode("marquee")}
              className={twMerge(
                "p-2 rounded-md transition-colors",
                viewMode === "marquee"
                  ? "bg-white/20 text-white"
                  : "text-white/50 hover:text-white/80"
              )}
              title="Marquee view"
            >
              <Move className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={twMerge(
                "p-2 rounded-md transition-colors",
                viewMode === "grid"
                  ? "bg-white/20 text-white"
                  : "text-white/50 hover:text-white/80"
              )}
              title="Grid view"
            >
              <Grid3x3 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {hasActiveFilters && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
              Clear Filters
            </button>
            <span className="text-sm text-white/50">
              {filteredArticles.length} {filteredArticles.length === 1 ? "article" : "articles"} found
            </span>
          </div>
        )}
      </div>

      {/* Articles Display */}
      {filteredArticles.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-white/60 text-lg">No articles found matching your criteria.</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="mt-4 px-6 py-2 text-white bg-gradient-to-r from-lavender to-royal rounded-lg hover:opacity-90 transition-opacity"
          >
            Clear Filters
          </button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
          {filteredArticles.map((article) => (
            <SpaceArticleCard key={article.id} {...article} isGrid={true} />
          ))}
        </div>
      ) : (
        <div className="relative flex flex-col items-center justify-center w-full overflow-hidden">
          <Marquee pauseOnHover className="[--duration:20s]">
            {firstRow.map((article) => (
              <SpaceArticleCard key={article.id} {...article} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:20s]">
            {secondRow.map((article) => (
              <SpaceArticleCard key={article.id} {...article} />
            ))}
          </Marquee>
          <div className="absolute inset-y-0 left-0 w-1/4 pointer-events-none bg-gradient-to-r from-primary" />
          <div className="absolute inset-y-0 right-0 w-1/4 pointer-events-none bg-gradient-to-l from-primary" />
        </div>
      )}
    </section>
  );
}