import React from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import News from "./sections/News";
import Testimonial from "./sections/Testimonial";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import Mission from "./sections/Mission";
import CosmicJourney from "./sections/CosmicJourney";

const App = () => {
  return (
    <div className="container mx-auto max-w-7xl">
      <Navbar />
      <Hero />
      <Mission />
      <News />
      <CosmicJourney />
      <Testimonial />
      <Contact />
      <Footer/>
    </div>
  );
};

export default App;
