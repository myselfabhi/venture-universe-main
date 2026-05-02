// Lightweight astronomy math — no external libs.
// Adequate for "tonight at a glance"; not a science-grade ephemeris.

const J2000 = 2451545.0;

const toJulian = (date) => date.getTime() / 86400000 + 2440587.5;

const daysSinceJ2000 = (date) => toJulian(date) - J2000;

// Moon phase 0..1 (0 = new, 0.5 = full)
export const moonPhase = (date = new Date()) => {
  const days = daysSinceJ2000(date);
  const cycles = days / 29.530588853;
  return cycles - Math.floor(cycles);
};

export const moonPhaseName = (phase) => {
  if (phase < 0.03 || phase > 0.97) return "New Moon";
  if (phase < 0.22) return "Waxing Crescent";
  if (phase < 0.28) return "First Quarter";
  if (phase < 0.47) return "Waxing Gibbous";
  if (phase < 0.53) return "Full Moon";
  if (phase < 0.72) return "Waning Gibbous";
  if (phase < 0.78) return "Last Quarter";
  return "Waning Crescent";
};

export const moonIllumination = (phase) => {
  return Math.round((1 - Math.cos(phase * 2 * Math.PI)) * 50);
};

// Approximate sunrise/sunset using NOAA algorithm (simplified)
export const sunTimes = (date, lat, lng) => {
  const rad = Math.PI / 180;
  const dayOfYear = Math.floor(
    (date - new Date(date.getFullYear(), 0, 0)) / 86400000
  );
  // Solar declination (approx)
  const decl = 23.44 * Math.cos(rad * ((360 / 365) * (dayOfYear + 10)));
  const latRad = lat * rad;
  const declRad = decl * rad;

  const cosH = -Math.tan(latRad) * Math.tan(declRad);
  if (cosH > 1) return { sunrise: null, sunset: null, polar: "night" };
  if (cosH < -1) return { sunrise: null, sunset: null, polar: "day" };

  const H = (Math.acos(cosH) * 180) / Math.PI / 15;
  const solarNoon = 12 - lng / 15;
  const sunrise = solarNoon - H;
  const sunset = solarNoon + H;

  const fmt = (h) => {
    const hours = Math.floor(((h % 24) + 24) % 24);
    const mins = Math.floor((h - Math.floor(h)) * 60);
    const adj = ((mins + 60) % 60).toString().padStart(2, "0");
    return `${hours.toString().padStart(2, "0")}:${adj}`;
  };

  return { sunrise: fmt(sunrise), sunset: fmt(sunset) };
};

// Visible naked-eye planets — static curated list (educational guide only)
export const visiblePlanets = (date = new Date()) => {
  // Approximate visibility windows that update through the year
  const month = date.getMonth();
  return [
    {
      name: "Venus",
      visibility: month % 2 === 0 ? "Evening sky, shortly after sunset" : "Morning sky before sunrise",
      magnitude: -4.0,
      color: "from-orange to-coral",
    },
    {
      name: "Mars",
      visibility: "Visible most of the night",
      magnitude: 0.5,
      color: "from-coral to-fuchsia",
    },
    {
      name: "Jupiter",
      visibility: "Bright in the eastern sky after dusk",
      magnitude: -2.4,
      color: "from-sand to-orange",
    },
    {
      name: "Saturn",
      visibility: "Best in the late evening — look for the rings",
      magnitude: 0.8,
      color: "from-sand to-mint",
    },
  ];
};
