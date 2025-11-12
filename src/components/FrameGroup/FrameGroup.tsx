"use client";

import React, { useRef, useState } from "react";
import clsx from "clsx";
import { useCursor } from "@/hooks/useCursor";
import { Frame } from "@/shared/ui/components/Frame/Frame";

import css from "./FrameGroup.module.scss";

interface FrameGroupProps {
  className?: string;
  id: string;
  x: number;
  y: number;
  selected?: boolean;
  onSelect?: () => void;
  src?: string;
}

export const FrameGroup: React.FC<FrameGroupProps> = ({
  className,
  id,
  x,
  y,
  selected,
  onSelect,
  src,
}) => {
  const gRef = useRef<SVGGElement | null>(null);
  const cursor = useCursor(gRef);
  const [size, setSize] = useState({ width: 200, height: 200 });

  return (
    <g
      className={clsx(css.frame_group, className)}
      ref={gRef}
      id={id}
      transform={`translate(${x},${y})`}
      onMouseEnter={() => cursor.setPointer()}
      onMouseLeave={() => cursor.setDefault()}
      onClick={(e) => {
        e.stopPropagation();
        onSelect?.();
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
