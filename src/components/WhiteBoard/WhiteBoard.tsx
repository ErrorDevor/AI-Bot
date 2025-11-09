"use client";

import React, { useRef, useEffect } from "react";

import clsx from "clsx";
import { Grid } from "@/shared/ui/components/Grid/Grid";
import { useZoom, usePan, useScroll, useSelectionBox } from "@/hooks";
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
const OFFSET_Y = -200;

export const WhiteBoard: React.FC<WhiteBoardProps> = ({
  className,
  images = [],
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const frameRefs = useRef<Map<number, HTMLDivElement>>(new Map());

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
  const selectionBox = useSelectionBox(containerRef, frameRefs);

  useWheelZoom(containerRef, onWheel);
  useCenterContent(containerRef, contentRef, imagesLoaded, usePan);
  usePanControls(enablePan, disablePan);
  useClearSelectionOnOutsideClick(gridRef, dragging, panEnabled);
  useScroll(containerRef);

  const transform = `translate(${pan.x}px, ${pan.y + OFFSET_Y}px) scale(${
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
    <div
      ref={containerRef}
      className={clsx(css.white_board_section, className)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div className={css.white_board_background} />

      {selectionBox.visible && (
        <div
          className={css.selection_box}
          style={{
            position: "absolute",
            left: selectionBox.x,
            top: selectionBox.y,
            width: selectionBox.width,
            height: selectionBox.height,
            borderRadius: "0.8rem",
            border: "0.1rem dashed rgba(0, 120, 215, 0.9)",
            backgroundColor: "rgba(0, 120, 215, 0.3)",
            zIndex: 100,
            pointerEvents: "none",
          }}
        />
      )}
      <div
        ref={contentRef}
        className={css.white_board_content}
        style={{ transform }}
      >
        <div className={css.canvas_area}>
          <Grid
            images={images}
            onFrameLoad={handleImageLoad}
            ref={gridRef}
            selectionBox={selectionBox}
            frameRefs={frameRefs}
          />
        </div>
      </div>
    </div>
  );
};
