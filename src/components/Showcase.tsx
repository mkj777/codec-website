import { useState, useEffect, useCallback } from "react";
import screenshotLibrary from "../assets/Codec_LibraryView.png";
import screenshotGame from "../assets/Codec_GameDetail.png";
import screenshotIntro from "../assets/Codec_Onboarding.png";
import screenshotStart from "../assets/Codec_Loading.png";
import "./components.css";

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
        <div className="showcase-header animate-on-scroll">
          <h2 className="showcase-title">How it looks</h2>
          <p className="showcase-subtitle">
            More features to come, still in Development
          </p>
        </div>

        <div
          className="showcase-screenshot-wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <button
            className="showcase-nav-button"
            onClick={goToPrev}
            aria-label="Previous screenshot"
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
          </button>

          <div className="showcase-screenshot-container">
            <div
              className="showcase-slide-track"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {screenshots.map((shot, index) => (
                <img
                  key={index}
                  src={shot.src}
                  alt={shot.alt}
                  className="showcase-screenshot"
                />
              ))}
            </div>
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

          <button
            className="showcase-nav-button"
            onClick={goToNext}
            aria-label="Next screenshot"
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
          </button>

          <div className="showcase-glow"></div>
        </div>

        <div className="showcase-highlights">
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
        </div>
      </div>
    </section>
  );
}
