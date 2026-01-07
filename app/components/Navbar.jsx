"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";

function Navigation() {
  return (
    <ul className="nav-ul">
      <li className="nav-li">
        <Link className="nav-link" href="/">
          Home
        </Link>
      </li>
      <li className="nav-li">
        <Link className="nav-link" href="/isro">
          ISRO
        </Link>
      </li>
      <li className="nav-li">
        <Link className="nav-link" href="/#mission">
          Missions
        </Link>
      </li>
      <li className="nav-li">
        <Link className="nav-link" href="/news">
          News
        </Link>
      </li>
      <li className="nav-li">
        <Link className="nav-link" href="/articles">
          Articles
        </Link>
      </li>
      <li className="nav-li">
        <Link className="nav-link" href="/contact">
          Contact
        </Link>
      </li>
    </ul>
  );
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="fixed top-0 inset-x-0 z-50 w-full backdrop-blur-lg bg-primary/40">
      <div className="mx-auto c-space max-w-7xl">
        <div className="flex items-center justify-between py-2 sm:py-0">
          <Link
            href="/"
            className="text-xl font-bold transition-colors text-neutral-400 hover:text-white"
          >
            Venture Universe
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex cursor-pointer text-neutral-400 hover:text-white focus:outline-none sm:hidden"
          >
            {isOpen ? (
              <img
                src="/assets/close.svg"
                className="w-6 h-6"
                alt="close"
              />
            ) : (
              <img
                src="/assets/menu.svg"
                className="w-6 h-6"
                alt="menu"
              />
            )}
          </button>
          <nav className="hidden sm:flex">
            <Navigation />
          </nav>
        </div>
      </div>
      {isOpen && (
        <motion.div
          className="block overflow-hidden text-center sm:hidden"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ maxHeight: "100vh" }}
          transition={{ duration: 1 }}
        >
          <nav className="pb-5">
            <Navigation />
          </nav>
        </motion.div>
      )}
    </div>
  );
};

export default Navbar;
