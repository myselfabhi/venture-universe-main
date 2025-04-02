// src/components/LatestNews.tsx
import NewsCard from "./NewsCard";
import { ApodData } from "../lib/api";

export default function LatestNews({ newsItems }: { newsItems: ApodData[] }) {
  return (
    <section className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-vu-purple">Latest Space News</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {newsItems.map((item, index) => (
          <NewsCard
            key={index}
            title={item.title}
            description={item.explanation.slice(0, 150) + "..."}
            imageUrl={item.url}
          />
        ))}
      </div>
    </section>
  );
}