// src/components/RecentArticles.tsx
export default function RecentArticles() {
    return (
      <section className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-vu-purple">Recent Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-vu-blue p-4 rounded">
            <h3 className="font-semibold text-vu-cyan">The Future of Mars Exploration</h3>
            <p className="text-gray-400">What’s next for the Red Planet...</p>
          </div>
          <div className="border border-vu-blue p-4 rounded">
            <h3 className="font-semibold text-vu-cyan">Black Holes Explained</h3>
            <p className="text-gray-400">A dive into the mysteries...</p>
          </div>
        </div>
      </section>
    );
  }