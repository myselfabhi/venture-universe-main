import Navbar from "./components/Navbar";
import Hero from "../src/sections/Hero";
import QuickStatsBar from "../src/sections/QuickStatsBar";
import APODFeatured from "../src/sections/APODFeatured";
import UpcomingLaunches from "../src/sections/UpcomingLaunches";
import FeaturedNews from "../src/sections/FeaturedNews";
import QuickAccess from "../src/sections/QuickAccess";
import OnThisDay from "../src/sections/OnThisDay";
import Newsletter from "../src/components/Newsletter";
import FunFactTicker from "../src/components/FunFactTicker";
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
        <QuickStatsBar />
        <APODFeatured />
        <UpcomingLaunches />
        <OnThisDay />
        <FeaturedNews />
        <QuickAccess />
        <section className="c-space py-12">
          <Newsletter />
        </section>
        <Footer />
      </div>
    </>
  );
}
