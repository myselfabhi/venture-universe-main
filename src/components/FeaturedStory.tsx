// src/components/FeaturedStory.tsx
import NewsCard from "./NewsCard";
import { ApodData } from "../lib/api";

export default function FeaturedStory({ featuredItem }: { featuredItem: ApodData }) {
  return (
    <section className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-vu-purple">Featured Story</h2>
      <NewsCard
        title={featuredItem.title}
        description={featuredItem.explanation.slice(0, 200) + "..."}
        imageUrl={featuredItem.url}
      />
    </section>
  );
}