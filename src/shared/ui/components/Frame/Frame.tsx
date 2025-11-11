"use client";

import React, { useEffect, useRef } from "react";

import clsx from "clsx";
import { whiteboardStore } from "@/utils/state/state";
import { useImageLoader } from "./lib/useImageLoader";

import css from "./Frame.module.scss";

// --- Frame — контейнер, который хранит реф-изображение,

interface FrameProps {
  id: number;
  src: string;
  className?: string;
  onLoad?: () => void;
  selected: boolean;
  onSelect: (id: number, e: React.MouseEvent) => void;
  onRef?: (el: HTMLDivElement | null) => void;
  minDelayMs?: number;
  maxWaitMs?: number;
}

export const Frame: React.FC<FrameProps> = ({
  id,
  src,
  className,
  onLoad,
  selected,
  onSelect,
  onRef,
  minDelayMs = 2000,
  maxWaitMs = 2000,
}) => {
  const elRef = useRef<HTMLDivElement | null>(null);

  // --- Custom хук загрузки изображения
  const { showImage, handleNativeLoad, handleNativeError } = useImageLoader(
    src,
    minDelayMs,
    maxWaitMs,
    onLoad
  );

  // --- Передаём ref наружу
  useEffect(() => {
    onRef?.(elRef.current ?? null);
    return () => onRef?.(null);
  }, [onRef]);

  return (
    <div
      ref={elRef}
      className={clsx(css.frame, className, { [css.selected]: selected })}
      onMouseDown={(e) => {
        if (e.button !== 0) return;
        e.stopPropagation();
        onSelect(id, e);
      }}
      onDragStart={(e) => e.preventDefault()}
      role="button"
      tabIndex={0}
      style={{
        userSelect: "none",
        ...({ WebkitUserDrag: "none" } as React.CSSProperties),
      }}
    >
      {!showImage && (
        <div className={css.loaderContainer} aria-hidden>
          <div className={css.loader} />
        </div>
      )}

      <img
        src={src}
        alt=""
        className={clsx(css.image, { [css.visible]: showImage })}
        draggable={false}
        onLoad={handleNativeLoad}
        onError={handleNativeError}
        style={{
          userSelect: "none",
          pointerEvents: showImage ? "auto" : "none",
          opacity: showImage ? 1 : 0,
          transition: "opacity 0.35s ease",
        }}
      />

      {selected && <div className={css.overlay} />}
    </div>
  );
};
