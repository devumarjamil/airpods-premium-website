import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Props {
  setActiveSection: (n: number) => void;
}

export default function HeroSection({ setActiveSection }: Props) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const imgY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const imgScale = useTransform(scrollYProgress, [0, 0.6], [1, 1.18]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActiveSection(0); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [setActiveSection]);

  return (
    <section
      ref={ref}
      data-section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Animated Cream Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ scale: bgScale }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#faf7f2] via-[#f5f0eb] to-[#ede8e3]" />
        {/* Floating orbs */}
        <motion.div
          className="absolute top-20 left-1/4 w-[600px] h-[600px] rounded-full opacity-40"
          style={{ background: "radial-gradient(circle, rgba(220,210,195,0.8) 0%, transparent 70%)" }}
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-1/4 w-[500px] h-[500px] rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, rgba(200,190,180,0.6) 0%, transparent 70%)" }}
          animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, rgba(230,215,200,0.9) 0%, transparent 65%)" }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px",
          }}
        />
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-24 flex flex-col items-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-white/80 rounded-full px-4 py-1.5 shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-medium text-[#1d1d1f] tracking-wide uppercase">New Generation — 2nd Gen</span>
        </motion.div>

        {/* Title */}
        <motion.div style={{ y: textY, opacity: textOpacity }} className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(52px,9vw,120px)] font-bold text-[#1d1d1f] leading-[0.9] tracking-tighter mb-4"
          >
            AirPods
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8a8a8a] to-[#1d1d1f]">
              Pro.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(16px,2vw,22px)] text-[#6e6e73] font-light max-w-xl mx-auto leading-relaxed mt-4"
          >
            Rebuilt from the inside out. <br />
            Hear everything. Feel nothing.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center gap-4 mt-8"
          >
            <motion.button
              onClick={() => {
                const s = document.querySelectorAll("section[data-section]");
                s[4]?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-[#1d1d1f] text-white font-medium text-base px-8 py-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all"
              whileHover={{ scale: 1.05, backgroundColor: "#3d3d3f" }}
              whileTap={{ scale: 0.97 }}
            >
              Buy — from $249
            </motion.button>
            <motion.button
              onClick={() => {
                const s = document.querySelectorAll("section[data-section]");
                s[1]?.scrollIntoView({ behavior: "smooth" });
              }}
              className="border border-[#1d1d1f]/20 text-[#1d1d1f] font-medium text-base px-8 py-3.5 rounded-full hover:border-[#1d1d1f]/60 transition-all bg-white/40 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Explore
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          style={{ y: imgY, scale: imgScale, opacity: imgOpacity }}
          className="relative mt-10 md:mt-4 w-full max-w-2xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 60 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Glow behind image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-[70%] h-[70%] rounded-full"
                style={{ background: "radial-gradient(circle, rgba(200,185,165,0.5) 0%, transparent 70%)" }}
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <img
              src="/images/airpods-hero.png"
              alt="AirPods Pro"
              className="w-full h-auto object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.15)] relative z-10"
              style={{ maxHeight: "55vh" }}
            />
            {/* Floating label left */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="absolute left-0 top-1/3 hidden md:flex items-center gap-2"
              animate-second={{ x: [0, 6, 0] }}
            >
              <div className="w-8 h-[1px] bg-[#1d1d1f]/30" />
              <div className="bg-white/70 backdrop-blur-md border border-white/80 rounded-2xl px-3 py-2 shadow-lg">
                <p className="text-[10px] text-[#6e6e73] uppercase tracking-widest font-medium">ANC</p>
                <p className="text-sm font-semibold text-[#1d1d1f]">Active Noise</p>
                <p className="text-sm font-semibold text-[#1d1d1f]">Cancellation</p>
              </div>
            </motion.div>
            {/* Floating label right */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="absolute right-0 top-1/2 hidden md:flex items-center gap-2"
            >
              <div className="bg-white/70 backdrop-blur-md border border-white/80 rounded-2xl px-3 py-2 shadow-lg">
                <p className="text-[10px] text-[#6e6e73] uppercase tracking-widest font-medium">H2 Chip</p>
                <p className="text-sm font-semibold text-[#1d1d1f]">Ultra-low</p>
                <p className="text-sm font-semibold text-[#1d1d1f]">Distortion</p>
              </div>
              <div className="w-8 h-[1px] bg-[#1d1d1f]/30" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex flex-wrap justify-center gap-8 md:gap-16 mt-8 pb-16"
        >
          {[
            { val: "2×", label: "More ANC Power" },
            { val: "6hr", label: "Battery Life" },
            { val: "30hr", label: "With Case" },
            { val: "H2", label: "Apple Chip" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-[#1d1d1f] tracking-tight">{stat.val}</p>
              <p className="text-sm text-[#6e6e73] font-medium mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-[#6e6e73] font-medium tracking-widest uppercase">Scroll</span>
        <motion.div
          className="w-5 h-8 border-2 border-[#1d1d1f]/20 rounded-full flex justify-center pt-1.5"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-1 h-1.5 bg-[#1d1d1f]/40 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
