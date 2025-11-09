import { useState, useEffect, useCallback, useRef } from "react";
import { whiteboardStore } from "@/utils/state/state";

interface SelectionBox {
  x: number;
  y: number;
  width: number;
  height: number;
  visible: boolean;
}

export function useSelectionBox(
  containerRef: React.RefObject<HTMLDivElement | null>,
  frameRefs: React.RefObject<Map<number, HTMLDivElement>>
) {
  const [box, setBox] = useState<SelectionBox>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    visible: false,
  });

  const start = useRef<{ x: number; y: number } | null>(null);
  const isSpacePressed = useRef(false);

  const { clearSelection, toggleSelect } = whiteboardStore.getState();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") isSpacePressed.current = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space") isSpacePressed.current = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const onPointerDown = useCallback(
    (e: PointerEvent) => {
      if (e.button !== 0) return;
      if (isSpacePressed.current) return;
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      start.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };

      clearSelection();

      setBox({
        x: start.current.x,
        y: start.current.y,
        width: 0,
        height: 0,
        visible: true,
      });
    },
    [containerRef]
  );

  const onPointerMove = useCallback(
    (e: PointerEvent) => {
      if (!start.current || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      const x = Math.min(start.current.x, currentX);
      const y = Math.min(start.current.y, currentY);
      const width = Math.abs(start.current.x - currentX);
      const height = Math.abs(start.current.y - currentY);

      const selectionRect = { x, y, width, height };

      setBox({ ...selectionRect, visible: true });

      frameRefs.current.forEach((el, idx) => {
        if (!el) return;
        const frameRect = el.getBoundingClientRect();
        const cRect = containerRef.current!.getBoundingClientRect();

        const relRect = {
          left: frameRect.left - cRect.left,
          top: frameRect.top - cRect.top,
          right: frameRect.right - cRect.left,
          bottom: frameRect.bottom - cRect.top,
        };

        const selRight = selectionRect.x + selectionRect.width;
        const selBottom = selectionRect.y + selectionRect.height;

        const intersects =
          relRect.left < selRight &&
          relRect.right > selectionRect.x &&
          relRect.top < selBottom &&
          relRect.bottom > selectionRect.y;

        if (intersects) toggleSelect(idx);
      });
    },
    [containerRef, frameRefs]
  );

  const onPointerUp = useCallback(() => {
    start.current = null;
    setBox((b) => ({ ...b, visible: false }));
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [onPointerDown, onPointerMove, onPointerUp, containerRef]);

  return box;
}
