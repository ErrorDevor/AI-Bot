import { useEffect, useRef } from "react";
import { whiteboardStore } from "@/utils/state/state";

export const useDragFrame = ({ id, scale }: { id: string; scale: number }) => {
  const isDragging = useRef(false);
  const start = useRef({ x: 0, y: 0 });
  const elemRef = useRef<SVGGraphicsElement | null>(null);
  const pos = useRef<{ x: number; y: number }>(
    whiteboardStore.getState().getFramePosition(id) ?? { x: 0, y: 0 }
  );

  const spacePressed = useRef(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") spacePressed.current = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space") spacePressed.current = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const elem = document.getElementById(id) as SVGGraphicsElement | null;
    if (!elem) return;
    elemRef.current = elem;

    const onPointerDown = (e: PointerEvent) => {
      if (spacePressed.current || e.button === 1) return;

      e.stopPropagation();
      e.preventDefault();
      isDragging.current = true;
      start.current = { x: e.clientX, y: e.clientY };
      elem.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;

      const dx = (e.clientX - start.current.x) / scale;
      const dy = (e.clientY - start.current.y) / scale;
      start.current = { x: e.clientX, y: e.clientY };

      pos.current.x += dx;
      pos.current.y += dy;

      elem.setAttribute(
        "transform",
        `translate(${pos.current.x},${pos.current.y})`
      );

      whiteboardStore.getState().setFramePosition(id, pos.current);
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!isDragging.current) return;
      isDragging.current = false;
      elem.releasePointerCapture(e.pointerId);
      whiteboardStore.getState().setFramePosition(id, pos.current);
    };

    elem.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      elem.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [id, scale]);

  return {};
};
