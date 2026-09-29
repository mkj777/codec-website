import { motion } from "framer-motion";
import { useState } from "react";
import heroCampfire from "../assets/hero-campfire.png";
import heroBackground from "../assets/hero-background.mp4";
import logoIcon from "../assets/icon.png";
import { DownloadIcon, GitHubIcon } from "./Icons";
import { WordsPullUp } from "./RevealText";
import { GITHUB_REPO_URL } from "../lib/github";
import "./components.css";

type HeroProps = { downloadUrl: string };
const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero({ downloadUrl }: HeroProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <section className="hero" id="hero">
      {/*
        THESIS: Your scattered PC game collection becomes one visible place; refuse the generic app-and-copy split hero.
        OWN-WORLD: Charcoal launcher chrome, warm white type, Codec orange, local game artwork, crisp squared controls.
        STORY: See the whole library, understand the local-first promise, download Codec.
        FIRST VIEWPORT: Inset screenshot stage, compact top navigation, enormous CODEC baseline, copy and actions at lower right.
        FORM: Cinematic product title card translated into a working software landing page.
      */}
      <div className="hero-stage">
        <video
          className="hero-backdrop"
          src={heroBackground}
          poster={heroCampfire}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className="hero-shade" aria-hidden="true" />

        <header className="hero-nav">
          <a href="#hero" className="hero-logo" aria-label="Codec home">
            <img src={logoIcon} alt="" />
            <span>Codec</span>
          </a>
          <button
            type="button"
            className="hero-menu-button"
            aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
          <nav className={`hero-links ${isMenuOpen ? "is-open" : ""}`} aria-label="Main navigation">
            <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
            <a href="#features" onClick={() => setIsMenuOpen(false)}>Features</a>
            <a href={GITHUB_REPO_URL} target="_blank" rel="noreferrer">GitHub</a>
            <a className="hero-nav-download" href={downloadUrl}>Download</a>
          </nav>
        </header>

        <div className="hero-content">
          <WordsPullUp text="Codec" className="hero-wordmark" />
          <motion.div
            className="hero-pitch"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.42, ease: EASE }}
          >
            <p>Your games. One calm, fast library.</p>
            <div className="hero-actions" id="download">
              <a className="button button-primary" href={downloadUrl}>
                <DownloadIcon size={17} /> Download for Windows
              </a>
              <a className="button button-secondary" href={GITHUB_REPO_URL} target="_blank" rel="noreferrer">
                <GitHubIcon size={16} /> View on GitHub
              </a>
            </div>
            <span className="hero-meta">Windows 10 and 11 · Free and open source</span>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
