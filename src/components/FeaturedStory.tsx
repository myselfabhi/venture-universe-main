import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ApodData } from "../lib/api";

export default function FeaturedStory({ featuredItem }: { featuredItem: ApodData }) {
  return (
    <section className="bg-vu-space text-vu-cyan py-8">
      <h2 className="text-2xl font-bold mb-6 text-vu-purple text-center">Featured Story</h2>
      <div className="max-w-4xl mx-auto">
        <Card className="bg-vu-space/50 border-vu-blue/20 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl text-white">{featuredItem.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-vu-cyan mb-4">
              {featuredItem.explanation.slice(0, 200) + "..."}
            </CardDescription>
            {featuredItem.url && (
              <img
                src={featuredItem.url}
                alt={featuredItem.title}
                className="w-full h-64 object-cover rounded-md mb-4"
              />
            )}
            <Button
              className="bg-vu-blue text-vu-space hover:bg-vu-cyan hover:text-vu-space"
              asChild
            >
              <a href={featuredItem.url} target="_blank" rel="noopener noreferrer">
                Read More
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}