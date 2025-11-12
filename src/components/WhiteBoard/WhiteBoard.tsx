"use client";

import React, { useRef, useState, useEffect } from "react";
import { FrameGroup } from "../FrameGroup/FrameGroup";
import {
  usePanScale,
  useCursor,
  useSelect,
  useGroupSelect,
  useSelectionBox,
} from "@/hooks";
import { whiteboardStore } from "@/utils/state/state";

import css from "./Whiteboard.module.scss";

export const Whiteboard: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const { setGrab, setGrabbing, setDefault } = useCursor(svgRef);

  const { clearSelection } = useSelect();
  const {
    selectedIds: groupSelectedIds,
    isSelected: isGroupSelected,
    clearSelection: groupClearSelection,
    selectWithModifiers,
  } = useGroupSelect();

  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [mounted, setMounted] = useState(false); 

  useEffect(() => {
    setPan(whiteboardStore.getState().pan);
    setScale(whiteboardStore.getState().zoom);
    setMounted(true);
  }, []);

  const handleSetPan = (newPan: { x: number; y: number }) => {
    setPan(newPan);
    whiteboardStore.getState().setPan(newPan);
  };

  const handleSetScale = (newScale: number) => {
    setScale(newScale);
    whiteboardStore.getState().setZoom(newScale);
  };

  usePanScale({
    svgRef,
    pan,
    setPan: handleSetPan,
    scale,
    setScale: handleSetScale,
    minScale: 0.05,
    maxScale: 8,
    cursor: { setGrab, setGrabbing, setDefault },
  });

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

  const allFrameIds = frames.map((f) => f.id);

  const { selectionBox, onMouseDown, onMouseMove, onMouseUp } = useSelectionBox(
    {
      getFrameRects: () =>
        frames.map((f) => ({
          id: f.id,
          rect: document.getElementById(f.id)!.getBoundingClientRect(),
        })),
      onSelectFrames: (ids, modifiers) => {
        const { shiftKey, ctrlKey } = modifiers;
        ids.forEach((id) =>
          selectWithModifiers(id, allFrameIds, shiftKey, ctrlKey)
        );
      },
    }
  );

  const canvasTransform = `translate(${pan.x}px, ${pan.y}px) scale(${scale})`;

  const style = {
    userSelect: "none" as const,
    touchAction: "none" as const,
    backgroundImage:
      "radial-gradient(rgba(17, 49, 93, 0.18) 0.15rem, transparent 0.15rem)",
    backgroundSize: `24px 24px`,
    backgroundPosition: `0px 0px`,
  };

  return (
    <svg
      className={css.whiteboard}
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      id="diagram"
      tabIndex={0}
      style={style}
      onClick={(e) => {
        if (e.target === svgRef.current) {
          clearSelection();
          groupClearSelection();
        }
      }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      {mounted && (
        <g
          id="canvas"
          style={{ transform: canvasTransform }}
          transform={canvasTransform}
        >
          {frames.map((f) => (
            <FrameGroup
              key={f.id}
              {...f}
              scale={scale}
              selected={isGroupSelected(f.id)}
              onSelect={(e?: React.MouseEvent) => {
                const shift = e?.shiftKey ?? false;
                const ctrl = (e?.ctrlKey || e?.metaKey) ?? false;
                selectWithModifiers(f.id, allFrameIds, shift, ctrl);
              }}
            />
          ))}
        </g>
      )}

      {selectionBox.visible && (
        <rect
          x={selectionBox.x}
          y={selectionBox.y}
          width={selectionBox.width}
          height={selectionBox.height}
          fill="rgba(0,120,215,0.3)"
          stroke="rgba(0,120,215,0.9)"
          strokeDasharray="4"
          rx={4}
          pointerEvents="none"
        />
      )}
    </svg>
  );
};
