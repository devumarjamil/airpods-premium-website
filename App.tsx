import { useState, useEffect } from "react";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import SoundSection from "./SoundSection";
import DesignSection from "./DesignSection";
import BuySection from "./BuySection";
import Navbar from "./Navbar";
import CustomCursor from "./CustomCursor";

export default function App() {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    document.getElementById("live-fallback")?.remove();
    document.getElementById("live-fallback-css")?.remove();
  }, []);

  return (
    <div className="relative bg-[#f5f0eb] overflow-x-hidden">
      <CustomCursor />
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      <HeroSection setActiveSection={setActiveSection} />
      <FeaturesSection setActiveSection={setActiveSection} />
      <SoundSection setActiveSection={setActiveSection} />
      <DesignSection setActiveSection={setActiveSection} />
      <BuySection setActiveSection={setActiveSection} />
    </div>
  );
}
