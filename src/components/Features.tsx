import { motion } from "framer-motion";
import libraryImage from "../assets/Codec_LibraryView.png";
import detailImage from "../assets/Codec_GameDetail.png";
import scanImage from "../assets/Codec_Loading.png";
import logoIcon from "../assets/icon.png";
import { BoltIcon, DownloadIcon, LibraryIcon, ScanIcon, ShieldIcon } from "./Icons";
import { WordsPullUpMultiStyle } from "./RevealText";
import { GITHUB_REPO_URL } from "../lib/github";
import { Faq } from "./Faq";
import "./components.css";

const EASE = [0.22, 1, 0.36, 1] as const;

const features = [
  {
    title: "Found automatically.",
    description: "Codec scans supported launchers and local installs, then builds your library without busywork.",
    icon: ScanIcon,
    image: scanImage,
    className: "feature-card-image",
  },
  {
    title: "Together at last.",
    description: "Browse every game through one consistent view, no matter where it came from.",
    icon: LibraryIcon,
    image: libraryImage,
    className: "feature-card-wide",
  },
  {
    title: "Ready to play.",
    description: "Open Codec, pick a game, and launch it without returning to launcher clutter.",
    icon: BoltIcon,
    image: detailImage,
    className: "feature-card-image",
  },
  {
    title: "Yours stays yours.",
    description: "No required account, no tracking, and no cloud dependency. Your library remains local.",
    icon: ShieldIcon,
    className: "feature-card-quiet",
  },
];

export function Features({ downloadUrl }: { downloadUrl: string }) {
  return (
    <section className="features" id="features">
      <div className="features-inner">
        <WordsPullUpMultiStyle
          as="h2"
          className="features-heading"
          segments={[
            { text: "Everything your game library needs." },
            { text: "Nothing it doesn't.", className: "features-heading-muted" },
          ]}
        />

        <motion.div
          className="features-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-90px" }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        >
          {features.map(({ title, description, icon: Icon, image, className }) => (
            <motion.article
              className={`feature-card ${className}`}
              key={title}
              variants={{
                hidden: { opacity: 0, scale: 0.96, y: 18 },
                visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
              }}
            >
              {image && <img className="feature-image" src={image} alt="" aria-hidden="true" />}
              <div className="feature-card-shade" aria-hidden="true" />
              <div className="feature-card-content">
                <Icon size={20} />
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <Faq />

        <div className="features-close">
          <div>
            <img src={logoIcon} alt="" />
            <p>Bring your library together.</p>
          </div>
          <a className="button button-primary" href={downloadUrl}>
            <DownloadIcon size={17} /> Download for Windows
          </a>
        </div>

        <footer className="site-footer">
          <span>© {new Date().getFullYear()} Codec, a free game launcher for Windows</span>
          <a href={GITHUB_REPO_URL} target="_blank" rel="noreferrer">GitHub</a>
        </footer>
      </div>
    </section>
  );
}
