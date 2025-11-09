"use client";

import React, { useRef, useEffect } from "react";
import clsx from "clsx";
import { motion } from "motion/react";
import { Grid } from "@/shared/ui/components/Grid/Grid";
import { useZoom, usePan, useScroll } from "@/hooks";
import {
  useWheelZoom,
  usePanControls,
  useCenterContent,
  useImagesLoaded,
  useClearSelectionOnOutsideClick,
} from "@/hooks/whiteboard";

import css from "./WhiteBoard.module.scss";

interface WhiteBoardProps {
  className?: string;
  images?: string[];
}

const INITIAL_SCALE = 0.65;

export const WhiteBoard: React.FC<WhiteBoardProps> = ({
  className,
  images = [],
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const { zoom, onWheel } = useZoom();
  const {
    pan,
    dragging,
    enabled: panEnabled,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    enablePan,
    disablePan,
  } = usePan();

  const { imagesLoaded, handleImageLoad } = useImagesLoaded(images);

  useWheelZoom(containerRef, onWheel);
  useCenterContent(containerRef, contentRef, imagesLoaded, usePan);
  usePanControls(enablePan, disablePan);
  useClearSelectionOnOutsideClick(gridRef, dragging, panEnabled);
  useScroll(containerRef);

  const transform = `translate(${pan.x}px, ${pan.y}px) scale(${
    zoom * INITIAL_SCALE
  })`;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.style.cursor = panEnabled
      ? dragging
        ? "grabbing"
        : "grab"
      : "default";
  }, [dragging, panEnabled]);

  return (
    <motion.div
      className={css.white_board_motion}
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div
        ref={containerRef}
        className={clsx(css.white_board_section, className)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className={css.white_board_background} />
        <div
          ref={contentRef}
          className={css.white_board_content}
          style={{ transform }}
        >
          <div className={css.canvas_area}>
            <Grid images={images} onFrameLoad={handleImageLoad} ref={gridRef} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
