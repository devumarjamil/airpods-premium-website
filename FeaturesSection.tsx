import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

interface Props {
  setActiveSection: (n: number) => void;
}

const features = [
  {
    icon: "🔇",
    title: "Active Noise Cancellation",
    sub: "2× More Powerful",
    desc: "The H2 chip processes sound at incredible speed, reducing even more unwanted noise so you can focus on what matters most.",
    color: "from-[#e8e0d8] to-[#f5f0eb]",
    accent: "#8a7a6a",
  },
  {
    icon: "🎵",
    title: "Adaptive Audio",
    sub: "Seamlessly Blends",
    desc: "A new listening mode that seamlessly combines Active Noise Cancellation and Transparency mode, adapting to your environment.",
    color: "from-[#ddd5cb] to-[#ede8e3]",
    accent: "#7a6a5a",
  },
  {
    icon: "👂",
    title: "Personalized Spatial Audio",
    sub: "Dynamic Head Tracking",
    desc: "Featuring dynamic head tracking that places sound all around you. Now scans your unique ear anatomy for a custom spatial profile.",
    color: "from-[#e5ddd5] to-[#f0ebe5]",
    accent: "#6a5a4a",
  },
  {
    icon: "⚡",
    title: "H2 Apple Chip",
    sub: "Ultra-Low Distortion",
    desc: "The custom Apple H2 chip pushes the limits of what's possible in wireless audio with a powerful Digital Audio Engine.",
    color: "from-[#dbd3c9] to-[#eae5e0]",
    accent: "#9a8a7a",
  },
  {
    icon: "💧",
    title: "IP54 Rated",
    sub: "Dust & Water Resistant",
    desc: "Both the AirPods and case are rated IP54 for dust and water resistance, protecting you through workouts and rainy days.",
    color: "from-[#e0d8d0] to-[#ece7e2]",
    accent: "#5a6a7a",
  },
  {
    icon: "🔋",
    title: "All‑Day Battery",
    sub: "Up to 30 Hours",
    desc: "Get up to 6 hours of listening time, and up to 30 hours combined with the MagSafe Charging Case.",
    color: "from-[#e3dbd3] to-[#eee9e4]",
    accent: "#6a7a5a",
  },
];

function FeatureCard({
  f,
  idx,
}: {
  f: (typeof features)[0];
  idx: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`relative rounded-3xl bg-gradient-to-br ${f.color} border border-white/60 p-8 overflow-hidden group cursor-default`}
      style={{ boxShadow: "0 4px 30px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)" }}
    >
      {/* Glow on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
        style={{ background: `radial-gradient(circle at 50% 50%, ${f.accent}20 0%, transparent 70%)` }}
      />

      {/* Top corner shine */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/30 -translate-y-16 translate-x-16" />

      <div className="relative z-10">
        <motion.span
          className="text-4xl block mb-4"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: idx * 0.5 }}
        >
          {f.icon}
        </motion.span>
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: f.accent }}>
          {f.sub}
        </p>
        <h3 className="text-xl font-bold text-[#1d1d1f] mb-3 leading-tight">{f.title}</h3>
        <p className="text-sm text-[#6e6e73] leading-relaxed">{f.desc}</p>
      </div>

      {/* Bottom gradient line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${f.accent}, transparent)` }}
      />
    </motion.div>
  );
}

export default function FeaturesSection({ setActiveSection }: Props) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const headingY = useTransform(scrollYProgress, [0, 0.4], [60, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActiveSection(1); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [setActiveSection]);

  return (
    <section ref={ref} data-section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f5f0eb] via-[#ede8e3] to-[#f5f0eb]" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(#1d1d1f 1px, transparent 1px), linear-gradient(90deg, #1d1d1f 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div style={{ y: headingY, opacity: headingOpacity }} className="text-center mb-20">
          <motion.p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8a7a6a] mb-4">
            What's Inside
          </motion.p>
          <h2 className="text-[clamp(36px,6vw,80px)] font-bold text-[#1d1d1f] tracking-tighter leading-tight">
            Engineered to
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6e6e73] to-[#1d1d1f]">
              amaze you.
            </span>
          </h2>
          <p className="text-lg text-[#6e6e73] mt-6 max-w-xl mx-auto font-light">
            Six groundbreaking technologies packed into one tiny device that's smaller than ever.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <FeatureCard key={f.title} f={f} idx={i} />
          ))}
        </div>

        {/* Bottom Highlight Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 rounded-3xl bg-[#1d1d1f] p-10 md:p-16 text-center overflow-hidden relative"
        >
          <div className="absolute inset-0 opacity-20"
            style={{ background: "radial-gradient(circle at 30% 50%, rgba(255,220,180,0.4) 0%, transparent 60%), radial-gradient(circle at 70% 50%, rgba(180,200,255,0.3) 0%, transparent 60%)" }}
          />
          <p className="relative z-10 text-[clamp(20px,3.5vw,42px)] font-bold text-white leading-tight tracking-tight">
            "The most powerful<br />AirPods we've ever built."
          </p>
          <p className="relative z-10 text-[#8a8a8a] mt-4 text-base">— Apple, Sept 2022</p>
        </motion.div>
      </div>
    </section>
  );
}
