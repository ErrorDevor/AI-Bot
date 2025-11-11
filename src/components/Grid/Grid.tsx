"use client";

import React, { useRef, forwardRef, useImperativeHandle } from "react";
import clsx from "clsx";
import { Frame } from "@/shared/ui/components/Frame/Frame";
import { whiteboardStore } from "@/utils/state/state";

import { useFrameRefs } from "./lib/useFrameRefs";
import { useSelectionBox } from "./lib/useSelectionBox";
import { COLUMNS, columnOffsets } from "./lib/gridConfig";

import css from "./Grid.module.scss";

// --- Grid — визуальная сетка, содержащая фреймы (реф-изображения).

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
  containerRef?: React.RefObject<HTMLDivElement>;
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    {
      clusterId,
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

    // --- Управление ссылками на фреймы
    const { frames, setFrameRef } = useFrameRefs(frameRefs);

    // --- Включение логики выделения по координатам
    useSelectionBox(frames, selectionBox, containerRef);

    // --- Поддержка внешнего ref
    useImperativeHandle(ref, () => internalRef.current as HTMLDivElement);

    const selection = whiteboardStore((s) => s.selection);

    // --- Обрабатывает выбор фрейма пользователем
    const handleFrameSelect = (id: number, e: React.MouseEvent) => {
      e.stopPropagation();
      const { toggleSelect, selectSingle } = whiteboardStore.getState();
      if (e.ctrlKey || e.metaKey) toggleSelect(id);
      else selectSingle(id);
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
                    registerFrame={(id, el) => frames.current.set(id, el)}
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
