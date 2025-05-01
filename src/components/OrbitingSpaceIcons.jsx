import { OrbitingCircles } from "./OrbitingCircles";

export function OrbitingSpaceIcons() {
  const spaceIcons = [
    "telescope",
    "rocket",
    "satellite",
    "moon",
    "planet",
    "astronaut",
    "galaxy",
    "comet",
    "mars",
    "ufo",
    "meteor",
    "star",
    "earth",
    "venus",
    "spaceship",
    "solar-system",
  ];

  return (
    <div className="relative flex h-[15rem] w-full flex-col items-center justify-center">
      <OrbitingCircles iconSize={40}>
        {spaceIcons.map((icon, index) => (
          <Icon key={index} src={`assets/space-icons/${icon}.svg`} />
        ))}
      </OrbitingCircles>
      <OrbitingCircles iconSize={25} radius={100} reverse speed={2}>
        {[...spaceIcons].reverse().map((icon, index) => (
          <Icon key={index} src={`assets/space-icons/${icon}.svg`} />
        ))}
      </OrbitingCircles>
    </div>
  );
}

const Icon = ({ src }) => (
  <img src={src} className="duration-200 rounded-sm hover:scale-110" />
);
