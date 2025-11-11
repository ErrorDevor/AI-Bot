"use client";

import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
} from "react";
import clsx from "clsx";
import { Frame } from "@/shared/ui/components/Frame/Frame";
import { whiteboardStore } from "@/utils/state/state";

import { useFrameRefs } from "./lib/useFrameRefs";
import { COLUMNS, columnOffsets } from "./lib/gridConfig";

import css from "./Grid.module.scss";

interface SelectionBoxType {
  x: number;
  y: number;
  width: number;
  height: number;
  visible: boolean;
}

interface GridProps {
  clusterId: number;
  images?: string[];
  className?: string;
  onFrameLoad?: () => void;
  selectionBox?: SelectionBoxType;
  frameRefs?: React.RefObject<Map<number, HTMLDivElement>>;
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ clusterId, images = [], className, onFrameLoad, frameRefs }, ref) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const { frames, setFrameRef } = useFrameRefs(frameRefs);

    useImperativeHandle(ref, () => internalRef.current as HTMLDivElement);

    const selection = whiteboardStore((s) => s.selection);

    // --- Выбор фрейма с учётом Ctrl
    const handleFrameSelect = (id: number, e: React.MouseEvent) => {
      e.stopPropagation();
      const { toggleSelect, selectSingle } = whiteboardStore.getState();

      if (e.ctrlKey || e.metaKey) {
        toggleSelect(id);
      } else {
        selectSingle(id);
      }
    };

    // --- Формирование сетки по колонкам
    const columns = Array.from(
      { length: COLUMNS },
      () => [] as { src: string; index: number }[]
    );
    images.forEach((src, i) => {
      columns[i % COLUMNS].push({ src, index: i });
    });

    return (
      <div ref={internalRef} className={clsx(css.grid, className)}>
        {columns.map((items, colIdx) => (
          <div
            key={colIdx}
            className={css.col}
            style={{ paddingTop: `${columnOffsets[colIdx] ?? 0}px` }}
          >
            {items.map(({ src, index }) => {
              const frameId = clusterId * 10000 + index;
              const isSelected = selection.selectedIds.has(frameId);

              return (
                <div key={frameId} className={css.col_item}>
                  <Frame
                    id={frameId}
                    src={src}
                    selected={isSelected}
                    onLoad={onFrameLoad}
                    onRef={(el) => setFrameRef(frameId, el)}
                    onSelect={handleFrameSelect}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  }
);
