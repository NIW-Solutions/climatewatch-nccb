"use client";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import type { ReactNode } from "react";

type AnimatedGroupProps = Readonly<{
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
}>;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function AnimatedGroup({
  children,
  className,
  delay = 0,
  stagger = 0.1,
}: AnimatedGroupProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        ...containerVariants,
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: stagger,
          },
        },
      }}
      initial="hidden"
      animate="visible"
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
            >
              {child}
            </motion.div>
          ))
        : (
            <motion.div variants={itemVariants}>
              {children}
            </motion.div>
          )}
    </motion.div>
  );
}