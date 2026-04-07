import mascotImage from "../assets/shrimpStand.png";
import { DownloadIcon } from "./Icons";
import "./components.css";

export function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            A cozy home for
            <span className="hero-highlight"> your games</span>
          </h1>
          <p className="hero-subtitle">
            Codec scans your PC and puts your Games in one clean library.
            Hopefully a place for everything you need.
          </p>
          <div className="hero-actions">
            <a
              href="https://github.com/mkj777/codec/releases/download/0.7.2/Codec_Installer_0.7.2.exe"
              className="hero-primary-button"
            >
              <DownloadIcon size={18} />
              Download
            </a>
            <a href="#showcase" className="hero-secondary-button">
              See how it works
            </a>
          </div>
          <p className="hero-tagline">Scan. Organize. Play.</p>
        </div>
        <div className="hero-image-wrapper">
          <img
            src={mascotImage}
            alt="Codec Mascot - Red Panda"
            className="hero-mascot"
          />
        </div>
      </div>
    </section>
  );
}
