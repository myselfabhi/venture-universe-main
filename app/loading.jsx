import OrbitLoader from "../src/components/loaders/OrbitLoader";

export default function Loading() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-primary">
      <OrbitLoader label="Tuning into the cosmos…" />
    </main>
  );
}
