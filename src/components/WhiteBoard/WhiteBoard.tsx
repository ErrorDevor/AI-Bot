"use client";

import React, { useRef, useEffect, useState } from "react";

import clsx from "clsx";
import { useScroll, useSelectionBox, usePan } from "@/hooks";
import { useClearSelectionOnOutsideClick } from "@/hooks/whiteboard";
import { whiteboardStore } from "@/utils/state/state";
import {
  createClusters,
  useWhiteboardCursor,
  useWhiteboardTransform,
} from "./lib";
import { OFFSET_Y, INITIAL_SCALE } from "./lib/constants";

import css from "./WhiteBoard.module.scss";

interface FolderType {
  id: number;
  name: string;
}

interface WhiteBoardProps {
  className?: string;
  images?: string[];
  folders?: FolderType[];
}

export const WhiteBoard: React.FC<WhiteBoardProps> = ({
  className,
  images = [],
  folders = [],
}) => {
  const [ready, setReady] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const frameRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const clusterFrameRefs = useRef<
    Map<number, React.RefObject<Map<number, HTMLDivElement>>>
  >(new Map());

  const savedPan = whiteboardStore((s) => s.pan);
  const setPan = whiteboardStore((s) => s.setPan);

  const {
    pan,
    dragging,
    enabled: panEnabled,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  } = usePan(savedPan);

  useClearSelectionOnOutsideClick(contentRef, dragging, panEnabled);
  useScroll(containerRef);

  // --- Отслеживание Ctrl/Command для множественного выделения
  const isCtrlPressed = useRef(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) isCtrlPressed.current = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (!e.ctrlKey && !e.metaKey) isCtrlPressed.current = false;
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const selectionBox = useSelectionBox(frameRefs, containerRef, isCtrlPressed);

  // --- Инициализация ready
  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // --- Синхронизация панорамирования с глобальным состоянием
  useEffect(() => {
    setPan(pan);
  }, [pan.x, pan.y, setPan]);

  // --- Подключаем хук для управления курсором
  useWhiteboardCursor(containerRef, dragging, panEnabled);

  // --- Вычисляем transform с константами
  const transform = useWhiteboardTransform(pan, INITIAL_SCALE, OFFSET_Y);

  // --- Генерация кластеров через createClusters
  const clusters = createClusters({
    folders,
    images,
    frameRefs,
    selectionBox,
    clusterFrameRefs,
  });

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
            zIndex: 9999,
            pointerEvents: "none",
          }}
        />
      )}

      {ready && (
        <div
          ref={contentRef}
          className={css.white_board_content}
          style={{ transform }}
        >
          <div className={css.canvas_area}>{clusters}</div>
        </div>
      )}
    </div>
  );
};
