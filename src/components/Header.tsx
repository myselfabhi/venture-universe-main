"use client";

import { useState } from "react";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/news", label: "News" },
    { href: "/articles", label: "Articles" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-4 w-full bg-vu-space/20 backdrop-blur-md text-vu-cyan py-2 z-50 shadow-[0_4px_6px_rgba(0,0,0,0.1)] border-b border-vu-blue/20 md:top-10 md:left-1/2 md:transform md:-translate-x-1/2 md:w-1/2 md:rounded-lg">
      <div className="flex justify-between items-center px-4 md:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
        <Image
            src="/venture_universe_logo.jpg"
            alt="Venture Universe Logo"
            width={50}
            height={50}
            className="rounded-full object-contain drop-shadow-[0_0_5px_rgba(0,253,252,0.5)]"
          />
          <h1 className="text-xl font-bold drop-shadow-[0_0_5px_rgba(0,253,252,0.5)] md:text-2xl">Venture Universe</h1>
        </div>

        {/* Hamburger Menu Button for Mobile/Tablet */}
        <button
          className="md:hidden bg-vu-blue text-vu-cyan p-2 rounded focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        {/* Navigation Menu */}
        <nav className={`md:flex ${isMenuOpen ? "flex" : "hidden"} md:items-center md:space-x-6`}>
          <ul className="flex flex-col md:flex-row gap-4 md:gap-6 p-4 md:p-0">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="hover:text-vu-blue drop-shadow-[0_0_3px_rgba(0,253,252,0.3)] text-base md:text-lg block md:inline-block"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}