"use client";

import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
} from "motion/react";
import type { ReactNode } from "react";

type InViewProps = Readonly<{
  children: ReactNode;
  className?: string;
  delay?: number;
  amount?: number;
  once?: boolean;
  /**
   * Which direction the element travels from.
   *
   * "below" is the site default and suits a grid of cards rising into place.
   * "right" is for a single element that should read as arriving rather than
   * settling — the divisional heads, which sit alone above their team.
   */
  from?: "below" | "right";
}> &
  Omit<
    HTMLMotionProps<"div">,
    | "children"
    | "className"
    | "initial"
    | "animate"
    | "whileInView"
    | "viewport"
    | "transition"
  >;

export function InView({
  children,
  className,
  delay = 0,
  amount = 0.2,
  once = true,
  from = "below",
  ...props
}: InViewProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      /*
        Travel is larger on the x axis than the y: a horizontal move needs more
        distance than a vertical one before it reads as deliberate rather than
        a nudge.
      */
      initial={
        reducedMotion
          ? false
          : from === "right"
            ? { opacity: 0, x: 64 }
            : { opacity: 0, y: 28 }
      }
      whileInView={
        reducedMotion
          ? undefined
          : from === "right"
            ? { opacity: 1, x: 0 }
            : { opacity: 1, y: 0 }
      }
      viewport={{
        once,
        amount,
      }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}