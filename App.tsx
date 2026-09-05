import { useState, useEffect } from "react";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import SoundSection from "./components/SoundSection";
import DesignSection from "./components/DesignSection";
import BuySection from "./components/BuySection";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";

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
