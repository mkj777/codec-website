import styles from "./Download.module.css";
import mascotImage from "../../assets/shrimpSleep.png";
import { DownloadIcon, GitHubIcon, WindowsIcon } from "../Icons";

export function Download() {
  return (
    <section className={styles.download} id="download">
      <div className={styles.container}>
        <div className={`${styles.content} animate-on-scroll`}>
          <h2 className={styles.title}>Get Codec</h2>
          <p className={styles.subtitle}>
            Free, open source, and always will be. Download the latest release
            or check out the source on GitHub.
          </p>
          <div className={styles.actions}>
            <a
              href="https://github.com/mkj777/codec/releases/download/0.5.0/Codec_Installer_0.5.0.exe"
              className={styles.primaryButton}
            >
              <DownloadIcon size={18} />
              Download for Windows
            </a>
            <a
              href="https://github.com/mkj777/codec"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondaryButton}
            >
              <GitHubIcon size={18} />
              View on GitHub
            </a>
          </div>
          <div className={styles.platforms}>
            <WindowsIcon size={16} className={styles.platformIcon} />
            <span className={styles.platformLabel}>Windows 10/11</span>
          </div>
        </div>
        <div className={`${styles.imageWrapper} animate-on-scroll`}>
          <img
            src={mascotImage}
            alt="Codec Mascot Resting"
            className={styles.mascot}
          />
        </div>
      </div>
    </section>
  );
}
