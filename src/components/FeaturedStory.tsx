// src/components/FeaturedStory.tsx
import NewsCard from "./NewsCard";
import { ApodData } from "../lib/api";

export default function FeaturedStory({ featuredItem }: { featuredItem: ApodData }) {
  return (
    <section className="bg-vu-space text-vu-cyan">
      <h2 className="text-2xl font-bold mb-4 text-vu-purple text-center">Featured Story</h2>
      <div className="max-w-4xl mx-auto">
        <NewsCard
          title={featuredItem.title}
          description={featuredItem.explanation.slice(0, 200) + "..."}
          imageUrl={featuredItem.url}
        />
      </div>
    </section>
  );
}