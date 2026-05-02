"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import emailjs from "@emailjs/browser";
import {
  Send,
  MessageSquare,
  Sparkles,
  Mail,
  Users,
  CheckCircle2,
} from "lucide-react";
import Alert from "../components/Alert";
import { Particles } from "../components/Particles";
import CopyEmailButton from "../components/CopyEmailButton";
import Newsletter from "../components/Newsletter";
import { mySocials } from "../constants";
import { fadeUp, viewportOnce, staggerContainer } from "../lib/motion";

const TOPICS = [
  { id: "feedback", label: "Share feedback", icon: "💬" },
  { id: "writer", label: "Write for us", icon: "✍️" },
  { id: "partner", label: "Partner up", icon: "🤝" },
  { id: "other", label: "Just saying hi", icon: "👋" },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [topic, setTopic] = useState("feedback");
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const showAlertMessage = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
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
          message: `[${TOPICS.find((t) => t.id === topic)?.label}]\n\n${formData.message}`,
        },
        publicKey
      );
      setFormData({ name: "", email: "", message: "" });
      showAlertMessage("success", "Message launched! We'll respond within an orbit.");
    } catch (err) {
      showAlertMessage("danger", "Transmission failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const charCount = formData.message.length;
  const charLimit = 800;

  return (
    <section className="relative pt-28 pb-16">
      <Particles
        className="absolute inset-0 -z-10"
        quantity={70}
        ease={80}
        color={"#ffffff"}
        refresh
      />
      {showAlert && <Alert type={alertType} text={alertMessage} />}

      <div className="c-space">
        <motion.header
          className="mb-12 text-center md:text-left"
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full vu-glass text-xs uppercase tracking-widest text-aqua mb-4">
            <Sparkles className="w-3 h-3" />
            Open channel
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-3 leading-tight">
            Drop us a{" "}
            <span className="bg-gradient-to-br from-aqua via-lavender to-fuchsia bg-clip-text text-transparent">
              transmission
            </span>
          </h1>
          <p className="text-lg text-neutral-400 max-w-2xl">
            Feedback, story pitches, partnerships, or just a friendly hello — we read every message.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-12">
          {/* Form */}
          <motion.div
            className="lg:col-span-3 vu-card p-6 md:p-8"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-gradient-to-br from-royal/20 to-lavender/20">
                <MessageSquare className="w-5 h-5 text-lavender" />
              </div>
              <h2 className="text-2xl font-bold">Send a message</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-xs uppercase tracking-widest text-neutral-400 mb-2 block">
                  What's this about?
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {TOPICS.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTopic(t.id)}
                      className={`px-3 py-2.5 rounded-lg text-xs font-medium transition flex items-center gap-2 justify-center ${
                        topic === t.id
                          ? "bg-gradient-to-r from-royal to-lavender text-white shadow-lg shadow-lavender/30"
                          : "vu-glass text-neutral-300 hover:text-white"
                      }`}
                    >
                      <span>{t.icon}</span>
                      <span className="hidden sm:inline">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="text-xs uppercase tracking-widest text-neutral-400 mb-2 block">
                    Your name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Cmdr. Jane Doe"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/15 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-aqua/50 focus:border-aqua/50 transition"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-xs uppercase tracking-widest text-neutral-400 mb-2 block">
                    Reply-to
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@galaxy.io"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/15 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-aqua/50 focus:border-aqua/50 transition"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="message" className="text-xs uppercase tracking-widest text-neutral-400">
                    Your transmission
                  </label>
                  <span
                    className={`text-xs ${
                      charCount > charLimit ? "text-coral" : "text-neutral-500"
                    }`}
                  >
                    {charCount}/{charLimit}
                  </span>
                </div>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  maxLength={charLimit + 100}
                  placeholder="What's on your mind?"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/15 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-aqua/50 focus:border-aqua/50 transition resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || charCount > charLimit}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-royal to-lavender text-white font-semibold hover:scale-[1.01] hover:shadow-lg hover:shadow-lavender/40 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="block w-4 h-4 rounded-full border-2 border-white/30 border-t-white"
                    />
                    Launching…
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send transmission
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-4">
            <motion.div
              className="vu-card p-6"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
            >
              <Users className="w-7 h-7 text-aqua mb-3" />
              <h3 className="font-bold mb-2">Join the tribe</h3>
              <p className="text-sm text-neutral-400 mb-4">
                Follow along across the network.
              </p>
              <div className="flex flex-wrap gap-2">
                {mySocials.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="p-2.5 rounded-lg vu-glass hover:bg-white/15 transition hover:scale-110"
                  >
                    <img
                      src={s.icon.startsWith("/") ? s.icon : `/${s.icon}`}
                      className="w-4 h-4"
                      alt=""
                    />
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="vu-card p-6 relative overflow-hidden"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
            >
              <div className="absolute -right-12 -top-12 w-32 h-32 rounded-full bg-gradient-to-br from-fuchsia/20 to-lavender/20 blur-2xl pointer-events-none" />
              <Mail className="w-7 h-7 text-fuchsia mb-3 relative" />
              <h3 className="font-bold mb-2 relative">Want to contribute?</h3>
              <p className="text-sm text-neutral-400 mb-4 relative">
                We&apos;re looking for writers and collaborators who love the cosmos.
              </p>
              <div className="relative">
                <CopyEmailButton />
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
            >
              <Newsletter compact />
            </motion.div>
          </div>
        </div>

        <motion.div
          className="vu-card p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-mint" />
            <div>
              <p className="font-semibold">No spam, ever</p>
              <p className="text-sm text-neutral-400">
                We don&apos;t share your email. Unsubscribe in one click.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full vu-glass hover:bg-white/15 text-sm transition"
            >
              Latest news
            </Link>
            <Link
              href="/iss"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-royal to-lavender text-white text-sm font-medium transition hover:shadow-lg hover:shadow-lavender/30"
            >
              Track ISS live
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
