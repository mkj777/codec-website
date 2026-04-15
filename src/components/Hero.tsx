import { motion } from "framer-motion";
import mascotImage from "../assets/shrimpSleep.png";
import { DownloadIcon, GitHubIcon, WindowsIcon } from "./Icons";
import { GITHUB_REPO_URL } from "../lib/github";
import "./components.css";

type HeroProps = {
  downloadUrl: string;
};

const EASE = [0.4, 0, 0.2, 1] as const;

const contentVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

const mascotVariants = {
  hidden: { opacity: 0, scale: 0.88, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE, delay: 0.2 },
  },
};

export function Hero({ downloadUrl }: HeroProps) {
  return (
    <section className="hero" id="hero">
      <div className="hero-container">
        <motion.div
          className="hero-content"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 className="hero-title" variants={contentVariants}>
            <span className="hero-brand">Codec</span>
            <span className="hero-title-copy">
              hopefully the library for everything you need
            </span>
          </motion.h1>
          <motion.div className="hero-actions" id="download" variants={staggerContainer}>
            <motion.a
              href={downloadUrl}
              className="hero-primary-button"
              variants={itemVariant}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <DownloadIcon size={18} />
              Download for Windows
            </motion.a>
            <motion.a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-link"
              variants={itemVariant}
              whileHover={{ x: 3 }}
            >
              <GitHubIcon size={18} />
              View on GitHub
            </motion.a>
          </motion.div>
          <motion.div className="hero-platforms" variants={itemVariant}>
            <WindowsIcon size={16} className="hero-platform-icon" />
            <span className="hero-platform-label">Windows 10/11</span>
          </motion.div>

          <motion.div className="showcase-highlights" variants={itemVariant}>
            <div className="showcase-highlight">
              <span className="showcase-highlight-label">Auto-detect</span>
              <span className="showcase-highlight-desc">no matter where they are from</span>
            </div>
            <div className="showcase-highlight-divider"></div>
            <div className="showcase-highlight">
              <span className="showcase-highlight-label">Launch-Script</span>
              <span className="showcase-highlight-desc">supports Launch Scripts</span>
            </div>
            <div className="showcase-highlight-divider"></div>
            <div className="showcase-highlight">
              <span className="showcase-highlight-label">Play them</span>
              <span className="showcase-highlight-desc">launch Games through Codec</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-visual"
          variants={mascotVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="hero-image-stage">
            <div className="hero-image-wrapper">
              <img
                src={mascotImage}
                alt="Codec Mascot resting"
                className="hero-mascot hero-mascot-float"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
