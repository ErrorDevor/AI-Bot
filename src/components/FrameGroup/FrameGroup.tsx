"use client";

import React, { useRef, useState, useEffect } from "react";
import clsx from "clsx";
import { useCursor } from "@/hooks/useCursor";
import { Frame } from "@/shared/ui/components/Frame/Frame";
import { useDragFrame } from "@/hooks/useDragFrame";
import { whiteboardStore } from "@/utils/state/state";

import css from "./FrameGroup.module.scss";

interface FrameGroupProps {
  className?: string;
  id: string;
  x: number;
  y: number;
  selected?: boolean;
  onSelect?: (e: React.MouseEvent<SVGGElement, MouseEvent>) => void;
  src?: string;
  scale?: number;
}

export const FrameGroup: React.FC<FrameGroupProps> = ({
  className,
  id,
  x,
  y,
  selected,
  onSelect,
  src,
  scale = 1,
}) => {
  const gRef = useRef<SVGGElement | null>(null);
  const cursor = useCursor(gRef);
  const [size, setSize] = useState({ width: 200, height: 200 });
  const [pos, setPos] = useState({ x, y });

  useEffect(() => {
    const saved = whiteboardStore.getState().getFramePosition(id);
    if (saved) setPos(saved);
  }, [id]);

  useDragFrame({ id, scale });

  return (
    <g
      className={clsx(css.frame_group, className)}
      ref={gRef}
      id={id}
      transform={`translate(${pos.x},${pos.y})`}
      onMouseEnter={() => cursor.setPointer?.()}
      onMouseLeave={() => cursor.setDefault?.()}
      onClick={(e) => {
        e.stopPropagation();
        onSelect?.(e);
      }}
    >
      <rect
        className={clsx(css.frame_rect, { [css.overlay]: selected })}
        fill="none"
        rx={6}
        width={size.width}
        height={size.height}
      />

      <foreignObject x={0} y={0} width={size.width} height={size.height}>
        {src ? (
          <Frame
            src={src}
            onLoaded={(w, h) => setSize({ width: w, height: h })}
          />
        ) : (
          <Frame src={null} />
        )}
      </foreignObject>
    </g>
  );
};
