// "On this day in space" — keyed by MM-DD. Curated highlights.

export const onThisDay = {
  "01-31": { year: 1958, event: "Explorer 1, the first U.S. satellite, launched and discovered the Van Allen radiation belts." },
  "02-03": { year: 1966, event: "Luna 9 became the first spacecraft to soft-land on the Moon." },
  "02-20": { year: 1962, event: "John Glenn became the first American to orbit Earth aboard Friendship 7." },
  "03-16": { year: 1926, event: "Robert Goddard launched the world's first liquid-fueled rocket." },
  "04-12": { year: 1961, event: "Yuri Gagarin became the first human in space." },
  "05-05": { year: 1961, event: "Alan Shepard became the first American in space." },
  "05-25": { year: 1961, event: "JFK challenged the United States to land humans on the Moon by the decade's end." },
  "07-16": { year: 1969, event: "Apollo 11 lifted off, beginning the first crewed lunar landing mission." },
  "07-20": { year: 1969, event: "Neil Armstrong stepped onto the Moon — the first human on another world." },
  "07-23": { year: 1999, event: "Chandra X-ray Observatory was deployed by Space Shuttle Columbia." },
  "08-23": { year: 2023, event: "Chandrayaan-3 made India the first nation to soft-land near the Moon's south pole." },
  "09-05": { year: 1977, event: "Voyager 1 launched — still humanity's farthest spacecraft." },
  "10-04": { year: 1957, event: "Sputnik 1 launched, opening the Space Age." },
  "11-02": { year: 2000, event: "First crew arrived at the International Space Station, beginning continuous human presence in space." },
  "11-26": { year: 2011, event: "Curiosity rover launched toward Mars." },
  "12-21": { year: 1968, event: "Apollo 8 launched — first humans to leave low Earth orbit and orbit the Moon." },
  "12-25": { year: 2021, event: "James Webb Space Telescope launched on its journey to L2." },
};

export const getTodaysEvent = (date = new Date()) => {
  const key = `${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  return (
    onThisDay[key] || {
      year: 1957,
      event:
        "The space age began on October 4, 1957 — every day since has expanded humanity's reach.",
    }
  );
};
