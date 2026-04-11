import mascotImage from "../assets/shrimpSleep.png";
import { DownloadIcon, GitHubIcon, WindowsIcon } from "./Icons";
import { GITHUB_REPO_URL } from "../lib/github";
import "./components.css";

type HeroProps = {
  downloadUrl: string;
};

export function Hero({ downloadUrl }: HeroProps) {
  return (
    <section className="hero" id="hero">
      <div className="hero-container">
        <div className="hero-content animate-on-scroll">
          <h1 className="hero-title">
            <span className="hero-brand">Codec</span>
            <span className="hero-title-copy">
              hopefully the library for everything you need
            </span>
          </h1>
          <p className="hero-subtitle">Scan. Organize. Play.</p>
          <div className="hero-actions" id="download">
            <a href={downloadUrl} className="hero-primary-button">
              <DownloadIcon size={18} />
              Download for Windows
            </a>
            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-link"
            >
              <GitHubIcon size={18} />
              View on GitHub
            </a>
            <a href="#showcase" className="hero-link">
              See how it works
            </a>
          </div>
          <div className="hero-platforms">
            <WindowsIcon size={16} className="hero-platform-icon" />
            <span className="hero-platform-label">Windows 10/11</span>
          </div>
        </div>
        <div className="hero-visual animate-on-scroll">
          <div className="hero-image-stage">
            <div className="hero-image-wrapper">
              <img
                src={mascotImage}
                alt="Codec Mascot resting"
                className="hero-mascot"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
