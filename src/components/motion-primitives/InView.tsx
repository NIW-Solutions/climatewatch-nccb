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
  ...props
}: InViewProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={
        reducedMotion
          ? false
          : {
              opacity: 0,
              y: 28,
            }
      }
      whileInView={
        reducedMotion
          ? undefined
          : {
              opacity: 1,
              y: 0,
            }
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