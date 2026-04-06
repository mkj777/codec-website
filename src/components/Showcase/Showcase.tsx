import { useState, useEffect, useCallback } from "react";
import styles from "./Showcase.module.css";
import screenshotLibrary from "../../assets/Codec_LibraryView.png";
import screenshotGame from "../../assets/Codec_GameDetail.png";
import screenshotIntro from "../../assets/Codec_Loading.png";
import screenshotStart from "../../assets/Codec_Onboarding.png";

const screenshots = [
  { src: screenshotIntro, alt: "Codec Welcome Screen", label: "Welcome" },
  { src: screenshotStart, alt: "Codec Start Screen", label: "Start" },
  { src: screenshotLibrary, alt: "Codec Library View", label: "Library" },
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

  // Autoplay
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(goToNext, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, goToNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPrev, goToNext]);

  return (
    <section className={styles.showcase} id="showcase">
      <div className={styles.container}>
        <div className={`${styles.header} animate-on-scroll`}>
          <h2 className={styles.title}>See it in action</h2>
          <p className={styles.subtitle}>
            A clean interface that stays out of your way.
          </p>
        </div>

        <div
          className={styles.screenshotWrapper}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <button
            className={styles.navButton}
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

          <div className={styles.screenshotContainer}>
            <div
              className={styles.slideTrack}
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {screenshots.map((shot, index) => (
                <img
                  key={index}
                  src={shot.src}
                  alt={shot.alt}
                  className={styles.screenshot}
                />
              ))}
            </div>
            <div className={styles.slideInfo}>
              <span className={styles.slideLabel}>
                {screenshots[activeIndex].label}
              </span>
              <span className={styles.slideCounter}>
                {activeIndex + 1} / {screenshots.length}
              </span>
            </div>
            <div className={styles.progressBar}>
              {screenshots.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.progressDot} ${index === activeIndex ? styles.progressDotActive : ""}`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <button
            className={styles.navButton}
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

          <div className={styles.screenshotGlow}></div>
        </div>

        <div className={styles.highlights}>
          <div className={styles.highlight}>
            <span className={styles.highlightLabel}>Scan</span>
            <span className={styles.highlightDesc}>Auto-detect games</span>
          </div>
          <div className={styles.highlightDivider}></div>
          <div className={styles.highlight}>
            <span className={styles.highlightLabel}>Organize</span>
            <span className={styles.highlightDesc}>One unified library</span>
          </div>
          <div className={styles.highlightDivider}></div>
          <div className={styles.highlight}>
            <span className={styles.highlightLabel}>Play</span>
            <span className={styles.highlightDesc}>Launch instantly</span>
          </div>
        </div>
      </div>
    </section>
  );
}
