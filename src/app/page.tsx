// src/app/page.tsx
import Hero from "../components/Hero";
import FeaturedStory from "../components/FeaturedStory";
import LatestNews from "../components/LatestNews";
import RecentArticles from "../components/RecentArticles";
import ExploreMore from "../components/ExploreMore";
import Newsletter from "../components/Newsletter";
import { fetchApod, ApodData } from "../lib/api";

export default async function Home() {
  const newsItems: ApodData[] = await fetchApod(3); // Fetch 3 APOD entries
  const featuredItem = newsItems[0]; // First item as featured

  return (
    <div className="space-y-12">
      <Hero backgroundImage={featuredItem?.url} />
      {featuredItem && (
        <div className="container mx-auto p-4">
          <FeaturedStory featuredItem={featuredItem} />
        </div>
      )}
      <div className="container mx-auto p-4">
        <LatestNews newsItems={newsItems.slice(1)} />
      </div>
      <div className="container mx-auto p-4">
        <RecentArticles />
      </div>
      <div className="container mx-auto p-4">
        <ExploreMore />
      </div>
      <Newsletter />
    </div>
  );
}