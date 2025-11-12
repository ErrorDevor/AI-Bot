"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
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
  onMeasured?: (id: string, height: number) => void;
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
  onMeasured,
}) => {
  const gRef = useRef<SVGGElement | null>(null);
  const cursor = useCursor(gRef);

  const [pos, setPos] = useState({ x, y });
  const maxWidth = 400;
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: maxWidth,
    height: maxWidth,
  });

  // hover / key / mouse state for cursor
  const [hovered, setHovered] = useState(false);
  const [spacePressed, setSpacePressed] = useState(false);
  const [middlePressed, setMiddlePressed] = useState(false);
  const [pointerDown, setPointerDown] = useState(false);

  // restore saved pos
  useEffect(() => {
    const saved = whiteboardStore.getState().getFramePosition(id);
    if (saved) setPos(saved);
  }, [id]);

  // wire drag
  useDragFrame({ id, scale });

  // global listeners for Space and middle mouse to keep state accurate
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") setSpacePressed(true);
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space") setSpacePressed(false);
    };
    const onMouseDown = (e: MouseEvent) => {
      if (e.button === 1) setMiddlePressed(true);
    };
    const onMouseUp = (e: MouseEvent) => {
      if (e.button === 1) setMiddlePressed(false);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  // compute cursor string deterministically
  const computedCursor = (() => {
    // when hovered + (space or middle) -> show grab / grabbing depending on pointerDown
    if (hovered && (spacePressed || middlePressed)) {
      return pointerDown ? "grabbing" : "grab";
    }

    // otherwise normal pointer when hovered, default outside
    return hovered ? "pointer" : "default";
  })();

  // keep useCursor in sync (optional: keeps other code that relies on useCursor consistent)
  useEffect(() => {
    if (hovered) {
      if (computedCursor === "grab") cursor.setGrab?.();
      else if (computedCursor === "grabbing") cursor.setGrabbing?.();
      else cursor.setPointer?.();
    } else {
      cursor.setDefault?.();
    }
    // we purposely depend on computedCursor and hovered
  }, [computedCursor, hovered, cursor]);

  // pointer handlers to reflect pointerDown state
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setPointerDown(true);
    // don't stopPropagation here — useDragFrame or other handlers capture pointer
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    setPointerDown(false);
  }, []);

  return (
    <g
      className={clsx(css.frame_group, className)}
      ref={gRef}
      id={id}
      transform={`translate(${pos.x},${pos.y})`}
      style={{ cursor: computedCursor }}
      onMouseEnter={() => {
        setHovered(true);
        // also call cursor hook so other UI reacts immediately
        if (spacePressed || middlePressed) cursor.setGrab?.();
        else cursor.setPointer?.();
      }}
      onMouseLeave={() => {
        setHovered(false);
        setPointerDown(false);
        cursor.setDefault?.();
      }}
      onPointerDown={(e) => {
        handlePointerDown(e);
        // allow existing pointer logic (useDragFrame) to work — don't stopPropagation here
      }}
      onPointerUp={(e) => {
        handlePointerUp(e);
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect?.(e as any);
      }}
    >
      {src && (
        <foreignObject x={0} y={0} width={size.width} height={size.height}>
          <Frame
            src={src}
            onLoaded={(imgWidth, imgHeight) => {
              const s = Math.min(1, maxWidth / imgWidth);
              const newWidth = imgWidth * s;
              const newHeight = imgHeight * s;
              setSize({ width: newWidth, height: newHeight });
              onMeasured?.(id, newHeight);
            }}
          />
        </foreignObject>
      )}

      <rect
        className={clsx(css.frame_rect, { [css.overlay]: selected })}
        fill="none"
        rx={6}
        width={size.width}
        height={size.height}
        pointerEvents="none"
      />
    </g>
  );
};
