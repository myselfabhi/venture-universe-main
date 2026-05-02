"use client";

const Skeleton = ({ className = "", rounded = "rounded-lg", style }) => (
  <div
    aria-hidden="true"
    className={`vu-shimmer ${rounded} ${className}`}
    style={style}
  />
);

export const SkeletonCard = () => (
  <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
    <Skeleton className="w-full h-48 mb-4" />
    <Skeleton className="h-5 w-3/4 mb-3" />
    <Skeleton className="h-4 w-1/2 mb-2" />
    <Skeleton className="h-4 w-2/3" />
  </div>
);

export const SkeletonGrid = ({ count = 6 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export default Skeleton;
