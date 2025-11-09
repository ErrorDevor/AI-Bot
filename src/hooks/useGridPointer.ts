import { useEffect } from "react";
import { whiteboardStore } from "@/utils/state/state";

export const useGridPointer = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  frameRefs?: React.RefObject<Map<number, HTMLElement> | null>
) => {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;

      if (!container.contains(e.target as Node)) return;

      const target = e.target as Node;
      let clickedFrame = false;

      if (frameRefs?.current) {
        for (const el of frameRefs.current.values()) {
          if (!el) continue;
          if (el.contains(target)) {
            clickedFrame = true;
            break;
          }
        }
      }

      if (!clickedFrame) {
        e.preventDefault();
        e.stopPropagation();

        const store = whiteboardStore.getState();
        store.setSelectionButton?.(e.button);
        store.clearSelection?.();
      }
    };

    container.addEventListener("pointerdown", onPointerDown);
    return () => container.removeEventListener("pointerdown", onPointerDown);
  }, [containerRef, frameRefs]);
};
