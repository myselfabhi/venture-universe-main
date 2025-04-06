import { Button } from "./ui/button";

export default function Hero() {
  return (
    <section
      className="relative bg-black text-vu-cyan py-20 min-h-[80vh] flex items-center justify-center overflow-hidden"
    >
      {/* Content */}
      <div className="relative z-10 px-4 md:px-8 text-center max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
          Discover the Universe with <span className="text-vu-cyan">Venture Universe</span>
        </h1>
        <p className="text-lg md:text-2xl mb-6 text-vu-cyan">
          Your gateway to the latest space news and cosmic insights.
        </p>
        <Button
          className="bg-vu-blue text-vu-space hover:bg-vu-cyan hover:text-vu-space hover:scale-105 transition-all duration-300"
          size="lg"
        >
          Explore Now
        </Button>
      </div>

      {/* Ambient glow for space vibe */}
      <div className="absolute w-[500px] h-[500px] bg-vu-cyan opacity-20 rounded-full blur-3xl top-[-100px] left-[-100px] z-0" />
      <div className="absolute w-[400px] h-[400px] bg-vu-blue opacity-20 rounded-full blur-3xl bottom-[-100px] right-[-100px] z-0" />
    </section>
  );
}
