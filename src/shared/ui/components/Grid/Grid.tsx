"use client";

import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";

import clsx from "clsx";
import { motion } from "motion/react";
import { Frame } from "../Frame/Frame";
import { whiteboardStore } from "@/utils/state/state";

import css from "./Grid.module.scss";

interface GridProps {
  images?: string[];
  className?: string;
  onFrameLoad?: () => void;
  selectionBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
    visible: boolean;
  };
  frameRefs?: React.RefObject<Map<number, HTMLDivElement>>;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.3,
    },
  },
};

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ images = [], className, onFrameLoad, frameRefs, selectionBox }, ref) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const localFrameRefs = useRef<Map<number, HTMLDivElement>>(new Map());
    const frames = frameRefs || localFrameRefs;
    const { selection, setSelection, clearSelection } = whiteboardStore();

    useImperativeHandle(ref, () => internalRef.current as HTMLDivElement);

    const setFrameRef = (index: number, el: HTMLDivElement | null) => {
      if (el) frames.current.set(index, el);
      else frames.current.delete(index);
    };

    useEffect(() => {
      if (!selectionBox || !frames.current) return;
      if (!selectionBox.visible) return;

      const selectedIds: number[] = [];

      const selectionRect = {
        left: selectionBox.x,
        top: selectionBox.y,
        right: selectionBox.x + selectionBox.width,
        bottom: selectionBox.y + selectionBox.height,
      };

      frames.current.forEach((el, id) => {
        const rect = el.getBoundingClientRect();
        const parentRect = internalRef.current?.getBoundingClientRect();
        if (!parentRect) return;

        const frameRect = {
          left: rect.left - parentRect.left,
          top: rect.top - parentRect.top,
          right: rect.right - parentRect.left,
          bottom: rect.bottom - parentRect.top,
        };

        const intersects =
          selectionRect.left < frameRect.right &&
          selectionRect.right > frameRect.left &&
          selectionRect.top < frameRect.bottom &&
          selectionRect.bottom > frameRect.top;

        if (intersects) selectedIds.push(id);
      });

      if (selectedIds.length) setSelection(selectedIds);
      else clearSelection();
    }, [selectionBox]);

    const handleFrameSelect = (index: number, e: React.MouseEvent) => {
      const { toggleSelect, selectSingle } = whiteboardStore.getState();
      if (e.ctrlKey || e.metaKey) toggleSelect(index);
      else selectSingle(index);
    };

    return (
      <motion.div
        ref={internalRef}
        className={clsx(css.grid, className)}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {(() => {
          const COLUMNS = 6;
          const columnOffsets: number[] = [400, 200, 0, 50, 300, 600];
          const cols: Array<Array<{ src?: string; index: number }>> =
            Array.from({ length: COLUMNS }, () => []);
          images.forEach((src, i) => {
            const colIndex = i % COLUMNS;
            cols[colIndex].push({ src, index: i });
          });

          return cols.map((items, colIdx) => (
            <div
              key={colIdx}
              className={css.col}
              style={{ paddingTop: `${columnOffsets[colIdx] ?? 0}px` }}
            >
              {items.map(({ src, index }) => (
                <div key={src ?? index} className={css.col_item}>
                  <Frame
                    id={index}
                    src={src || ""}
                    selected={selection.selectedIds.has(index)}
                    onLoad={onFrameLoad}
                    onRef={(el) => setFrameRef(index, el)}
                    onSelect={handleFrameSelect}
                  />
                </div>
              ))}
            </div>
          ));
        })()}
      </motion.div>
    );
  }
);
