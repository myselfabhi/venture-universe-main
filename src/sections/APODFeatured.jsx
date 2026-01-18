"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Calendar, ExternalLink, Sparkles } from "lucide-react";

const APODFeatured = () => {
  const [apodData, setApodData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAPOD = async () => {
      try {
        // NASA APOD API - works without API key for demo purposes
        // For production, you'd use: `https://api.nasa.gov/planetary/apod?api_key=YOUR_KEY`
        const response = await fetch(
          `https://api.nasa.gov/planetary/apod?api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY || 'DEMO_KEY'}`
        );
        
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
      <section className="c-space section-spacing">
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

  // Truncate explanation for preview
  const shortExplanation = apodData.explanation.length > 200 
    ? apodData.explanation.slice(0, 200) + '...'
    : apodData.explanation;

  return (
    <section className="c-space section-spacing">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-6 h-6 text-lavender" />
          <h2 className="text-heading">Today's Featured Image</h2>
        </div>
        <p className="text-neutral-400">NASA's Astronomy Picture of the Day</p>
      </div>

      <motion.div
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-storm to-indigo group hover-animation"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Image Container */}
        <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
          <img
            src={apodData.url}
            alt={apodData.title}
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
          
          {/* Date Badge */}
          <div className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 text-sm text-white rounded-full backdrop-blur-md bg-white/10">
            <Calendar className="w-4 h-4" />
            <span>{formattedDate}</span>
          </div>

          {/* Copyright Badge */}
          <div className="absolute top-4 right-4 px-4 py-2 text-xs text-white rounded-full backdrop-blur-md bg-white/10">
            © {apodData.copyright}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 md:p-8">
          <h3 className="mb-3 text-2xl font-bold text-white md:text-3xl">
            {apodData.title}
          </h3>
          
          <p className="mb-6 text-neutral-300 leading-relaxed">
            {shortExplanation}
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href={apodData.hdurl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white transition-colors rounded-lg bg-gradient-to-r from-royal to-lavender hover:from-lavender hover:to-royal hover-animation"
            >
              View High Resolution
              <ExternalLink className="w-4 h-4" />
            </a>
            
            <a
              href={`https://apod.nasa.gov/apod/ap${apodData.date.replace(/-/g, '').slice(2)}.html`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white transition-colors rounded-lg bg-white/10 hover:bg-white/20 hover-animation"
            >
              Read Full Explanation
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default APODFeatured;
