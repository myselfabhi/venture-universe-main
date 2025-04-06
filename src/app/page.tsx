import Header from "../components/Header";
import Hero from "../components/Hero";
import RecentArticles from "../components/RecentArticles";
import ExploreMore from "../components/ExploreMore";
import Newsletter from "../components/Newsletter";
import { fetchApod, ApodData } from "../lib/api";
import SpaceNews from "@/components/SpaceNews";

export default async function Home() {
  let newsItems: ApodData[] = [];
  let featuredItem: ApodData | null = null;

  try {
    newsItems = await fetchApod(10); // Fetch 10 to ensure enough for 1 featured + 7-9 latest
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
        {newsItems.length > 0 ? (
          <SpaceNews newsItems={newsItems} />
        ) : (
          <section className="bg-vu-space text-vu-cyan text-center">
            <h2 className="text-2xl font-bold mb-4 text-vu-purple">Space News</h2>
            <p className="text-vu-cyan">Unable to load space news. Please try again later.</p>
          </section>
        )}
        <RecentArticles />
        <ExploreMore />
        <Newsletter />
      </div>
    </>
  );
}