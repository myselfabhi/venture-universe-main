"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, X, Clock, BookOpen, Rocket, ArrowRight } from "lucide-react";
import { useDebounce } from "../../src/hooks/useDebounce";
import { searchItems } from "../../src/utils/searchUtils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/isro", label: "ISRO" },
  { href: "/news", label: "News" },
  { href: "/articles", label: "Articles" },
  { href: "/contact", label: "Contact" },
];

function Navigation({ onLinkClick, isMobile = false }) {
  const pathname = usePathname();

  return (
    <ul className={`flex ${isMobile ? 'flex-col items-start gap-2' : 'flex-row items-center gap-1 md:gap-2'}`}>
      {navItems.map((item) => {
        const isActive = pathname === item.href || 
          (item.href !== "/" && pathname?.startsWith(item.href));
        
        return (
          <li key={item.href} className={isMobile ? "w-full" : ""}>
            <Link
              href={item.href}
              onClick={onLinkClick}
              className={`
                relative px-4 py-2 text-sm md:text-base font-medium transition-all duration-300
                ${isMobile 
                  ? 'block w-full text-left rounded-lg' 
                  : 'inline-block'
                }
                ${isActive
                  ? 'text-white'
                  : 'text-neutral-400 hover:text-white'
                }
                focus:outline-none focus:ring-2 focus:ring-lavender focus:ring-offset-2 focus:ring-offset-primary rounded-md
              `}
            >
              {item.label}
              {/* Active indicator underline */}
              {isActive && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-royal via-lavender to-royal"
                  layoutId="navbar-indicator"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}
              {/* Hover effect for non-active items */}
              {!isActive && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-royal/0 via-lavender/0 to-royal/0"
                  whileHover={{
                    background: "linear-gradient(to right, rgba(92, 51, 204, 0.5), rgba(122, 87, 219, 0.5), rgba(92, 51, 204, 0.5))",
                  }}
                />
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({ news: [], articles: [], launches: [] });
  const [isSearching, setIsSearching] = useState(false);
  const searchInputRef = useRef(null);
  const router = useRouter();
  const debouncedQuery = useDebounce(searchQuery, 300);

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard shortcut (Ctrl+K / Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearch(true);
      }
      if (e.key === 'Escape' && showSearch) {
        setShowSearch(false);
        setSearchQuery("");
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showSearch]);

  // Focus input when search opens
  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [showSearch]);

  // Global search functionality
  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.trim().length < 2) {
      setSearchResults({ news: [], articles: [], launches: [] });
      setIsSearching(false);
      return;
    }

    const performSearch = async () => {
      setIsSearching(true);
      const query = debouncedQuery.trim().toLowerCase();
      const results = { news: [], articles: [], launches: [] };

      try {
        // Search News
        const newsResponse = await fetch('/api/news?limit=10&ordering=-published_at');
        if (newsResponse.ok) {
          const newsData = await newsResponse.json();
          if (newsData.results) {
            const filteredNews = searchItems(
              newsData.results.map(item => ({
                id: item.id,
                title: item.title,
                summary: item.summary || '',
                source: item.news_site || '',
                url: item.url,
                type: 'news'
              })),
              query,
              ['title', 'summary', 'source']
            );
            results.news = filteredNews.slice(0, 5);
          }
        }

        // Search Articles (from constants - we'll search locally)
        // Note: For a full implementation, you might want to fetch articles from an API
        // For now, we'll just show a link to the articles page
        results.articles = []; // Placeholder - could enhance later

        // Search Launches
        const launchesResponse = await fetch('/api/launches?limit=10&ordering=net');
        if (launchesResponse.ok) {
          const launchesData = await launchesResponse.json();
          if (launchesData.results) {
            const filteredLaunches = searchItems(
              launchesData.results.map(item => ({
                id: item.id,
                title: item.name || '',
                mission: item.mission?.name || '',
                description: item.mission?.description || '',
                url: `/launches`,
                type: 'launch'
              })),
              query,
              ['title', 'mission', 'description']
            );
            results.launches = filteredLaunches.slice(0, 5);
          }
        }
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setSearchResults(results);
        setIsSearching(false);
      }
    };

    performSearch();
  }, [debouncedQuery]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const totalResults = searchResults.news.length + searchResults.articles.length + searchResults.launches.length;

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "backdrop-blur-xl bg-primary/80 border-b border-gradient-to-r from-royal/20 via-lavender/20 to-royal/20"
            : "backdrop-blur-lg bg-primary/40"
        }`}
      >
        {isScrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lavender/50 to-transparent" />
        )}

        <div className="mx-auto c-space max-w-7xl">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link
              href="/"
              className="relative group flex items-center gap-2"
              onClick={handleLinkClick}
            >
              <motion.span
                className="text-xl md:text-2xl font-bold text-white transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Venture Universe
              </motion.span>
              <motion.div
                className="absolute inset-0 rounded-lg bg-gradient-to-r from-royal/20 to-lavender/20 opacity-0 blur-xl group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
            </Link>

            <nav className="hidden lg:flex items-center gap-4">
              <Navigation />
              <button
                onClick={() => setShowSearch(true)}
                className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-lavender focus:ring-offset-2 focus:ring-offset-primary relative group"
                aria-label="Search (Ctrl+K)"
                title="Search (Ctrl+K or Cmd+K)"
              >
                <Search className="w-5 h-5" />
                <span className="absolute -bottom-1 -right-1 text-[8px] text-neutral-500 group-hover:text-neutral-400">
                  ⌘K
                </span>
              </button>
            </nav>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-lavender focus:ring-offset-2 focus:ring-offset-primary"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <motion.div
                animate={isOpen ? "open" : "closed"}
                className="relative w-6 h-6"
              >
                <motion.span
                  className="absolute top-0 left-0 w-full h-0.5 bg-current rounded-full"
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 8 },
                  }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="absolute top-2.5 left-0 w-full h-0.5 bg-current rounded-full"
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                  }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="absolute top-5 left-0 w-full h-0.5 bg-current rounded-full"
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -8 },
                  }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-primary/80 backdrop-blur-md lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 z-50 w-80 h-full bg-gradient-to-br from-primary via-navy to-primary border-l border-white/10 backdrop-blur-xl lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <span className="text-xl font-bold text-white">Menu</span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-lavender"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-6">
                  <Navigation onLinkClick={handleLinkClick} isMobile={true} />
                </div>
                <div className="p-6 border-t border-white/10">
                  <p className="text-xs text-neutral-500 text-center">
                    Venture Universe © 2025
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Global Search Modal */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center pt-20 md:pt-32 bg-primary/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setShowSearch(false);
              setSearchQuery("");
            }}
          >
            <motion.div
              className="w-full max-w-3xl mx-4 max-h-[80vh] overflow-hidden flex flex-col"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search Input */}
              <div className="relative mb-4">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search for news, articles, launches... (Press Esc to close)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-lavender focus:border-transparent"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setShowSearch(false);
                    setSearchQuery("");
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search Results */}
              <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 overflow-y-auto flex-1">
                {isSearching ? (
                  <div className="p-8 text-center text-neutral-400">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-lavender"></div>
                    <p className="mt-4">Searching...</p>
                  </div>
                ) : debouncedQuery && debouncedQuery.length >= 2 ? (
                  totalResults > 0 ? (
                    <div className="p-4 space-y-6">
                      {/* News Results */}
                      {searchResults.news.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-3 px-2">
                            <Clock className="w-4 h-4 text-lavender" />
                            <h3 className="text-sm font-semibold text-white">News ({searchResults.news.length})</h3>
                          </div>
                          <div className="space-y-2">
                            {searchResults.news.map((item) => (
                              <Link
                                key={item.id}
                                href={`/news`}
                                onClick={() => {
                                  setShowSearch(false);
                                  setSearchQuery("");
                                }}
                                className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
                              >
                                <p className="text-sm font-medium text-white group-hover:text-lavender transition-colors line-clamp-1">
                                  {item.title}
                                </p>
                                <p className="text-xs text-neutral-400 mt-1 line-clamp-1">
                                  {item.source}
                                </p>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Launches Results */}
                      {searchResults.launches.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-3 px-2">
                            <Rocket className="w-4 h-4 text-lavender" />
                            <h3 className="text-sm font-semibold text-white">Launches ({searchResults.launches.length})</h3>
                          </div>
                          <div className="space-y-2">
                            {searchResults.launches.map((item) => (
                              <Link
                                key={item.id}
                                href={`/launches`}
                                onClick={() => {
                                  setShowSearch(false);
                                  setSearchQuery("");
                                }}
                                className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
                              >
                                <p className="text-sm font-medium text-white group-hover:text-lavender transition-colors line-clamp-1">
                                  {item.title}
                                </p>
                                {item.mission && (
                                  <p className="text-xs text-neutral-400 mt-1 line-clamp-1">
                                    {item.mission}
                                  </p>
                                )}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* View All Link */}
                      <div className="pt-4 border-t border-white/10">
                        <Link
                          href={`/news?q=${encodeURIComponent(debouncedQuery)}`}
                          onClick={() => {
                            setShowSearch(false);
                            setSearchQuery("");
                          }}
                          className="flex items-center justify-center gap-2 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium text-white"
                        >
                          View all results
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <Search className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
                      <p className="text-neutral-400">No results found for "{debouncedQuery}"</p>
                      <p className="text-sm text-neutral-500 mt-2">Try different keywords</p>
                    </div>
                  )
                ) : (
                  <div className="p-8 text-center text-neutral-500">
                    <p>Type at least 2 characters to search</p>
                    <p className="text-xs mt-2">Press Ctrl+K or Cmd+K to open search</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
