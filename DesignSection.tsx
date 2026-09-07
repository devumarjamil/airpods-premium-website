import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const caseImage = new URL("./airpods-case.png", import.meta.url).href;
const sideImage = new URL("./airpods-side.png", import.meta.url).href;
const detailImage = new URL("./airpods-detail.png", import.meta.url).href;

interface Props {
  setActiveSection: (n: number) => void;
}

const specs = [
  { label: "Chip", value: "Apple H2" },
  { label: "ANC", value: "Up to 2× more" },
  { label: "Transparency", value: "Adaptive Audio" },
  { label: "Spatial Audio", value: "Personalized" },
  { label: "Battery", value: "6 hrs ANC on" },
  { label: "Case Battery", value: "30 hrs total" },
  { label: "Water Resist.", value: "IPX4 / IP54" },
  { label: "Connectivity", value: "Bluetooth 5.3" },
  { label: "Controls", value: "Force Sensor" },
  { label: "Charging", value: "MagSafe / Lightning" },
];

export default function DesignSection({ setActiveSection }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [activeSpec, setActiveSpec] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const imageScale = useTransform(scrollYProgress, [0.1, 0.5], [0.8, 1]);
  const imageOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  const imageRotate = useTransform(scrollYProgress, [0.1, 0.6], [-8, 0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActiveSection(3); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [setActiveSection]);

  return (
    <section ref={ref} data-section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f5f0eb] via-[#ede8e3] to-[#e8e2db]" />

      {/* Large decorative circle */}
      <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(200,185,165,0.25) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.05, 1], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8a7a6a] mb-4">
            Precision Design
          </p>
          <h2 className="text-[clamp(36px,6vw,80px)] font-bold text-[#1d1d1f] tracking-tighter leading-tight">
            Crafted to
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8a7a6a] to-[#1d1d1f]">
              perfection.
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — Product Images */}
          <div className="space-y-6">
            {/* Main showcase */}
            <motion.div
              style={{ scale: imageScale, opacity: imageOpacity, rotate: imageRotate }}
              className="relative rounded-[40px] overflow-hidden bg-gradient-to-br from-[#faf7f2] to-[#ede8e3] border border-white/80 shadow-[0_20px_80px_rgba(0,0,0,0.08)]"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-2/3 h-2/3 rounded-full"
                  style={{ background: "radial-gradient(circle, rgba(200,185,165,0.4) 0%, transparent 70%)" }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 5, repeat: Infinity }}
                />
              </div>
              <motion.img
                src={caseImage}
                alt="AirPods Pro Case"
                className="w-full object-contain relative z-10 p-8"
                style={{ maxHeight: "380px" }}
                whileHover={{ scale: 1.04, rotate: 2 }}
                transition={{ duration: 0.6 }}
              />

              {/* Floating detail tags */}
              <motion.div
                className="absolute top-6 left-6 bg-white/80 backdrop-blur-md border border-white rounded-xl px-3 py-2 shadow-sm"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <p className="text-[10px] text-[#6e6e73] uppercase tracking-wider">Material</p>
                <p className="text-sm font-semibold text-[#1d1d1f]">Recycled Plastic</p>
              </motion.div>
              <motion.div
                className="absolute top-6 right-6 bg-white/80 backdrop-blur-md border border-white rounded-xl px-3 py-2 shadow-sm"
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 3.5, repeat: Infinity }}
              >
                <p className="text-[10px] text-[#6e6e73] uppercase tracking-wider">Weight</p>
                <p className="text-sm font-semibold text-[#1d1d1f]">5.4g each</p>
              </motion.div>
            </motion.div>

            {/* Side by side mini-cards */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="rounded-3xl overflow-hidden bg-gradient-to-br from-[#faf7f2] to-[#ede8e3] border border-white/80 shadow-sm relative"
                style={{ height: "200px" }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-3/4 h-3/4 rounded-full opacity-30"
                    style={{ background: "radial-gradient(circle, rgba(180,160,130,0.6) 0%, transparent 70%)" }}
                  />
                </div>
                <img
                  src={sideImage}
                  alt="AirPods Side"
                  className="w-full h-full object-contain p-4 relative z-10"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-white/60 backdrop-blur-sm rounded-xl px-2.5 py-1.5">
                  <p className="text-[10px] text-[#6e6e73] font-medium">Side View — Stem Design</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="rounded-3xl overflow-hidden bg-gradient-to-br from-[#faf7f2] to-[#ede8e3] border border-white/80 shadow-sm relative"
                style={{ height: "200px" }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-3/4 h-3/4 rounded-full opacity-30"
                    style={{ background: "radial-gradient(circle, rgba(160,140,120,0.6) 0%, transparent 70%)" }}
                  />
                </div>
                <img
                  src={detailImage}
                  alt="AirPods Detail"
                  className="w-full h-full object-contain p-4 relative z-10"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-white/60 backdrop-blur-sm rounded-xl px-2.5 py-1.5">
                  <p className="text-[10px] text-[#6e6e73] font-medium">Macro — Speaker Mesh</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right — Specs */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="text-3xl font-bold text-[#1d1d1f] mb-4 tracking-tight">Full Tech Specs</h3>
              <p className="text-[#6e6e73] leading-relaxed">
                Every millimetre of the AirPods Pro has been engineered for audio perfection. Tap any spec to learn more.
              </p>
            </motion.div>

            <div className="space-y-2">
              {specs.map((spec, i) => (
                <motion.div
                  key={spec.label}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.6 }}
                  onClick={() => setActiveSpec(activeSpec === i ? null : i)}
                  className={`flex items-center justify-between px-5 py-4 rounded-2xl cursor-pointer transition-all duration-300 border ${
                    activeSpec === i
                      ? "bg-[#1d1d1f] text-white border-[#1d1d1f] shadow-lg"
                      : "bg-white/50 border-white/80 hover:bg-white/80 text-[#1d1d1f]"
                  }`}
                  style={{ boxShadow: activeSpec === i ? "0 8px 30px rgba(0,0,0,0.15)" : "0 2px 10px rgba(0,0,0,0.04)" }}
                >
                  <span className={`text-sm font-medium ${activeSpec === i ? "text-white/70" : "text-[#6e6e73]"}`}>
                    {spec.label}
                  </span>
                  <span className={`text-sm font-bold ${activeSpec === i ? "text-white" : "text-[#1d1d1f]"}`}>
                    {spec.value}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Colors Available */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="bg-white/50 border border-white/80 rounded-3xl p-6"
            >
              <p className="text-sm font-semibold text-[#1d1d1f] mb-4">Available In</p>
              <div className="flex gap-3">
                {[
                  { name: "White", color: "#f0ede8" },
                  { name: "Midnight", color: "#2a2420" },
                  { name: "Starlight", color: "#e8e2d8" },
                ].map((c) => (
                  <motion.div
                    key={c.name}
                    className="flex flex-col items-center gap-2 cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div
                      className="w-10 h-10 rounded-full border-2 border-[#1d1d1f]/20 shadow-md"
                      style={{ backgroundColor: c.color }}
                    />
                    <span className="text-xs text-[#6e6e73] font-medium">{c.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
