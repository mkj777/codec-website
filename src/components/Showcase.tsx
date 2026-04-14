import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import screenshotLibrary from "../assets/Codec_LibraryView.png";
import screenshotGame from "../assets/Codec_GameDetail.png";
import screenshotIntro from "../assets/Codec_Onboarding.png";
import screenshotStart from "../assets/Codec_Loading.png";
import "./components.css";

const EASE = [0.4, 0, 0.2, 1] as const;

const screenshots = [
  { src: screenshotIntro, alt: "Codec Welcome Screen", label: "Onboarding" },
  { src: screenshotStart, alt: "Codec Start Screen", label: "Scanning" },
  { src: screenshotLibrary, alt: "Codec Library View", label: "Game Library" },
  { src: screenshotGame, alt: "Codec Game Details", label: "Game Details" },
];

const AUTOPLAY_INTERVAL = 5000;

export function Showcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1));
  }, []);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(goToNext, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, goToNext]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPrev, goToNext]);

  return (
    <section className="showcase" id="showcase">
      <div className="showcase-container">
        <motion.div
          className="showcase-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <h2 className="showcase-title">How it looks</h2>
          <p className="showcase-subtitle">
            More features to come, still in Development
          </p>
        </motion.div>

        <motion.div
          className="showcase-screenshot-wrapper"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.button
            className="showcase-nav-button"
            onClick={goToPrev}
            aria-label="Previous screenshot"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.93 }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </motion.button>

          <div className="showcase-screenshot-container">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeIndex}
                src={screenshots[activeIndex].src}
                alt={screenshots[activeIndex].alt}
                className="showcase-screenshot"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.38, ease: EASE }}
              />
            </AnimatePresence>
            <div className="showcase-slide-info">
              <span className="showcase-slide-label">
                {screenshots[activeIndex].label}
              </span>
              <span className="showcase-slide-counter">
                {activeIndex + 1} / {screenshots.length}
              </span>
            </div>
            <div className="showcase-progress-bar">
              {screenshots.map((_, index) => (
                <button
                  key={index}
                  className={`showcase-progress-dot ${index === activeIndex ? "showcase-progress-dot-active" : ""}`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <motion.button
            className="showcase-nav-button"
            onClick={goToNext}
            aria-label="Next screenshot"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.93 }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </motion.button>

          <div className="showcase-glow"></div>
        </motion.div>

        <motion.div
          className="showcase-highlights"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
        >
          <div className="showcase-highlight">
            <span className="showcase-highlight-label">Auto-detect</span>
            <span className="showcase-highlight-desc">
              no matter where they are from
            </span>
          </div>
          <div className="showcase-highlight-divider"></div>
          <div className="showcase-highlight">
            <span className="showcase-highlight-label">Launch-Script</span>
            <span className="showcase-highlight-desc">
              supports Launch Scripts
            </span>
          </div>
          <div className="showcase-highlight-divider"></div>
          <div className="showcase-highlight">
            <span className="showcase-highlight-label">Play them</span>
            <span className="showcase-highlight-desc">
              launch Games through Codec
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
