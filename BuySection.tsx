import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Props {
  setActiveSection: (n: number) => void;
}

const plans = [
  {
    name: "AirPods Pro",
    subtitle: "2nd Generation",
    price: "$249",
    priceNote: "Free Engraving",
    features: [
      "Active Noise Cancellation",
      "Adaptive Audio",
      "Personalised Spatial Audio",
      "MagSafe Charging Case",
      "IPX4 Water Resistant",
      "H2 Chip",
      "6 hrs Battery",
    ],
    cta: "Add to Bag",
    popular: false,
    gradient: "from-[#faf7f2] to-[#ede8e3]",
    border: "border-white/80",
    ctaBg: "bg-[#1d1d1f] text-white hover:bg-[#3d3d3f]",
  },
  {
    name: "AirPods Pro",
    subtitle: "USB-C Bundle",
    price: "$249",
    priceNote: "USB-C Charging",
    features: [
      "Everything in Standard",
      "USB-C MagSafe Case",
      "Precision Finding",
      "Apple Watch Fast-Pair",
      "Find My Support",
      "AAC-ELD Audio Codec",
      "Lossless Audio Ready",
    ],
    cta: "Most Popular",
    popular: true,
    gradient: "from-[#1d1d1f] to-[#2e2822]",
    border: "border-[#c4a882]/40",
    ctaBg: "bg-[#c4a882] text-[#1d1d1f] hover:bg-[#d4b892]",
  },
  {
    name: "AppleCare+",
    subtitle: "Protection Plan",
    price: "$29",
    priceNote: "/ month",
    features: [
      "Accidental Damage Cover",
      "Battery Service",
      "24/7 Priority Support",
      "Express Replacement",
      "Theft Protection",
      "Global Coverage",
      "No Hidden Fees",
    ],
    cta: "Add Protection",
    popular: false,
    gradient: "from-[#faf7f2] to-[#ede8e3]",
    border: "border-white/80",
    ctaBg: "bg-[#1d1d1f] text-white hover:bg-[#3d3d3f]",
  },
];

const faqs = [
  {
    q: "What is Adaptive Audio?",
    a: "Adaptive Audio is a new listening mode that seamlessly combines Active Noise Cancellation and Transparency mode, dynamically adjusting the mix of noise cancellation and awareness to suit your environment.",
  },
  {
    q: "How long does battery last?",
    a: "AirPods Pro delivers up to 6 hours of listening time (ANC on), and up to 30 hours total with the MagSafe Charging Case.",
  },
  {
    q: "Is it compatible with Android?",
    a: "AirPods Pro work with any Bluetooth-enabled device. However, many advanced features like Spatial Audio, Adaptive EQ and seamless switching require Apple devices.",
  },
  {
    q: "What charging options are available?",
    a: "The MagSafe Charging Case supports MagSafe, Qi wireless, Apple Watch charger, and Lightning or USB-C (depending on model).",
  },
];

function FAQItem({ q, a, idx }: { q: string; a: string; idx: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.08 }}
      className="border-b border-[#1d1d1f]/10 last:border-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
      >
        <span className="text-base font-semibold text-[#1d1d1f]">{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-2xl text-[#6e6e73] flex-shrink-0"
        >
          +
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <p className="text-[#6e6e73] pb-5 leading-relaxed text-sm">{a}</p>
      </motion.div>
    </motion.div>
  );
}

export default function BuySection({ setActiveSection }: Props) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActiveSection(4); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [setActiveSection]);

  return (
    <section ref={ref} data-section className="relative py-32 overflow-hidden">
      {/* Background */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#e8e2db] via-[#f0ebe5] to-[#faf7f2]" />
        {/* Decorative blobs */}
        <motion.div
          className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full opacity-30 pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(196,168,130,0.5) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.1, 1], x: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(140,130,120,0.6) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.15, 1], y: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, delay: 2 }}
        />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8a7a6a] mb-4">Purchase</p>
          <h2 className="text-[clamp(36px,6vw,80px)] font-bold text-[#1d1d1f] tracking-tighter leading-tight">
            Find the right
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8a7a6a] to-[#1d1d1f]">
              AirPods Pro.
            </span>
          </h2>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: plan.popular ? -12 : -8, scale: 1.02 }}
              className={`relative rounded-[28px] bg-gradient-to-br ${plan.gradient} border ${plan.border} overflow-hidden`}
              style={{
                boxShadow: plan.popular
                  ? "0 20px 80px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.1)"
                  : "0 6px 30px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8)",
              }}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#c4a882] to-transparent" />
              )}
              {plan.popular && (
                <motion.div
                  className="absolute top-4 right-4 bg-[#c4a882] text-[#1d1d1f] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Best Value
                </motion.div>
              )}

              <div className="p-8">
                <p className={`text-xs font-semibold uppercase tracking-widest mb-1 ${plan.popular ? "text-[#c4a882]" : "text-[#8a7a6a]"}`}>
                  {plan.subtitle}
                </p>
                <h3 className={`text-xl font-bold mb-6 ${plan.popular ? "text-white" : "text-[#1d1d1f]"}`}>
                  {plan.name}
                </h3>

                <div className="flex items-baseline gap-1 mb-1">
                  <span className={`text-5xl font-bold tracking-tight ${plan.popular ? "text-white" : "text-[#1d1d1f]"}`}>
                    {plan.price}
                  </span>
                </div>
                <p className={`text-sm mb-8 ${plan.popular ? "text-white/50" : "text-[#6e6e73]"}`}>{plan.priceNote}</p>

                <div className="space-y-3 mb-8">
                  {plan.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-3">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="8" fill={plan.popular ? "rgba(196,168,130,0.2)" : "rgba(29,29,31,0.08)"} />
                        <path d="M4.5 8l2.5 2.5 4.5-4.5" stroke={plan.popular ? "#c4a882" : "#1d1d1f"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className={`text-sm ${plan.popular ? "text-white/80" : "text-[#3d3d3f]"}`}>{feat}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  className={`w-full py-3.5 rounded-2xl font-semibold text-sm transition-colors ${plan.ctaBg}`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {plan.cta}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Hero Image Full Width */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[40px] overflow-hidden mb-24"
          style={{ height: "420px" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#2a2520] to-[#1e1a16]" />
          <div
            className="absolute inset-0 opacity-40"
            style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(196,168,130,0.4) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(100,120,160,0.3) 0%, transparent 60%)" }}
          />
          <motion.img
            src="/images/airpods-hero.png"
            alt="AirPods Pro Premium"
            className="absolute right-0 bottom-0 h-full object-contain opacity-90"
            style={{ maxWidth: "55%" }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute inset-0 flex items-center">
            <div className="pl-12 md:pl-16 max-w-lg">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-[#c4a882] text-xs font-semibold uppercase tracking-[0.3em] mb-4"
              >
                Free Delivery
              </motion.p>
              <motion.h3
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.9 }}
                className="text-[clamp(28px,4vw,52px)] font-bold text-white leading-tight tracking-tight mb-4"
              >
                Order today.
                <br />
                Delivered tomorrow.
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="text-[#9a8a7a] text-base mb-6"
              >
                Free express shipping on all orders. Easy 14-day returns.
              </motion.p>
              <motion.button
                className="bg-white text-[#1d1d1f] font-semibold px-7 py-3 rounded-full text-sm hover:bg-[#f0ede8] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                Shop Now →
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* FAQ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8a7a6a] mb-4">FAQ</p>
            <h3 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] tracking-tight leading-tight mb-4">
              Your questions,<br />answered.
            </h3>
            <p className="text-[#6e6e73]">
              Everything you need to know about AirPods Pro.
            </p>
          </motion.div>
          <div className="divide-y divide-[#1d1d1f]/10">
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} idx={i} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24 pt-8 border-t border-[#1d1d1f]/10 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
                fill="#1d1d1f"
              />
            </svg>
            <span className="font-semibold text-[#1d1d1f] text-sm">AirPods Pro</span>
            <span className="text-[#6e6e73] text-sm">© 2024 Apple Inc.</span>
          </div>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Use", "Sales Policy", "Legal"].map((link) => (
              <a key={link} href="#" className="text-xs text-[#6e6e73] hover:text-[#1d1d1f] transition-colors">
                {link}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
