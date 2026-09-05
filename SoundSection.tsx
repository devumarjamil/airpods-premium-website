import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Props {
  setActiveSection: (n: number) => void;
}

function WaveBar({ idx, active }: { idx: number; active: boolean }) {
  const heights = [20, 40, 60, 80, 55, 35, 70, 45, 90, 60, 30, 75, 50, 85, 40, 65, 25, 55, 80, 35];
  const h = heights[idx % heights.length];
  return (
    <motion.div
      className="rounded-full"
      style={{
        width: "3px",
        background: active
          ? `linear-gradient(to top, #8a7a6a, #d4c4b0)`
          : "rgba(180,160,140,0.3)",
      }}
      animate={
        active
          ? {
              height: [`${h * 0.4}%`, `${h}%`, `${h * 0.6}%`, `${h}%`],
              opacity: [0.6, 1, 0.7, 1],
            }
          : { height: "20%", opacity: 0.3 }
      }
      transition={{
        duration: 0.8 + (idx % 5) * 0.15,
        repeat: Infinity,
        ease: "easeInOut",
        delay: (idx * 0.04) % 0.8,
      }}
    />
  );
}

export default function SoundSection({ setActiveSection }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [playing, setPlaying] = useState(true);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const imageX = useTransform(scrollYProgress, [0.1, 0.5], [-120, 0]);
  const imageOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  const textX = useTransform(scrollYProgress, [0.1, 0.5], [120, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActiveSection(2); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [setActiveSection]);

  return (
    <section ref={ref} data-section className="relative py-32 overflow-hidden">
      {/* Creamy dark background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2a2520] via-[#1e1a16] to-[#2e2822]" />

      {/* Ambient light blobs */}
      <motion.div
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(180,150,100,0.5) 0%, transparent 70%)" }}
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(140,120,90,0.6) 0%, transparent 70%)" }}
        animate={{ x: [0, -40, 0], y: [0, -50, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Image */}
          <motion.div style={{ x: imageX, opacity: imageOpacity }} className="relative">
            <div className="relative rounded-[32px] overflow-hidden">
              {/* Glow behind image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-3/4 h-3/4 rounded-full opacity-40"
                  style={{ background: "radial-gradient(circle, rgba(180,150,100,0.6) 0%, transparent 70%)" }}
                />
              </div>
              <motion.img
                src="/images/airpods-noise.png"
                alt="AirPods Noise Cancellation"
                className="w-full object-cover rounded-[32px] relative z-10"
                style={{ maxHeight: "580px" }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.6 }}
              />
              {/* Overlay */}
              <div className="absolute inset-0 rounded-[32px] bg-gradient-to-t from-[#1e1a16]/80 via-transparent to-transparent z-20" />

              {/* ANC Indicator on image */}
              <motion.div
                className="absolute bottom-6 left-6 right-6 z-30"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-xs text-white/60 uppercase tracking-wider font-medium">Now Listening</p>
                      <p className="text-white font-semibold text-sm mt-0.5">Adaptive Audio — ON</p>
                    </div>
                    <button
                      onClick={() => setPlaying(!playing)}
                      className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                    >
                      {playing ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                          <rect x="6" y="4" width="4" height="16" rx="1" />
                          <rect x="14" y="4" width="4" height="16" rx="1" />
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {/* Wave Bars */}
                  <div className="flex items-end gap-[3px] h-12">
                    {Array.from({ length: 32 }).map((_, i) => (
                      <WaveBar key={i} idx={i} active={playing} />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right — Text */}
          <motion.div style={{ x: textX, opacity: textOpacity }} className="space-y-8">
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c4a882] mb-4"
              >
                Sound Experience
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(36px,5vw,72px)] font-bold text-white tracking-tighter leading-tight"
              >
                Silence the
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c4a882] to-[#e8d5b8]">
                  world.
                </span>
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-[#9a8a7a] text-lg leading-relaxed font-light"
            >
              The H2 chip analyses ambient sound 48,000 times per second, continuously
              adapting to block out the most disruptive low- and mid-frequency sounds
              like airplane engines and traffic noise.
            </motion.p>

            <div className="space-y-4">
              {[
                { label: "Noise Reduction", val: 98, color: "#c4a882" },
                { label: "Audio Quality", val: 95, color: "#a0b8d0" },
                { label: "Transparency", val: 92, color: "#b8c8a0" },
              ].map((bar, i) => (
                <motion.div
                  key={bar.label}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                >
                  <div className="flex justify-between mb-1.5">
                    <span className="text-sm text-[#7a6a5a] font-medium">{bar.label}</span>
                    <span className="text-sm font-bold text-white">{bar.val}%</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${bar.color}88, ${bar.color})` }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${bar.val}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 + i * 0.1, duration: 1.2, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 }}
              className="grid grid-cols-3 gap-4"
            >
              {[
                { icon: "🎧", label: "ANC Mode" },
                { icon: "👁️", label: "Transparency" },
                { icon: "🔄", label: "Adaptive" },
              ].map((mode) => (
                <motion.div
                  key={mode.label}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.12)" }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center cursor-pointer transition-colors"
                >
                  <span className="text-2xl block mb-2">{mode.icon}</span>
                  <span className="text-xs text-[#9a8a7a] font-medium">{mode.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
