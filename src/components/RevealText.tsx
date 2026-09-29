import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

type WordsPullUpProps = {
  text: string;
  className?: string;
};

export function WordsPullUp({ text, className }: WordsPullUpProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <h1 className={className} ref={ref}>
      {text.split(" ").map((word, index) => (
      <span className="word-window" key={`${word}-${index}`}>
        <motion.span
          initial={{ y: "115%" }}
          animate={isInView ? { y: 0 } : { y: "115%" }}
          transition={{ duration: 0.7, delay: index * 0.06, ease: EASE }}
        >
          {word}
        </motion.span>
      </span>
      ))}
    </h1>
  );
}

type TextSegment = { text: string; className?: string };

export function WordsPullUpMultiStyle({
  segments,
  className,
}: {
  segments: TextSegment[];
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  let wordIndex = 0;

  return (
    <div className={className} ref={ref}>
      {segments.flatMap((segment) =>
        segment.text.split(" ").map((word) => {
          const delay = wordIndex++ * 0.055;
          return (
            <span className={`word-window ${segment.className ?? ""}`} key={`${word}-${wordIndex}`}>
              <motion.span
                initial={{ y: "115%" }}
                animate={isInView ? { y: 0 } : { y: "115%" }}
                transition={{ duration: 0.7, delay, ease: EASE }}
              >
                {word}
              </motion.span>
            </span>
          );
        }),
      )}
    </div>
  );
}
