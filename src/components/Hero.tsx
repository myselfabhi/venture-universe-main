import { Button } from "./ui/button";

export default function Hero({ backgroundImage }: { backgroundImage?: string }) {
  return (
    <section
      className="relative bg-vu-space text-vu-cyan py-16 starry-background min-h-[70vh] flex items-center justify-center"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Content */}
      <div className="relative z-10 px-4 md:px-8 animate-fadeIn text-center max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-[0_0_10px_rgba(0,253,252,0.8)]">
          Discover the Universe with Venture Universe
        </h1>
        <p className="text-lg md:text-2xl mb-6 text-vu-cyan drop-shadow-[0_0_5px_rgba(0,253,252,0.5)]">
          Your gateway to the latest space news and cosmic insights.
        </p>
        <Button
          className="bg-vu-blue text-vu-space hover:bg-vu-cyan hover:text-vu-space hover:scale-105 transition-all duration-300 drop-shadow-[0_0_10px_rgba(0,253,252,0.8)]"
          size="lg"
        >
          Explore Now
        </Button>
      </div>
    </section>
  );
}