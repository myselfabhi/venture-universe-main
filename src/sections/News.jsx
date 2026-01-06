"use client";

import { useState, useEffect } from "react";
import NewsItem from "../components/Project";
import { nasaNews } from "../constants";
import { motion, useMotionValue, useSpring } from "motion/react";
import { Particles } from "../components/Particles";

const News = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 10, stiffness: 50 });
  const springY = useSpring(y, { damping: 10, stiffness: 50 });
  const [preview, setPreview] = useState(null);
  const [newsItems, setNewsItems] = useState(nasaNews); // Use mock data initially
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.spaceflightnewsapi.net/v4/articles/?limit=6&ordering=-published_at`
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
        } else {
          throw new Error("No articles with images found in API response");
        }
      } catch (err) {
        console.error("Error fetching space news:", err);
        setError(`Failed to load news: ${err.message}. Using fallback data.`);
        // Fallback to mock data if API fails
        setNewsItems(nasaNews);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, []);

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
      <h2 className="text-heading">Latest Space News</h2>
      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-12 h-[1px] w-full" />
      {isLoading && <p className="text-neutral-400">Loading news...</p>}
      {error && <p className="text-red-400">{error}</p>}
      {newsItems.map((news) => (
        <NewsItem key={news.id} {...news} setPreview={setPreview} />
      ))}
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