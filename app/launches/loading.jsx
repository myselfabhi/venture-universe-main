import RocketLoader from "../../src/components/loaders/RocketLoader";

export default function Loading() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-primary pt-28">
      <RocketLoader label="Locking onto launch windows…" />
    </main>
  );
}
