import StarfieldLoader from "../../src/components/loaders/StarfieldLoader";

export default function Loading() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-primary pt-28">
      <StarfieldLoader label="Charting tonight's sky…" />
    </main>
  );
}
