import { motion } from "motion/react";
import { X } from "lucide-react";
import { Particles } from "../components/Particles";

const NewsDetails = ({
  title,
  description,
  subDescription,
  image,
  tags,
  href,
  closeModal,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        className="relative w-full max-w-3xl max-h-[90vh] rounded-2xl bg-primary/80 border border-white/10 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/assets/nebula-background.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        {/* SVG Background */}
        <div
          className="absolute inset-0 -z-50"
          style={{
            backgroundImage: "url('/assets/space-background.svg')",
            backgroundRepeat: "repeat",
            backgroundSize: "200px 200px",
            opacity: 0.3,
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
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-white hover:text-neutral-300 z-10"
        >
          <X className="w-6 h-6" />
        </button>
        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[90vh] p-8">
          <img
            src={image}
            alt={title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          <h3 className="text-3xl font-bold text-white mb-4">{title}</h3>
          <p className="text-neutral-300 mb-4">{description}</p>
          <div className="flex flex-col gap-2 mb-4">
            {subDescription.map((item, index) => (
              <p key={index} className="text-neutral-400 text-sm">
                {item}
              </p>
            ))}
          </div>
          <div className="flex gap-4 mb-6">
            {tags.map((tag) => (
              <span key={tag.id} className="text-sand text-sm">
                {tag.name}
              </span>
            ))}
          </div>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-white bg-radial from-lavender to-royal rounded-md hover-animation"
          >
            View on NASA APOD
            <img src="assets/arrow-right.svg" className="w-4" />
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default NewsDetails;