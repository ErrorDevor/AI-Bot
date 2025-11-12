"use client";

import React from "react";

import clsx from "clsx";
import { motion } from "motion/react";

import css from "./Cluster.module.scss";

interface ClusterProps {
  id: string | number;
  title?: string;
  images?: string[];
  className?: string;
}

export const Cluster: React.FC<ClusterProps> = ({
  id,
  title,
  images = [],
  className,
}) => {
  return (
    <motion.div
      data-cluster-id={id}
      className={clsx(css.cluster, className)}
      role="group"
      aria-label={String(title ?? `Cluster ${id}`)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        delay: 1,
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <div className={css.cluster_title}>{title}</div>

      <div className={css.cluster_content}></div>
    </motion.div>
  );
};
