import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import mascotImage from "../assets/shrimpSleep.png";
import { WordsPullUpMultiStyle } from "./RevealText";
import "./components.css";

const supportingCopy =
  "Codec finds the games already on your PC, brings their artwork and details together, and launches them from one place. No required account. No cloud library. Just your games, where they belong.";

function RevealedCopy() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.35"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.28, 1]);

  return (
    <motion.p ref={ref} className="about-copy" style={{ opacity }}>
      {supportingCopy}
    </motion.p>
  );
}

export function About() {
  return (
    <section className="about" id="about">
      <div className="about-inner">
        <img className="about-mascot" src={mascotImage} alt="" aria-hidden="true" />
        <p className="about-label">A library, not another launcher</p>
        <WordsPullUpMultiStyle
          className="about-title"
          segments={[
            { text: "Every launcher has a library." },
            { text: "Codec gives you one.", className: "about-title-accent" },
          ]}
        />
        <RevealedCopy />
      </div>
    </section>
  );
}
