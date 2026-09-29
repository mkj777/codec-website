import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import screenshotLibrary from "../assets/Codec_LibraryView.png";
import screenshotGame from "../assets/Codec_GameDetail.png";
import screenshotIntro from "../assets/Codec_Onboarding.png";
import screenshotStart from "../assets/Codec_Loading.png";
import "./components.css";

const screens = [
  { src: screenshotLibrary, label: "Library", description: "Every installed game, together and ready to launch." },
  { src: screenshotGame, label: "Details", description: "Artwork, metadata and play actions without leaving your library." },
  { src: screenshotIntro, label: "Setup", description: "A short introduction gets Codec ready for your collection." },
  { src: screenshotStart, label: "Scan", description: "Codec looks across your PC and builds the first library for you." },
];

export function Showcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = screens[activeIndex];

  return (
    <section className="showcase" id="product">
      <div className="showcase-container">
        <div className="showcase-heading">
          <div><p className="section-label">Inside Codec</p><h2>See the whole library.<br />Keep the focus.</h2></div>
          <p>{active.description}</p>
        </div>

        <div className="showcase-stage">
          <div className="showcase-tabs" role="tablist" aria-label="Codec screens">
            {screens.map((screen, index) => (
              <button key={screen.label} role="tab" aria-selected={index === activeIndex} onClick={() => setActiveIndex(index)}>
                <span>{String(index + 1).padStart(2, "0")}</span>{screen.label}
              </button>
            ))}
          </div>
          <div className="showcase-screen">
            <AnimatePresence mode="wait">
              <motion.img key={active.src} src={active.src} alt={`Codec ${active.label} screen`} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.225, ease: [0, 0, 0.2, 1] }} />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
