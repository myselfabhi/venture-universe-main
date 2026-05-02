import Navbar from "./components/Navbar";
import Hero from "../src/sections/Hero";
import APODFeatured from "../src/sections/APODFeatured";
import UpcomingLaunches from "../src/sections/UpcomingLaunches";
import FeaturedNews from "../src/sections/FeaturedNews";
import OnThisDay from "../src/sections/OnThisDay";
import CosmicDashboard from "../src/sections/CosmicDashboard";
import CosmicCompass from "../src/sections/CosmicCompass";
import Newsletter from "../src/components/Newsletter";
import FunFactTicker from "../src/components/FunFactTicker";
import SectionDivider from "../src/components/SectionDivider";
import Footer from "../src/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto max-w-7xl">
        <Hero />
      </div>
      <FunFactTicker />
      <div className="container mx-auto max-w-7xl">
        <APODFeatured />
        <SectionDivider />
        <UpcomingLaunches />
        <OnThisDay />
        <CosmicDashboard />
        <SectionDivider />
        <FeaturedNews />
        <CosmicCompass />
        <section className="c-space py-12">
          <Newsletter />
        </section>
        <Footer />
      </div>
    </>
  );
}
