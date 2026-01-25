"use client";

import { useState, useRef } from "react";
import { motion } from "motion/react";
import emailjs from "@emailjs/browser";
import Alert from "../components/Alert";
import { Particles } from "../components/Particles";
import Card from "../components/Card";
import { Globe } from "../components/globe";
import CopyEmailButton from "../components/CopyEmailButton";
import { 
  Mail, 
  Rocket, 
  Users, 
  Sparkles, 
  ExternalLink,
  Send,
  MessageSquare
} from "lucide-react";
import { mySocials } from "../constants";
import Link from "next/link";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const grid2Container = useRef();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showAlertMessage = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Form submitted:", formData);
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_6vnam7b";
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_lyp52jw";
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "pn-Bw_mS1_QQdofuV";
      
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          to_name: "Venture Universe",
          from_email: formData.email,
          to_email: "venture.universe.yt@gmail.com",
          message: formData.message,
        },
        publicKey
      );
      setIsLoading(false);
      setFormData({ name: "", email: "", message: "" });
      showAlertMessage("success", "Your message has been sent!");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      showAlertMessage("danger", "Something went wrong!");
    }
  };

  return (
    <section className="relative c-space section-spacing" id="contact">
      <Particles
        className="absolute inset-0 -z-50"
        quantity={100}
        ease={80}
        color={"#ffffff"}
        refresh
      />
      {showAlert && <Alert type={alertType} text={alertMessage} />}

      {/* Hero Section - Mission Statement */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-8 h-8 text-lavender" />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Let's Connect
          </h2>
        </div>
        <p className="text-lg md:text-xl text-neutral-400 max-w-3xl leading-relaxed">
          Explore, connect, and stay curious. Whether you're aiming to launch a stellar website, 
          enhance your digital orbit, or bring a cosmic idea to life, Venture Universe is here to elevate your mission.
        </p>
      </motion.div>

      {/* Main Content - Form + Community Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-12">
        {/* Left Column - Contact Form (60%) */}
        <motion.div
          className="lg:col-span-3"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-storm to-indigo border border-white/10 hover:border-lavender/50 transition-all duration-300 p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="w-8 h-8 text-lavender" />
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                Send us a Message
              </h3>
            </div>
            <form className="w-full" onSubmit={handleSubmit}>
              <div className="mb-5">
                <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-neutral-500 focus:outline-none focus:border-lavender/50 focus:ring-2 focus:ring-lavender/20 transition-all duration-300"
                  placeholder="Your name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-5">
                <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-neutral-500 focus:outline-none focus:border-lavender/50 focus:ring-2 focus:ring-lavender/20 transition-all duration-300"
                  placeholder="@email.com"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-5">
                <label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-neutral-500 focus:outline-none focus:border-lavender/50 focus:ring-2 focus:ring-lavender/20 transition-all duration-300 resize-none"
                  placeholder="Share your thoughts..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-3 text-lg font-semibold text-white rounded-lg bg-gradient-to-r from-royal to-lavender hover:from-lavender hover:to-royal transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-lavender/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {!isLoading ? (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                ) : (
                  "Sending..."
                )}
              </button>
            </form>
          </div>
        </motion.div>

        {/* Right Column - Community & Contribution Cards (40%) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Community Card */}
          <motion.div
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0B0F2F] to-navy border border-white/10 hover:border-lavender/50 transition-all duration-300 hover:shadow-xl hover:shadow-lavender/10"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="relative p-6 md:p-8 h-full flex flex-col">
              <Users className="w-10 h-10 text-lavender mb-4" />
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                Join Our Space Tribe
              </h3>
              <p className="text-sm md:text-base text-neutral-300 mb-4">
                Connect with us across the cosmos:
              </p>
              <div className="flex flex-wrap gap-3">
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
                      className="w-5 h-5"
                      alt={social.name}
                    />
                  </a>
                ))}
              </div>
              <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10 pointer-events-none">
                <Globe />
              </div>
            </div>
          </motion.div>

          {/* Contribution Card */}
          <motion.div
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-lavender to-royal border border-white/10 hover:border-white/30 transition-all duration-300 hover:shadow-xl hover:shadow-lavender/20"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative p-6 md:p-8 text-center">
              <Mail className="w-10 h-10 text-white mx-auto mb-4" />
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                Want to Contribute?
              </h3>
              <p className="text-sm md:text-base text-white/90 mb-4">
                Join us as a writer or collaborator to empower young minds.
              </p>
              <CopyEmailButton />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Section Divider */}
      <div className="my-12 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Indian Space Legacy Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        {/* Left - Dr. Kalam Card */}
        <motion.div
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-storm to-indigo border border-white/10 hover:border-lavender/50 transition-all duration-300 hover:shadow-xl hover:shadow-lavender/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="relative p-8 md:p-10 h-full flex flex-col">
            <div className="mb-6 z-10">
              <Rocket className="w-12 h-12 text-lavender mb-4" />
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Dr. A.P.J. Abdul Kalam
              </h3>
              <div className="space-y-2 text-base text-neutral-300">
                <p>👨‍🚀 Missile Man of India</p>
                <p>🇮🇳 Architect of India's Space</p>
                <p>🚀 11th President & Youth Icon</p>
              </div>
            </div>
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
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-royal to-lavender border border-white/10 hover:border-lavender/50 transition-all duration-300 hover:shadow-xl hover:shadow-lavender/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
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
            {[
              "Dr. A.P.J. Abdul Kalam",
              "Rakesh Sharma",
              "Kalpana Chawla",
              "Neil Armstrong",
              "Buzz Aldrin",
              "Yuri Gagarin",
              "Valentina Tereshkova",
              "Sally Ride",
              "Vikram Sarabhai",
              "Satish Dhawan",
              "K. Radhakrishnan",
              "K. Sivan"
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

      {/* CTA Section */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 items-center justify-between p-6 rounded-xl bg-gradient-to-br from-storm to-indigo border border-white/10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
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
      </motion.div>
    </section>
  );
};

export default Contact;
