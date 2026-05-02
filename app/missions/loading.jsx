import { SkeletonGrid, OrbitLoader } from "../../src/components/loaders";

export default function Loading() {
  return (
    <main className="container mx-auto max-w-7xl c-space pt-28 pb-16 min-h-screen">
      <OrbitLoader label="Plotting trajectories…" />
      <div className="mt-10">
        <SkeletonGrid count={6} />
      </div>
    </main>
  );
}
