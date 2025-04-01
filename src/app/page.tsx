import NewsCard from "../components/NewsCard";
import { fetchApod, ApodData } from "../lib/api";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

export default async function Home() {
  const newsItems: ApodData[] = await fetchApod(3); // Fetch 3 APOD entries
  const featuredItem = newsItems[0]; // First item as featured

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">Discover the Universe with Venture Universe</h1>
        <p className="text-lg md:text-xl mt-4">Your gateway to the latest space news and cosmic insights.</p>
        <Button className="mt-6" size="lg">Explore Now</Button>
      </section>

      {/* Featured News */}
      {featuredItem && (
        <section className="container mx-auto">
          <h2 className="text-2xl font-bold mb-4">Featured Story</h2>
          <NewsCard
            title={featuredItem.title}
            description={featuredItem.explanation.slice(0, 200) + "..."}
            imageUrl={featuredItem.url}
          />
        </section>
      )}

      {/* Latest News Grid */}
      <section className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4">Latest Space News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {newsItems.slice(1).map((item, index) => ( // Skip featured item
            <NewsCard
              key={index}
              title={item.title}
              description={item.explanation.slice(0, 150) + "..."}
              imageUrl={item.url}
            />
          ))}
        </div>
      </section>

      {/* Articles Teaser */}
      <section className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4">Recent Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border p-4 rounded">
            <h3 className="font-semibold">The Future of Mars Exploration</h3>
            <p className="text-gray-600">What’s next for the Red Planet...</p>
          </div>
          <div className="border p-4 rounded">
            <h3 className="font-semibold">Black Holes Explained</h3>
            <p className="text-gray-600">A dive into the mysteries...</p>
          </div>
        </div>
      </section>

      {/* Explore More */}
      <section className="container mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Explore More</h2>
        <div className="flex justify-center gap-4">
          <Button variant="outline">All News</Button>
          <Button variant="outline">All Articles</Button>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-gray-800 text-white py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Stay in Orbit with Venture Universe</h2>
        <div className="flex justify-center gap-4 max-w-md mx-auto">
          <Input placeholder="Enter your email" />
          <Button>Subscribe</Button>
        </div>
      </section>
    </div>
  );
}