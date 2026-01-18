import Navbar from "../components/Navbar";
import LaunchSchedule from "../../src/sections/LaunchSchedule";
import Footer from "../../src/sections/Footer";

export const metadata = {
  title: "Launch Schedule | Venture Universe",
  description: "Complete schedule of upcoming rocket launches and space missions",
};

export default function LaunchesPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto max-w-7xl">
        <LaunchSchedule />
        <Footer />
      </div>
    </>
  );
}
