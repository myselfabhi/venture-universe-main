import Navbar from "../components/Navbar";
import Mission from "../../src/sections/Mission";
import Footer from "../../src/sections/Footer";

export const metadata = {
  title: "Our Mission | Venture Universe",
  description: "Explore our mission to bring you the cosmos — news, discoveries, and a thriving space community",
};

export default function MissionsPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto max-w-7xl">
        <Mission />
        <Footer />
      </div>
    </>
  );
}
