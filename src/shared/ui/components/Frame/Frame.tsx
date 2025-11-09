"use client";

import React, { useEffect, useRef } from "react";

import Image from "../../base/Image";
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
}

export const Frame: React.FC<FrameProps> = ({
  id,
  src,
  className,
  onLoad,
  selected,
  onSelect,
  onRef,
}) => {
  const elRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    onRef?.(elRef.current ?? null);
    return () => onRef?.(null);
  }, []);

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
      <Image.Default
        src={src}
        className={css.image}
        draggable={false}
        onLoad={onLoad}
        style={{ userSelect: "none", pointerEvents: "auto" }}
      />

      {selected && <div className={css.overlay} />}
    </div>
  );
};

export default Frame;
