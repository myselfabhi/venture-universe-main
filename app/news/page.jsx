import Navbar from "../components/Navbar";
import News from "../../src/sections/News";
import Footer from "../../src/sections/Footer";

export const metadata = {
  title: "Latest Space News | Venture Universe",
  description: "Latest space news and discoveries from NASA APOD",
};

export default function NewsPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto max-w-7xl">
        <News />
        <Footer />
      </div>
    </>
  );
}
