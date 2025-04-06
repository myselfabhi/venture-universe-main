import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";

export default function RecentArticles() {
  const articles = [
    {
      title: "The Future of Mars Exploration",
      description: "What’s next for the Red Planet as new missions are planned...",
      date: "April 05, 2025",
    },
    {
      title: "Black Holes Explained",
      description: "A dive into the mysteries of these cosmic phenomena...",
      date: "April 04, 2025",
    },
    {
      title: "Stellar Nurseries in Orion",
      description: "Discover the birthplaces of stars in the Orion Nebula...",
      date: "April 03, 2025",
    },
  ];

  return (
    <section className="bg-vu-space text-vu-cyan py-8">
      <h2 className="text-2xl font-bold mb-6 text-vu-purple text-center">Recent Articles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
        {articles.map((article, index) => (
          <Card
            key={index}
            className="bg-[#1a1a1a] border-vu-blue/20 hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader>
              <CardTitle className="text-vu-cyan text-lg md:text-xl font-semibold">
                {article.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <CardDescription className="text-gray-400 mb-2">
                {article.description}
              </CardDescription>
              <p className="text-xs text-gray-500">Published: {article.date}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}