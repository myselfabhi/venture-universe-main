import Navbar from "../components/Navbar";
import Articles from "../../src/sections/Articles";
import Footer from "../../src/sections/Footer";

export const metadata = {
  title: "Famous Space Articles | Venture Universe",
  description: "Articles from great space scientists and astronomers",
};

export default function ArticlesPage() {
  return (
    <div className="container mx-auto max-w-7xl">
      <Navbar />
      <Articles />
      <Footer />
    </div>
  );
}
