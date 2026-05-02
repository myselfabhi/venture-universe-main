import { SkeletonGrid } from "../../src/components/loaders";

export default function Loading() {
  return (
    <main className="container mx-auto max-w-7xl c-space pt-28 pb-16 min-h-screen">
      <div className="vu-shimmer h-12 w-64 rounded-lg mb-3" />
      <div className="vu-shimmer h-5 w-96 rounded-lg mb-10" />
      <SkeletonGrid count={6} />
    </main>
  );
}
