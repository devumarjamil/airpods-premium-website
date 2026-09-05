import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = ["Home", "Features", "Sound", "Design", "Buy"];

interface NavbarProps {
  activeSection: number;
  setActiveSection: (n: number) => void;
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (idx: number) => {
    const sections = document.querySelectorAll("section[data-section]");
    if (sections[idx]) {
      sections[idx].scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
          scrolled
            ? "bg-[rgba(245,240,235,0.85)] backdrop-blur-2xl shadow-[0_1px_40px_rgba(0,0,0,0.08)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollToSection(0)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
                fill="#1d1d1f"
              />
            </svg>
            <span className="text-[#1d1d1f] font-semibold tracking-tight text-lg">
              AirPods Pro
            </span>
          </motion.div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.button
                key={link}
                onClick={() => scrollToSection(i)}
                className={`text-sm font-medium transition-colors relative group ${
                  activeSection === i ? "text-[#1d1d1f]" : "text-[#6e6e73]"
                }`}
                whileHover={{ color: "#1d1d1f" }}
              >
                {link}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] bg-[#1d1d1f] transition-all duration-300 ${
                    activeSection === i ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </motion.button>
            ))}
            <motion.button
              onClick={() => scrollToSection(4)}
              className="bg-[#1d1d1f] text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-[#3d3d3f] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Buy Now
            </motion.button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <motion.span
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
              className="block w-6 h-0.5 bg-[#1d1d1f]"
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1 }}
              className="block w-6 h-0.5 bg-[#1d1d1f]"
            />
            <motion.span
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
              className="block w-6 h-0.5 bg-[#1d1d1f]"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[999] bg-[rgba(245,240,235,0.97)] backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => scrollToSection(i)}
                className="text-4xl font-light text-[#1d1d1f] tracking-tight"
              >
                {link}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
