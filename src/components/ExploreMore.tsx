// src/components/ExploreMore.tsx
import { Button } from "./ui/button";

export default function ExploreMore() {
  return (
    <section className="container mx-auto text-center">
      <h2 className="text-2xl font-bold mb-4 text-vu-purple">Explore More</h2>
      <div className="flex justify-center gap-4">
        <Button variant="outline" className="border-vu-blue text-vu-cyan hover:bg-vu-blue hover:text-vu-space">
          All News
        </Button>
        <Button variant="outline" className="border-vu-blue text-vu-cyan hover:bg-vu-blue hover:text-vu-space">
          All Articles
        </Button>
      </div>
    </section>
  );
}