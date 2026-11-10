"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Reveal text — src/components/motion-primitives/RevealText.tsx
 *
 * A headline that arrives a word at a time: each word rises a little and
 * comes into focus, staggered, as the line scrolls into view. It is the
 * difference between a heading that is simply there and one that is said.
 *
 * The full sentence is given to screen readers once, through aria-label;
 * the animated words are hidden from them so it is not read out in pieces.
 * With reduced motion the text renders plainly.
 */
export function RevealText({
  text,
  className,
  delay = 0,
}: Readonly<{
  text: string;
  className?: string;
  delay?: number;
}>) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <span className={className}>{text}</span>;
  }

  const words = text.split(" ");

  return (
    <motion.span
      aria-label={text}
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ staggerChildren: 0.055, delayChildren: delay }}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          aria-hidden="true"
          className="inline-block overflow-hidden pb-[0.12em] align-bottom"
        >
          <motion.span
            className="inline-block will-change-transform"
            variants={{
              hidden: { y: "105%", opacity: 0, filter: "blur(6px)" },
              shown: { y: "0%", opacity: 1, filter: "blur(0px)" },
            }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
            {index < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
