import NewsCard from "../components/NewsCard";
import { fetchApod, ApodData } from "../lib/api";

export default async function Home() {
  const newsItems: ApodData[] = await fetchApod(3); // Fetch 3 recent APOD entries

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Latest Space News - Venture Universe</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {newsItems.length > 0 ? (
          newsItems.map((item, index) => (
            <NewsCard
              key={index}
              title={item.title}
              description={item.explanation.slice(0, 150) + "..."}
              imageUrl={item.url}
            />
          ))
        ) : (
          <p>No space news available at the moment.</p>
        )}
      </div>
    </div>
  );
}