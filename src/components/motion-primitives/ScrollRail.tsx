"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import { useRef, type ReactNode } from "react";

/**
 * Scroll rail — src/components/motion-primitives/ScrollRail.tsx
 *
 * A thin vertical line beside a list that fills as the reader scrolls
 * through it, so a sequence of steps reads as one journey rather than six
 * separate paragraphs. A faint track shows the full length; the filled
 * part is a single element scaled on the Y axis (compositor only).
 *
 * `railClassName` positions the rail; it is hidden below `sm`, where the
 * list is narrow and a line beside it is clutter.
 */
export function ScrollRail({
  children,
  className,
  railClassName = "left-[0.28rem]",
}: Readonly<{
  children: ReactNode;
  className?: string;
  railClassName?: string;
}>) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div ref={ref} className={`relative ${className ?? ""}`}>
      <span
        aria-hidden="true"
        className={`absolute top-9 bottom-9 hidden w-px bg-border sm:block ${railClassName}`}
      />

      <motion.span
        aria-hidden="true"
        className={`absolute top-9 bottom-9 hidden w-px origin-top bg-secondary sm:block ${railClassName}`}
        style={{ scaleY: reducedMotion ? 1 : progress }}
      />

      {children}
    </div>
  );
}
