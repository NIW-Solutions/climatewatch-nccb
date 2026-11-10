"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef, type ReactNode } from "react";

/**
 * Scroll scale — src/components/motion-primitives/ScrollScale.tsx
 *
 * A block that grows into place as it is scrolled to: it starts slightly
 * small with rounded corners and settles to full size, square, by the time
 * it is centred. Tied to scroll position rather than a timer, so it moves
 * exactly as fast as the reader does.
 */
export function ScrollScale({
  children,
  className,
}: Readonly<{
  children: ReactNode;
  className?: string;
}>) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "start 30%"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [28, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0.4, 1]);

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        scale,
        opacity,
        borderRadius: radius,
        overflow: "hidden",
        transformOrigin: "50% 100%",
      }}
    >
      {children}
    </motion.div>
  );
}
