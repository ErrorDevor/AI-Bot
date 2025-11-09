"use client";

import React, { useEffect, useRef, useState } from "react";

import clsx from "clsx";

import css from "./Frame.module.scss";

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
  const [loaded, setLoaded] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const minTimerRef = useRef<number | null>(null);
  const maxTimerRef = useRef<number | null>(null);

  useEffect(() => {
    onRef?.(elRef.current ?? null);
    return () => onRef?.(null);
  }, [onRef]);

  useEffect(() => {
    if (!loaded) return;

    if (minTimerRef.current) {
      window.clearTimeout(minTimerRef.current);
      minTimerRef.current = null;
    }

    minTimerRef.current = window.setTimeout(() => {
      setShowImage(true);
      onLoad?.();
      if (minTimerRef.current) {
        window.clearTimeout(minTimerRef.current);
        minTimerRef.current = null;
      }
      if (maxTimerRef.current) {
        window.clearTimeout(maxTimerRef.current);
        maxTimerRef.current = null;
      }
    }, minDelayMs);

    return () => {
      if (minTimerRef.current) {
        window.clearTimeout(minTimerRef.current);
        minTimerRef.current = null;
      }
    };
  }, [loaded]);

  useEffect(() => {
    maxTimerRef.current = window.setTimeout(() => {
      setShowImage(true);
      if (minTimerRef.current) {
        window.clearTimeout(minTimerRef.current);
        minTimerRef.current = null;
      }
      maxTimerRef.current = null;
    }, maxWaitMs);

    return () => {
      if (maxTimerRef.current) {
        window.clearTimeout(maxTimerRef.current);
        maxTimerRef.current = null;
      }
      if (minTimerRef.current) {
        window.clearTimeout(minTimerRef.current);
        minTimerRef.current = null;
      }
    };
  }, [src]);

  const handleNativeLoad = () => {
    setLoaded(true);
  };

  const handleNativeError = () => {
    setShowImage(true);
    if (minTimerRef.current) {
      window.clearTimeout(minTimerRef.current);
      minTimerRef.current = null;
    }
    if (maxTimerRef.current) {
      window.clearTimeout(maxTimerRef.current);
      maxTimerRef.current = null;
    }
  };

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

