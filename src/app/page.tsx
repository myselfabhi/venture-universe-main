// src/app/page.tsx
import Hero from "../components/Hero";
import FeaturedStory from "../components/FeaturedStory";
import LatestNews from "../components/LatestNews";
import RecentArticles from "../components/RecentArticles";
import ExploreMore from "../components/ExploreMore";
import Newsletter from "../components/Newsletter";
import { fetchApod, ApodData } from "../lib/api";

export default async function Home() {
  let newsItems: ApodData[] = [];
  let featuredItem: ApodData | null = null;

  try {
    newsItems = await fetchApod(3); // Fetch 3 APOD entries
    featuredItem = newsItems[0] || null; // First item as featured
  } catch (error) {
    console.error("Failed to fetch APOD data in Home:", error);
    newsItems = [];
    featuredItem = null;
  }

  return (
    <div className="space-y-12">
      <Hero backgroundImage={featuredItem?.url} />
      {featuredItem ? (
        <FeaturedStory featuredItem={featuredItem} />
      ) : (
        <section className="bg-vu-space text-vu-cyan text-center">
          <h2 className="text-2xl font-bold mb-4 text-vu-purple">Featured Story</h2>
          <p className="text-vu-cyan">Unable to load featured story. Please try again later.</p>
        </section>
      )}
      {newsItems.length > 1 ? (
        <LatestNews newsItems={newsItems.slice(1)} />
      ) : (
        <section className="bg-vu-space text-vu-cyan text-center">
          <h2 className="text-2xl font-bold mb-4 text-vu-purple">Latest Space News</h2>
          <p className="text-vu-cyan">Unable to load latest news. Please try again later.</p>
        </section>
      )}
      <RecentArticles />
      <ExploreMore />
      <Newsletter />
    </div>
  );
}