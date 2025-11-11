"use client";

import React, { useRef } from "react";

import clsx from "clsx";
import { motion } from "motion/react";
import { Grid } from "../Grid/Grid";
import { usePan } from "@/hooks";
import { useClearSelectionOnOutsideClick } from "@/hooks/whiteboard";
import { whiteboardStore } from "@/utils/state/state";

import css from "./Cluster.module.scss";

// --- Cluster — визуальный контейнер для группы изображений (фреймов),

interface SelectionBoxType {
  x: number;
  y: number;
  width: number;
  height: number;
  visible: boolean;
}

interface ClusterProps {
  id: string | number;
  title?: string;
  className?: string;
  style?: React.CSSProperties;
  images?: string[];
  frameRefs?: React.RefObject<Map<number, HTMLDivElement>>;
  selectionBox?: SelectionBoxType;
}

export const Cluster: React.FC<ClusterProps> = ({
  id,
  title,
  className,
  style,
  images = [],
  frameRefs,
  selectionBox,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const savedPan = whiteboardStore((s) => s.pan);
  const { dragging, enabled: panEnabled } = usePan(savedPan);

  // --- очищает текущее выделение, если пользователь кликает вне сетки
  useClearSelectionOnOutsideClick(gridRef, dragging, panEnabled);

  return (
    <motion.div
      data-cluster-id={id}
      className={clsx(css.cluster, className)}
      style={style}
      role="group"
      aria-label={String(title ?? `Cluster ${id}`)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        delay: 1,
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      ref={containerRef}
    >
      <div className={css.cluster_title}>{title}</div>

      <div className={css.cluster_content}>
        <Grid
          clusterId={Number(id)}
          images={images}
          selectionBox={selectionBox}
          ref={gridRef}
          frameRefs={frameRefs}
        />
      </div>
    </motion.div>
  );
};
