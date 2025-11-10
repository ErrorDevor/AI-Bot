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
  const lastSelected = useRef<Set<number>>(new Set());

  const { clearSelection, setSelection } = whiteboardStore.getState();

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

  const isEventInsideFrame = (e: PointerEvent) => {
    if (!frameRefs?.current) return false;
    const target = e.target as Node | null;
    if (!target) return false;

    for (const el of frameRefs.current.values()) {
      if (!el) continue;
      if (el === target || el.contains(target)) return true;
    }

    if ((e as any).composedPath) {
      try {
        const path = (e as any).composedPath() as EventTarget[];
        for (const node of path) {
          if (node instanceof Node) {
            for (const el of frameRefs.current.values()) {
              if (!el) continue;
              if (el === node || el.contains(node as Node)) return true;
            }
          }
        }
      } catch {
      }
    }

    return false;
  };

  const onPointerDown = useCallback(
    (e: PointerEvent) => {
      if (e.button !== 0) return;
      if (isSpacePressed.current) return;
      if (!containerRef.current) return;

      if (isEventInsideFrame(e)) {
        return;
      }

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();

      const x = e.clientX - rect.left + container.scrollLeft;
      const y = e.clientY - rect.top + container.scrollTop;

      start.current = { x, y };
      lastSelected.current.clear();
      clearSelection();

      setBox({
        x,
        y,
        width: 0,
        height: 0,
        visible: true,
      });
    },
    [containerRef, frameRefs]
  );

  const onPointerMove = useCallback(
    (e: PointerEvent) => {
      if (!start.current || !containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();

      const currentX = e.clientX - rect.left + container.scrollLeft;
      const currentY = e.clientY - rect.top + container.scrollTop;

      const x = Math.min(start.current.x, currentX);
      const y = Math.min(start.current.y, currentY);
      const width = Math.abs(start.current.x - currentX);
      const height = Math.abs(start.current.y - currentY);

      const selectionRect = { x, y, width, height };
      setBox({ ...selectionRect, visible: true });

      const selected = new Set<number>();

      frameRefs.current.forEach((el, idx) => {
        if (!el) return;
        const frameRect = el.getBoundingClientRect();
        const cRect = container.getBoundingClientRect();

        const relRect = {
          left: frameRect.left - cRect.left + container.scrollLeft,
          top: frameRect.top - cRect.top + container.scrollTop,
          right: frameRect.right - cRect.left + container.scrollLeft,
          bottom: frameRect.bottom - cRect.top + container.scrollTop,
        };

        const selRight = selectionRect.x + selectionRect.width;
        const selBottom = selectionRect.y + selectionRect.height;

        const intersects =
          relRect.left < selRight &&
          relRect.right > selectionRect.x &&
          relRect.top < selBottom &&
          relRect.bottom > selectionRect.y;

        if (intersects) selected.add(idx);
      });

      const prev = lastSelected.current;
      const changed =
        selected.size !== prev.size ||
        [...selected].some((id) => !prev.has(id));

      if (changed) {
        lastSelected.current = selected;
        setSelection([...selected]);
      }
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
  }, [onPointerDown, onPointerMove, onPointerUp, containerRef, frameRefs]);

  return box;
}
