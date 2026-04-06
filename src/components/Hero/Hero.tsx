import styles from "./Hero.module.css";
import mascotImage from "../../assets/shrimpStand.png";
import { DownloadIcon } from "../Icons";

export function Hero() {
  return (
    <section className={styles.hero} id="hero">
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            A cozy home for
            <span className={styles.highlight}> your games</span>
          </h1>
          <p className={styles.subtitle}>
            Codec scans your PC, finds your games, and puts them all in one
            clean library. No clutter, no hassle—just play.
          </p>
          <div className={styles.actions}>
            <div>
              <a
                href="https://github.com/mkj777/codec/releases/download/0.5.0/Codec_Installer_0.5.0.exe"
                className={styles.primaryButton}
              >
                <DownloadIcon size={18} />
                Download
              </a>
            </div>
            <a href="#showcase" className={styles.secondaryButton}>
              See how it works
            </a>
          </div>
          <p className={styles.tagline}>Scan. Organize. Play.</p>
        </div>
        <div className={styles.imageWrapper}>
          <img
            src={mascotImage}
            alt="Codec Mascot - Red Panda"
            className={styles.mascot}
          />
        </div>
      </div>
    </section>
  );
}
