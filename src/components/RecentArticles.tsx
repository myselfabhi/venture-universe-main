// src/components/RecentArticles.tsx
export default function RecentArticles() {
    return (
      <section className="bg-vu-space text-vu-cyan">
        <h2 className="text-2xl font-bold mb-4 text-vu-purple text-center">Recent Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="border border-vu-blue p-4 rounded bg-[#1a1a1a]">
            <h3 className="font-semibold text-vu-cyan">The Future of Mars Exploration</h3>
            <p className="text-gray-400">What’s next for the Red Planet...</p>
          </div>
          <div className="border border-vu-blue p-4 rounded bg-[#1a1a1a]">
            <h3 className="font-semibold text-vu-cyan">Black Holes Explained</h3>
            <p className="text-gray-400">A dive into the mysteries...</p>
          </div>
        </div>
      </section>
    );
  }