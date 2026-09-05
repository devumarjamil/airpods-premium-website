import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const trailX = useMotionValue(-100);
  const trailY = useMotionValue(-100);
  const [hovered, setHovered] = useState(false);

  const springConfig = { damping: 25, stiffness: 300 };
  const trailConfig = { damping: 35, stiffness: 150 };

  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);
  const trailSpringX = useSpring(trailX, trailConfig);
  const trailSpringY = useSpring(trailY, trailConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 10);
      cursorY.set(e.clientY - 10);
      trailX.set(e.clientX - 20);
      trailY.set(e.clientY - 20);
    };

    const handleHoverIn = () => setHovered(true);
    const handleHoverOut = () => setHovered(false);

    window.addEventListener("mousemove", moveCursor);

    const addListeners = () => {
      const interactables = document.querySelectorAll("a, button");
      interactables.forEach((el) => {
        el.addEventListener("mouseenter", handleHoverIn);
        el.addEventListener("mouseleave", handleHoverOut);
      });
    };

    addListeners();
    const interval = setInterval(addListeners, 2000);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      clearInterval(interval);
    };
  }, [cursorX, cursorY, trailX, trailY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: springX, y: springY }}
        animate={{ scale: hovered ? 1.8 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-5 h-5 rounded-full bg-white" />
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ x: trailSpringX, y: trailSpringY }}
        animate={{ scale: hovered ? 2.5 : 1, opacity: hovered ? 0.4 : 0.2 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-10 h-10 rounded-full border border-[#1d1d1f]" />
      </motion.div>
    </>
  );
}
