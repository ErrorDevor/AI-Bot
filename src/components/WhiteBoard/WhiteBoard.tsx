"use client";

import React, { useRef, useState } from "react";
import { FrameGroup } from "../FrameGroup/FrameGroup";
import { usePanScale } from "@/hooks/usePanScale";
import { useCursor } from "@/hooks/useCursor";
import { useSelect } from "@/hooks/useSelect";

import css from "./Whiteboard.module.scss";

export const Whiteboard: React.FC = () => {
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const { setGrab, setGrabbing, setDefault } = useCursor(svgRef);
  const { selectedIds, isSelected, selectOne, clearSelection } = useSelect();

  usePanScale({
    svgRef,
    pan,
    setPan,
    scale,
    setScale,
    minScale: 0.05,
    maxScale: 8,
    cursor: { setGrab, setGrabbing, setDefault },
  });

  const canvasTransform = `translate(${pan.x}px, ${pan.y}px) scale(${scale})`;

  const [backgroundPos] = useState({ x: 0, y: 0 });
  const [backgroundSize] = useState(24);

  const style = {
    userSelect: "none" as const,
    touchAction: "none" as const,
    backgroundImage:
      "radial-gradient(rgba(17, 49, 93, 0.18) 0.15rem, transparent 0.15rem)",
    backgroundSize: `${backgroundSize}px ${backgroundSize}px`,
    backgroundPosition: `${backgroundPos.x}px ${backgroundPos.y}px`,
  };

  const frames = [
    {
      id: "frame-1",
      x: 100,
      y: 100,
      width: 200,
      height: 120,
      color: "#ff6666",
    },
    {
      id: "frame-2",
      x: 400,
      y: 200,
      width: 180,
      height: 150,
      color: "#66ccff",
    },
    {
      id: "frame-3",
      x: 700,
      y: 100,
      width: 220,
      height: 140,
      color: "#99ff99",
    },
  ];

  return (
    <svg
      className={css.whiteboard}
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      id="diagram"
      tabIndex={0}
      style={style}
      onClick={(e) => {
        if (e.target === svgRef.current) clearSelection();
      }}
    >
      <g
        id="canvas"
        style={{ transform: canvasTransform }}
        transform={canvasTransform}
      >
        {frames.map((f) => (
          <FrameGroup
            key={f.id}
            {...f}
            selected={isSelected(f.id)}
            onSelect={() => selectOne(f.id)}
          />
        ))}
      </g>
    </svg>
  );
};
