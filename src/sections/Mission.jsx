import { useRef } from "react";
import Card from "../components/Card";
import { Globe } from "../components/globe";
import CopyEmailButton from "../components/CopyEmailButton";
import { Mail } from "lucide-react";
import { OrbitingSpaceIcons } from "../components/OrbitingSpaceIcons";
import { mySocials } from "../constants";

const Mission = () => {
  const grid2Container = useRef();

  return (
    <section className="c-space section-spacing" id="about">
      <h2 className="text-heading">Our Mission</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-12">

        {/* Grid 1 – Hero Intro */}
        <div className="flex items-end grid-default-color grid-1">
          <img
            src="assets/image.jpg"
            className="absolute scale-[1.75] -right-[5rem] -top-[1rem] md:scale-[3] md:left-50 md:inset-y-10 lg:scale-[2.5]"
          />
          <div className="z-10">
            <p className="headtext">Welcome to Venture Universe</p>
            <p className="subtext">
              Explore, connect, and stay curious. We bring you the cosmos — news, discoveries, and a thriving space community.
            </p>
          </div>
          <div className="absolute inset-x-0 pointer-events-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-indigo" />
        </div>

        {/* Grid 2 – Space Brings Us Together */}
        <div className="rounded-2xl grid-2">
        <img
            src="assets/card-2.jpg"
            className="absolute   "
          />
          <div
            ref={grid2Container}
            className="flex items-center justify-center w-full h-full bg-[#0B0F2F]"
          >
            {[
                "Chandrayaan Missions",
  "Mangalyaan Legacy",
  "ISRO Innovations",
  "Rakesh Sharma’s Journey",
  "Gaganyaan Dreams",
  "PSLV Power",
  "Antrix Ambitions",
  "Indian Space Odyssey"
            ].map((text, index) => (
              <Card
                key={index}
                style={{
                  rotate: `${(index % 2 === 0 ? "" : "-")}${15 + index * 5}deg`,
                  top: `${(index * 10) % 80}%`,
                  left: `${(index * 12) % 80}%`
                }}
                text={text}
                containerRef={grid2Container}
              />
            ))}
          </div>
        </div>

        {/* Grid 3 – Global & Cosmic Community */}
        <div className="grid-black-color grid-3 relative">
          <div className="z-10 w-[50%]">
            <p className="headtext">From Earth to the Cosmos</p>
            <div className="subtext">
              Join our space tribe and explore together:
              <br />
              <div className="flex gap-3 mt-2">
                      {mySocials.map((social, index) => (
                        <a href={social.href} key={index}>
                          <img src={social.icon} className="w-5 h-5" alt={social.name} />
                        </a>
                      ))}
                    </div>
            </div>
          </div>
          <figure className="absolute left-[30%] top-[10%]">
            <Globe />
          </figure>
        </div>

        {/* Grid 4 – Writer/Collaborator Email */}
        <div className="grid-special-color grid-4">
          <div className="flex flex-col items-center justify-center gap-4 size-full text-center">
            <Mail className="w-8 h-8 text-white" />
            <p className="headtext">
              Want to contribute as a writer or collaborate to Empower the Young Minds?
            </p>
            <CopyEmailButton />
          </div>
        </div>

        {/* Grid 5 – ISRO and Indian Space Legacy */}

        <div className="grid-default-color grid-5">
          <div className="z-10 w-[50%] md:mt-13">
          <p className="headtext">Dr. A.P.J. Abdul Kalam</p>
<p className="subtext">
  👨‍🚀 Missile Man of India <br />
  🇮🇳 Architect of India’s Space <br />
  🚀 11th President & Youth Icon
</p>


          </div>
          <div className="absolute inset-y-0 md:inset-y-9 w-full h-full start-[50%] md:scale-125">
            <img
              src="assets/APJ.jpg"
              className="absolute scale-[1.75] -right-[2 rem] -top-[1rem] md:scale-[3] md:left-25 -z-10 md:inset-y-10 lg:scale-[1.5]"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Mission;
