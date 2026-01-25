"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, ExternalLink, Sparkles, Share2, Maximize2, X, ChevronDown, ChevronUp } from "lucide-react";

const APODFeatured = () => {
  const [apodData, setApodData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const fetchAPOD = async () => {
      try {
        // Use internal API route with 24-hour caching
        const response = await fetch('/api/apod');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch APOD: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Only show if it's an image (APOD sometimes has videos)
        if (data.media_type === 'image') {
          setApodData({
            title: data.title,
            explanation: data.explanation,
            url: data.url,
            hdurl: data.hdurl || data.url,
            date: data.date,
            copyright: data.copyright || 'NASA',
          });
        } else {
          // If it's a video, skip showing it for now or handle differently
          setError('Today\'s APOD is a video. Check back tomorrow!');
        }
      } catch (err) {
        console.error("Error fetching APOD:", err);
        setError("Unable to load today's featured image. Check back later!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAPOD();
  }, []);

  if (isLoading) {
    return (
      <section className="c-space py-12 md:py-16">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-6 h-6 text-lavender" />
            <h2 className="text-heading">Today's Featured Image</h2>
          </div>
          <p className="text-neutral-400">Loading today's cosmic wonder...</p>
        </div>
      </section>
    );
  }

  if (error || !apodData) {
    return null; // Don't show section if error or no data
  }

  // Format date for display
  const formattedDate = new Date(apodData.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Handle share functionality
  const handleShare = async () => {
    const shareData = {
      title: apodData.title,
      text: apodData.explanation.slice(0, 200),
      url: apodData.hdurl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(apodData.hdurl);
        alert('Image URL copied to clipboard!');
      }
    } catch (err) {
      // AbortError is thrown when user cancels the share dialog - this is normal, not an error
      if (err.name === 'AbortError') {
        // User canceled the share - silently ignore
        return;
      }
      // Only log actual errors
      console.error('Error sharing:', err);
    }
  };

  // Truncate explanation for preview
  const explanationPreview = apodData.explanation.length > 200 
    ? apodData.explanation.slice(0, 200) + '...'
    : apodData.explanation;
  const needsExpansion = apodData.explanation.length > 200;

  return (
    <>
      <section className="c-space py-12 md:py-16">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-6 h-6 text-lavender" />
            <h2 className="text-heading">Today's Featured Image</h2>
          </div>
          <p className="text-neutral-400">NASA's Astronomy Picture of the Day</p>
        </div>

        <motion.div
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-storm to-indigo group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Split Layout: Image Left (60%), Content Right (40%) */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
            {/* Image Section - Left (60% on desktop) */}
            <div className="lg:col-span-3 relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden bg-gradient-to-br from-royal to-lavender">
              <img
                src={apodData.url}
                alt={apodData.title}
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110 cursor-pointer"
                loading="lazy"
                onClick={() => setIsFullscreen(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
              
              {/* Date Badge - Top Left */}
              <div className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 text-sm text-white rounded-full backdrop-blur-md bg-white/10 border border-white/20">
                <Calendar className="w-4 h-4" />
                <span>{formattedDate}</span>
              </div>

              {/* Copyright Badge - Top Right */}
              <div className="absolute top-4 right-4 px-4 py-2 text-xs text-white rounded-full backdrop-blur-md bg-white/10 border border-white/20">
                © {apodData.copyright}
              </div>

              {/* Fullscreen Button - Bottom Right */}
              <button
                onClick={() => setIsFullscreen(true)}
                className="absolute bottom-4 right-4 p-3 rounded-full backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300 hover:scale-110"
                aria-label="View fullscreen"
              >
                <Maximize2 className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Content Section - Right (40% on desktop) */}
            <div className="lg:col-span-2 flex flex-col p-6 md:p-8">
              {/* Title */}
              <h3 className="mb-4 text-2xl md:text-3xl font-bold text-white leading-tight">
                {apodData.title}
              </h3>
              
              {/* Expandable Explanation */}
              <div className="flex-1 mb-6">
                <div className="text-neutral-300 leading-relaxed">
                  <AnimatePresence mode="wait">
                    {isExpanded ? (
                      <motion.p
                        key="expanded"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {apodData.explanation}
                      </motion.p>
                    ) : (
                      <motion.p
                        key="collapsed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {explanationPreview}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
                
                {needsExpansion && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-3 flex items-center gap-2 text-sm text-lavender hover:text-white transition-colors"
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="w-4 h-4" />
                        Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" />
                        Show More
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <a
                  href={apodData.hdurl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 rounded-xl bg-gradient-to-r from-royal to-lavender hover:from-lavender hover:to-royal hover:scale-105 hover:shadow-lg hover:shadow-lavender/50"
                >
                  View High Resolution
                  <ExternalLink className="w-4 h-4" />
                </a>
                
                <div className="flex gap-3">
                  <a
                    href={`https://apod.nasa.gov/apod/ap${apodData.date.replace(/-/g, '').slice(2)}.html`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 rounded-xl border-2 border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 hover:scale-105 backdrop-blur-sm"
                  >
                    Full Explanation
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  
                  <button
                    onClick={handleShare}
                    className="px-6 py-3 text-sm font-semibold text-white transition-all duration-300 rounded-xl border-2 border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 hover:scale-105 backdrop-blur-sm"
                    aria-label="Share image"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-primary/95 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFullscreen(false)}
          >
            <motion.div
              className="relative max-w-7xl max-h-[90vh] mx-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={apodData.hdurl || apodData.url}
                alt={apodData.title}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
              />
              <button
                onClick={() => setIsFullscreen(false)}
                className="absolute top-4 right-4 p-3 rounded-full backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300"
                aria-label="Close fullscreen"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default APODFeatured;
