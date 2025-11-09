"use client";

import React, { useRef, forwardRef, useImperativeHandle } from "react";

import clsx from "clsx";
import { Frame } from "../Frame/Frame";
import { whiteboardStore } from "@/utils/state/state";

import css from "./Grid.module.scss";

interface GridProps {
  images?: string[];
  className?: string;
  onFrameLoad?: () => void;
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ images = [], className, onFrameLoad }, ref) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const frameRefs = useRef<Map<number, HTMLDivElement>>(new Map());
    const { selection, selectSingle, toggleSelect } = whiteboardStore();

    useImperativeHandle(ref, () => internalRef.current as HTMLDivElement);

    const setFrameRef = (index: number, el: HTMLDivElement | null) => {
      if (el) frameRefs.current.set(index, el);
      else frameRefs.current.delete(index);
    };

    const handleFrameSelect = (index: number, e: React.MouseEvent) => {
      if (e.ctrlKey || e.metaKey) toggleSelect(index);
      else selectSingle(index);
    };

    return (
      <div ref={internalRef} className={clsx(css.grid, className)}>
        {images.map((src, index) => (
          <Frame
            key={src ?? index}
            id={index}
            src={src}
            selected={selection.selectedIds.has(index)}
            onLoad={onFrameLoad}
            onRef={(el) => setFrameRef(index, el)}
            onSelect={handleFrameSelect}
          />
        ))}
      </div>
    );
  }
);
