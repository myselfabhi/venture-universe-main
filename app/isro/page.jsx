import Navbar from "../components/Navbar";
import CosmicJourney from "../../src/sections/CosmicJourney";
import Footer from "../../src/sections/Footer";

export const metadata = {
  title: "ISRO Odyssey | Venture Universe",
  description: "Explore ISRO's historic milestones from Aryabhata to Chandrayaan-3",
};

export default function ISROPage() {
  return (
    <div className="container mx-auto max-w-7xl">
      <Navbar />
      <CosmicJourney />
      <Footer />
    </div>
  );
}
