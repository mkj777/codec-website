import { motion } from "framer-motion";
import {
  ScanIcon,
  LibraryIcon,
  SparkleIcon,
  BoltIcon,
  ShieldIcon,
  SlidersIcon,
} from "./Icons";
import "./components.css";

const features = [
  {
    icon: <ScanIcon size={22} />,
    title: "Auto Detection",
    description: "Finds games from Steam, Epic, GOG, and more. No manual setup needed.",
  },
  {
    icon: <LibraryIcon size={22} />,
    title: "Unified Library",
    description: "All your games in one place. Sort, filter, and organize however you like.",
  },
  {
    icon: <SparkleIcon size={22} />,
    title: "Clean Interface",
    description: "Minimal design that stays out of your way. Just you and your games.",
  },
  {
    icon: <BoltIcon size={22} />,
    title: "Lightweight",
    description: "Launches fast, uses minimal resources. Gets out of your way.",
  },
  {
    icon: <ShieldIcon size={22} />,
    title: "Privacy First",
    description: "Your data stays local. No accounts, no tracking, no cloud required.",
  },
  {
    icon: <SlidersIcon size={22} />,
    title: "Customizable",
    description: "Custom art, manual entries, launch options. Make it yours.",
  },
];

const EASE = [0.4, 0, 0.2, 1] as const;

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export function Features() {
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--mouse-x", `${x}%`);
    card.style.setProperty("--mouse-y", `${y}%`);
  };

  return (
    <section className="features" id="features">
      <div className="features-container">
        <motion.div
          className="features-header"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <h2 className="features-title">Simple by design</h2>
          <p className="features-subtitle">
            A lightweight library that gets out of your way.
          </p>
        </motion.div>
        <motion.div
          className="features-grid"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {features.map((feature, index) => (
            <motion.article
              key={index}
              className="features-card"
              variants={cardVariants}
              onMouseMove={handleMouseMove}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="features-icon-wrapper">{feature.icon}</div>
              <h3 className="features-card-title">{feature.title}</h3>
              <p className="features-card-description">{feature.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
