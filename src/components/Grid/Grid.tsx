"use client";

import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";

import clsx from "clsx";
import { motion } from "motion/react";
import { Frame } from "@/shared/ui/components/Frame/Frame";
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
  containerRef?: React.RefObject<HTMLDivElement>;
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
  (
    {
      images = [],
      className,
      onFrameLoad,
      frameRefs,
      selectionBox,
      containerRef,
    },
    ref
  ) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const localFrameRefs = useRef<Map<number, HTMLDivElement>>(new Map());
    const frames = frameRefs || localFrameRefs;
    const { selection, setSelection } = whiteboardStore();

    useImperativeHandle(ref, () => internalRef.current as HTMLDivElement);

    const setFrameRef = (index: number, el: HTMLDivElement | null) => {
      if (el) frames.current.set(index, el);
      else frames.current.delete(index);
    };

    useEffect(() => {
      if (!frames.current || !containerRef?.current) return;

      if (!selectionBox?.visible) return;

      const containerRect = containerRef.current.getBoundingClientRect();

      const selectionRect = {
        left: selectionBox.x,
        top: selectionBox.y,
        right: selectionBox.x + selectionBox.width,
        bottom: selectionBox.y + selectionBox.height,
      };

      const selectedIds: number[] = [];

      frames.current.forEach((el, id) => {
        const rect = el.getBoundingClientRect();

        const frameRect = {
          left: rect.left - containerRect.left,
          top: rect.top - containerRect.top,
          right: rect.right - containerRect.left,
          bottom: rect.bottom - containerRect.top,
        };

        const intersects =
          selectionRect.left < frameRect.right &&
          selectionRect.right > frameRect.left &&
          selectionRect.top < frameRect.bottom &&
          selectionRect.bottom > frameRect.top;

        if (intersects) selectedIds.push(id);
      });

      setSelection(selectedIds.length ? selectedIds : []);
    }, [
      selectionBox?.x,
      selectionBox?.y,
      selectionBox?.width,
      selectionBox?.height,
      selectionBox?.visible,
    ]);

    const handleFrameSelect = (index: number, e: React.MouseEvent) => {
      e.stopPropagation();
      const { toggleSelect, selectSingle } = whiteboardStore.getState();

      if (e.ctrlKey || e.metaKey) {
        toggleSelect(index);
      } else {
        selectSingle(index);
      }
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
