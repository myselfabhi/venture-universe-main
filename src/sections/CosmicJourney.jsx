import { Timeline } from "../components/Timeline";
import { cosmicMilestones } from "../constants";
import { Particles } from "../components/Particles";

const CosmicJourney = () => {
  return (
    <section className="relative c-space section-spacing">
      {/* SVG Background */}
      <div
  className="absolute inset-0 -z-50 opacity-10 bg-center bg-no-repeat bg-contain"
  style={{
    backgroundImage: "url('/assets/ISRO.png')",
  }}
/>

      {/* Particle Effect */}
      <Particles
        className="absolute inset-0 -z-40"
        options={{
          particles: {
            number: { value: 100 },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            size: { value: 3, random: true },
            move: { enable: true, speed: 2, direction: "none", random: true },
            opacity: { value: 0.8, random: true },
          },
          interactivity: {
            events: { onHover: { enable: false }, onClick: { enable: false } },
          },
        }}
      />

      <div className="w-full mt-100">
        <h2 className="text-5xl">ISRO Odyssey</h2>
        <p className="text-neutral-400 ">
          From humble beginnings to lunar and interplanetary missions, witness ISRO’s historic milestones with Venture Universe.
        </p>

        <Timeline data={cosmicMilestones} />

        <a
          href="/news"
          className="inline-flex items-center gap-2 px-4 py-2 mt-8 text-white bg-radial from-lavender to-royal rounded-md hover-animation"
        >
          Explore Space News
          <img src="assets/arrow-right.svg" className="w-4" />
        </a>
      </div>
    </section>
  );
};

export default CosmicJourney;
