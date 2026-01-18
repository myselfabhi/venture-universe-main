"use client";

import { useState, useEffect, useMemo } from "react";
import NewsItem from "../components/Project";
import { nasaNews } from "../constants";
import { motion, useMotionValue, useSpring } from "motion/react";
import { Particles } from "../components/Particles";
import { Search, Filter, X } from "lucide-react";

const News = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 10, stiffness: 50 });
  const springY = useSpring(y, { damping: 10, stiffness: 50 });
  const [preview, setPreview] = useState(null);
  const [newsItems, setNewsItems] = useState(nasaNews); // Use mock data initially
  const [filteredNews, setFilteredNews] = useState(newsItems);
  const [displayedNews, setDisplayedNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSource, setSelectedSource] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch initial batch - Spaceflight News API aggregates from 100+ sources
        // Sources include: NASA, ESA, Space.com, Reuters, SpaceNews, Universe Today, and more
        // We'll load 50 articles and paginate them client-side
        const response = await fetch(
          `https://api.spaceflightnewsapi.net/v4/articles/?limit=50&ordering=-published_at`
        );
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Check if response has results array
        if (!data.results || !Array.isArray(data.results)) {
          throw new Error("Invalid API response format");
        }
        
        // Map Spaceflight News API data to match newsItems structure
        const mappedData = data.results
          .filter((item) => item.image_url) // Only include items with images
          .map((item) => ({
            id: item.id,
            title: item.title,
            description: item.summary?.slice(0, 100) + "..." || "No description available",
            subDescription: [
              item.summary || "No description available",
              `Published: ${new Date(item.published_at).toLocaleDateString()}`,
              `Source: ${item.news_site || "Unknown"}`,
            ],
            href: item.url,
            image: item.image_url,
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
        setError(`Failed to load news: ${err.message}. Using fallback data.`);
        // Fallback to mock data if API fails
        setNewsItems(nasaNews);
        setFilteredNews(nasaNews);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = [...newsItems];

    // Filter by source
    if (selectedSource !== "all") {
      filtered = filtered.filter((item) =>
        item.tags.some((tag) => tag.name.toLowerCase() === selectedSource.toLowerCase())
      );
    }

    // Filter by search query
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
    setCurrentPage(1); // Reset to page 1 when filters change
  }, [searchQuery, selectedSource, newsItems]);

  // Pagination logic - update displayed news when filteredNews or currentPage changes
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedNews(filteredNews.slice(startIndex, endIndex));
  }, [filteredNews, currentPage]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);

  // Get unique sources for filter dropdown
  const uniqueSources = useMemo(() => {
    const sources = new Set();
    newsItems.forEach((item) => {
      item.tags.forEach((tag) => {
        if (tag.id === 1) sources.add(tag.name); // First tag is usually the news site
      });
    });
    return Array.from(sources).sort();
  }, [newsItems]);

  const handleMouseMove = (e) => {
    x.set(e.clientX + 20);
    y.set(e.clientY + 20);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative c-space section-spacing"
      id="news"
    >
      {/* SVG Background */}
      <div
        className="absolute inset-0 -z-50"
        // style={{
        //   backgroundImage: "url('/assets/space-background.svg')",
        //   backgroundRepeat: "repeat",
        //   backgroundSize: "200px 200px",
        //   opacity: 0.3,
        // }}
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
      <div className="mb-8">
        <h2 className="text-heading">Latest Space News</h2>
        <p className="mt-2 text-neutral-400">Stay updated with the latest space discoveries and events</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col gap-4 mb-8 sm:flex-row">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-10 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-lavender focus:border-transparent"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Source Filter */}
        <div className="relative sm:w-48">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <select
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-lavender focus:border-transparent appearance-none cursor-pointer"
          >
            <option value="all" className="bg-primary text-white">All Sources</option>
            {uniqueSources.map((source) => (
              <option key={source} value={source} className="bg-primary text-white">
                {source}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      {!isLoading && filteredNews.length > 0 && (
        <p className="mb-4 text-sm text-neutral-400">
          {searchQuery || selectedSource !== "all" 
            ? `Found ${filteredNews.length} article${filteredNews.length !== 1 ? 's' : ''}` 
            : `Total ${filteredNews.length} articles`
          }
        </p>
      )}

      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-4 h-[1px] w-full" />
      
      {isLoading && <p className="mt-8 text-neutral-400">Loading news...</p>}
      {error && <p className="mt-8 text-red-400">{error}</p>}
      
      {!isLoading && filteredNews.length === 0 && (
        <div className="mt-8 text-center py-12">
          <Search className="w-16 h-16 text-neutral-600 mx-auto mb-4" />
          <p className="text-neutral-400 text-lg">No articles found matching your criteria.</p>
          {(searchQuery || selectedSource !== "all") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedSource("all");
              }}
              className="mt-4 px-4 py-2 text-sm text-white bg-white/10 rounded-lg hover:bg-white/20 hover-animation"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}
      
      {displayedNews.map((news) => (
        <NewsItem key={news.id} {...news} setPreview={setPreview} />
      ))}

      {/* Pagination Controls */}
      {!isLoading && filteredNews.length > itemsPerPage && (
        <div className="flex items-center justify-center gap-4 mt-12">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed hover-animation"
          >
            Previous
          </button>
          
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              // Show first page, last page, current page, and pages around current
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      currentPage === page
                        ? "bg-gradient-to-r from-lavender to-royal text-white"
                        : "bg-white/10 text-white hover:bg-white/20"
                    } hover-animation`}
                  >
                    {page}
                  </button>
                );
              } else if (
                page === currentPage - 2 ||
                page === currentPage + 2
              ) {
                return <span key={page} className="text-neutral-400">...</span>;
              }
              return null;
            })}
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed hover-animation"
          >
            Next
          </button>
        </div>
      )}

      {/* Page Info */}
      {!isLoading && filteredNews.length > 0 && (
        <p className="mt-4 text-center text-sm text-neutral-500">
          Page {currentPage} of {totalPages} • Showing {displayedNews.length} of {filteredNews.length} articles
        </p>
      )}
      {preview && (
        <motion.img
          className="fixed top-0 left-0 z-50 object-cover h-56 rounded-lg shadow-lg pointer-events-none w-80"
          src={preview}
          style={{ x: springX, y: springY }}
        />
      )}
    </section>
  );
};

export default News;