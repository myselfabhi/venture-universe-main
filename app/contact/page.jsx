import Navbar from "../components/Navbar";
import Contact from "../../src/sections/Contact";
import Footer from "../../src/sections/Footer";

export const metadata = {
  title: "Contact Us | Venture Universe",
  description: "Get in touch with Venture Universe",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-7xl">
      <Navbar />
      <Contact />
      <Footer />
    </div>
  );
}
