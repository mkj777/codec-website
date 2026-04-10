import mascotImage from "../assets/shrimpSleep.png";
import { DownloadIcon, GitHubIcon, WindowsIcon } from "./Icons";
import "./components.css";

export function Download() {
  return (
    <section className="download" id="download">
      <div className="download-container">
        <div className="download-content animate-on-scroll">
          <h2 className="download-title">Get Codec</h2>
          <p className="download-subtitle">
            Free, open source, and always will be. Download the latest release
            or check out the source on GitHub.
          </p>
          <div className="download-actions">
            <a
              href="https://github.com/mkj777/codec/releases/download/0.7.3/Codec_Installer_0.7.3.exe"
              className="download-primary-button"
            >
              <DownloadIcon size={18} />
              Download for Windows
            </a>
            <a
              href="https://github.com/mkj777/codec"
              target="_blank"
              rel="noopener noreferrer"
              className="download-secondary-button"
            >
              <GitHubIcon size={18} />
              View on GitHub
            </a>
          </div>
          <div className="download-platforms">
            <WindowsIcon size={16} className="download-platform-icon" />
            <span className="download-platform-label">Windows 10/11</span>
          </div>
        </div>
        <div className="download-image-wrapper animate-on-scroll">
          <img
            src={mascotImage}
            alt="Codec Mascot Resting"
            className="download-mascot"
          />
        </div>
      </div>
    </section>
  );
}
