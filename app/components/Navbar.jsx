"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/isro", label: "ISRO" },
  { href: "/news", label: "News" },
  { href: "/articles", label: "Articles" },
  { href: "/contact", label: "Contact" },
];

function Navigation({ onLinkClick, isMobile = false }) {
  const pathname = usePathname();

  return (
    <ul className={`flex ${isMobile ? 'flex-col items-start gap-2' : 'flex-row items-center gap-1 md:gap-2'}`}>
      {navItems.map((item) => {
        const isActive = pathname === item.href || 
          (item.href !== "/" && pathname?.startsWith(item.href));
        
        return (
          <li key={item.href} className={isMobile ? "w-full" : ""}>
            <Link
              href={item.href}
              onClick={onLinkClick}
              className={`
                relative px-4 py-2 text-sm md:text-base font-medium transition-all duration-300
                ${isMobile 
                  ? 'block w-full text-left rounded-lg' 
                  : 'inline-block'
                }
                ${isActive
                  ? 'text-white'
                  : 'text-neutral-400 hover:text-white'
                }
                focus:outline-none focus:ring-2 focus:ring-lavender focus:ring-offset-2 focus:ring-offset-primary rounded-md
              `}
            >
              {item.label}
              {/* Active indicator underline */}
              {isActive && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-royal via-lavender to-royal"
                  layoutId="navbar-indicator"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}
              {/* Hover effect for non-active items */}
              {!isActive && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-royal/0 via-lavender/0 to-royal/0"
                  whileHover={{
                    background: "linear-gradient(to right, rgba(92, 51, 204, 0.5), rgba(122, 87, 219, 0.5), rgba(92, 51, 204, 0.5))",
                  }}
                />
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "backdrop-blur-xl bg-primary/80 border-b border-gradient-to-r from-royal/20 via-lavender/20 to-royal/20"
            : "backdrop-blur-lg bg-primary/40"
        }`}
      >
        {isScrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lavender/50 to-transparent" />
        )}

        <div className="mx-auto c-space max-w-7xl">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link
              href="/"
              className="relative group flex items-center gap-2"
              onClick={handleLinkClick}
            >
              <motion.span
                className="text-xl md:text-2xl font-bold text-white transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Venture Universe
              </motion.span>
              <motion.div
                className="absolute inset-0 rounded-lg bg-gradient-to-r from-royal/20 to-lavender/20 opacity-0 blur-xl group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
            </Link>

            <nav className="hidden lg:flex items-center gap-4">
              <Navigation />
            </nav>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-lavender focus:ring-offset-2 focus:ring-offset-primary"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <motion.div
                animate={isOpen ? "open" : "closed"}
                className="relative w-6 h-6"
              >
                <motion.span
                  className="absolute top-0 left-0 w-full h-0.5 bg-current rounded-full"
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 8 },
                  }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="absolute top-2.5 left-0 w-full h-0.5 bg-current rounded-full"
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                  }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="absolute top-5 left-0 w-full h-0.5 bg-current rounded-full"
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -8 },
                  }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-primary/80 backdrop-blur-md lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 z-50 w-80 h-full bg-gradient-to-br from-primary via-navy to-primary border-l border-white/10 backdrop-blur-xl lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <span className="text-xl font-bold text-white">Menu</span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-lavender"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-6">
                  <Navigation onLinkClick={handleLinkClick} isMobile={true} />
                </div>
                <div className="p-6 border-t border-white/10">
                  <p className="text-xs text-neutral-500 text-center">
                    Venture Universe © 2025
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </>
  );
};

export default Navbar;
