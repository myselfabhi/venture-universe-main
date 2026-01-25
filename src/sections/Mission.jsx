"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import Card from "../components/Card";
import { Globe } from "../components/globe";
import CopyEmailButton from "../components/CopyEmailButton";
import { Mail, Rocket, Users, Target, Sparkles, ExternalLink } from "lucide-react";
import { mySocials } from "../constants";
import Link from "next/link";

const Mission = () => {
  const grid2Container = useRef();

  return (
    <section className="c-space section-spacing" id="mission">
      {/* Hero Section - Mission Statement */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-8 h-8 text-lavender" />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Our Mission
          </h2>
        </div>
        <p className="text-lg md:text-xl text-neutral-400 max-w-3xl leading-relaxed">
          Explore, connect, and stay curious. We bring you the cosmos — news, discoveries, 
          and a thriving space community dedicated to inspiring the next generation of space explorers.
        </p>
      </div>

      {/* Main Content - 2 Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        {/* Left Column - Welcome Card */}
        <motion.div
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-storm to-indigo border border-white/10 hover:border-lavender/50 transition-all duration-300 hover:shadow-xl hover:shadow-lavender/10 group"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative p-8 md:p-10 h-full flex flex-col">
            <div className="mb-6">
              <Rocket className="w-12 h-12 text-lavender mb-4" />
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Welcome to Venture Universe
              </h3>
              <p className="text-base md:text-lg text-neutral-300 leading-relaxed">
                Explore, connect, and stay curious. We bring you the cosmos — news, discoveries, 
                and a thriving space community.
              </p>
            </div>
            
            {/* Background Image - Subtle */}
            <div className="absolute bottom-0 right-0 w-64 h-64 opacity-10 pointer-events-none">
              <img
                src="/assets/image.jpg"
                alt=""
                className="object-cover w-full h-full rounded-tl-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Right Column - Space Community */}
        <motion.div
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0B0F2F] to-navy border border-white/10 hover:border-lavender/50 transition-all duration-300 hover:shadow-xl hover:shadow-lavender/10 group"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="relative p-8 md:p-10 h-full flex flex-col">
            <div className="mb-6">
              <Users className="w-12 h-12 text-lavender mb-4" />
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                From Earth to the Cosmos
              </h3>
              <p className="text-base md:text-lg text-neutral-300 leading-relaxed mb-4">
                Join our space tribe and explore together:
              </p>
              <div className="flex gap-4">
                {mySocials.map((social, index) => (
                  <a
                    href={social.href}
                    key={index}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110"
                  >
                    <img
                      src={social.icon.startsWith('/') ? social.icon : `/${social.icon}`}
                      className="w-6 h-6"
                      alt={social.name}
                    />
                  </a>
                ))}
              </div>
            </div>
            
            {/* Globe Component */}
            <div className="absolute bottom-0 right-0 w-48 h-48 opacity-20 pointer-events-none">
              <Globe />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Section Divider */}
      <div className="my-12 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Indian Space Legacy Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        {/* Left - Dr. Kalam Card */}
        <motion.div
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-storm to-indigo border border-white/10 hover:border-lavender/50 transition-all duration-300 hover:shadow-xl hover:shadow-lavender/10 group"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative p-8 md:p-10 h-full flex flex-col">
            <div className="mb-6 z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Dr. A.P.J. Abdul Kalam
              </h3>
              <div className="space-y-2 text-base text-neutral-300">
                <p>👨‍🚀 Missile Man of India</p>
                <p>🇮🇳 Architect of India's Space</p>
                <p>🚀 11th President & Youth Icon</p>
              </div>
            </div>
            
            {/* Background Image */}
            <div className="absolute bottom-0 right-0 w-64 h-64 opacity-20 pointer-events-none">
              <img
                src="/assets/APJ.jpg"
                alt="Dr. A.P.J. Abdul Kalam"
                className="object-cover w-full h-full rounded-tl-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Right - Space Topics Card */}
        <motion.div
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-royal to-lavender border border-white/10 hover:border-lavender/50 transition-all duration-300 hover:shadow-xl hover:shadow-lavender/10 group"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div
            ref={grid2Container}
            className="relative p-8 md:p-10 h-full min-h-[300px] flex items-center justify-center bg-[#0B0F2F]/50"
          >
            <div className="absolute inset-0 opacity-10">
              <img
                src="/assets/card-2.jpg"
                alt=""
                className="object-cover w-full h-full"
              />
            </div>
            
            <div className="relative z-10 text-center mb-4">
              <Target className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Space Brings Us Together
              </h3>
            </div>

            {/* Floating Cards */}
            {[
              "Chandrayaan Missions",
              "Mangalyaan Legacy",
              "ISRO Innovations",
              "Rakesh Sharma's Journey",
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
        </motion.div>
      </div>

      {/* Section Divider */}
      <div className="my-12 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Contribution Section */}
      <motion.div
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-lavender to-royal border border-white/10 hover:border-white/30 transition-all duration-300 hover:shadow-xl hover:shadow-lavender/20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="p-8 md:p-12 text-center">
          <Mail className="w-16 h-16 text-white mx-auto mb-6" />
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Want to Contribute?
          </h3>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join us as a writer or collaborator to empower young minds and share the wonders of space exploration.
          </p>
          <CopyEmailButton />
        </div>
      </motion.div>

      {/* CTA Section */}
      <div className="mt-12 flex flex-col sm:flex-row gap-4 items-center justify-between p-6 rounded-xl bg-gradient-to-br from-storm to-indigo border border-white/10">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Explore More</h3>
          <p className="text-neutral-400">Discover space news, launches, and articles</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 rounded-lg bg-gradient-to-r from-royal to-lavender hover:from-lavender hover:to-royal hover:scale-105 hover:shadow-lg hover:shadow-lavender/50"
          >
            View News
            <ExternalLink className="w-4 h-4" />
          </Link>
          <Link
            href="/isro"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 rounded-lg border-2 border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 hover:scale-105"
          >
            ISRO Odyssey
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Mission;
