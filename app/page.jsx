import Navbar from "./components/Navbar";
import Hero from "../src/sections/Hero";
import Mission from "../src/sections/Mission";
import Footer from "../src/sections/Footer";

export default function Home() {
  return (
    <div className="container mx-auto max-w-7xl">
      <Navbar />
      <Hero />
      <Mission />
      <Footer />
    </div>
  );
}
