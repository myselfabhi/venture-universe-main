import Navbar from "./components/Navbar";
import Hero from "../src/sections/Hero";
import Footer from "../src/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto max-w-7xl">
        <Hero />
        <Footer />
      </div>
    </>
  );
}
