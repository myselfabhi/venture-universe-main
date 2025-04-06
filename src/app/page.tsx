import Header from "../components/Header";
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
    newsItems = await fetchApod(3); 
    featuredItem = newsItems[0] || null; 
  } catch (error) {
    console.error("Failed to fetch APOD data in Home:", error);
    newsItems = [];
    featuredItem = null;
  }

  return (
    <>
      <Header />
      <div className="space-y-12 pt-16 mx-auto max-w-full"> 
        <Hero />
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
    </>
  );
}