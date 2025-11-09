import { useEffect } from "react";
import { whiteboardStore } from "@/utils/state/state";

export const useGridSelection = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  frameRefs: React.RefObject<Map<number, HTMLDivElement>>
) => {
  const selection = whiteboardStore((state) => state.selection);
  const toggleSelect = whiteboardStore((state) => state.toggleSelect);
  const clearSelection = whiteboardStore((state) => state.clearSelection);

  useEffect(() => {
    if (selection.isDragging || !selection.selectionRect || selection.pointerButton !== 0) return;

    const rect = selection.selectionRect;
    const selectedIds = new Set<number>();
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;

    frameRefs.current.forEach((el, idx) => {
      const r = el.getBoundingClientRect();
      const frameRect = {
        left: r.left - containerRect.left,
        top: r.top - containerRect.top,
        right: r.right - containerRect.left,
        bottom: r.bottom - containerRect.top,
      };

      const selLeft = rect.x;
      const selTop = rect.y;
      const selRight = rect.x + rect.width;
      const selBottom = rect.y + rect.height;

      const intersects =
        frameRect.left < selRight &&
        frameRect.right > selLeft &&
        frameRect.top < selBottom &&
        frameRect.bottom > selTop;

      if (intersects) selectedIds.add(idx);
    });

    clearSelection?.();
    selectedIds.forEach((id) => toggleSelect(id));
  }, [
    selection.selectionRect,
    selection.isDragging,
    selection.pointerButton,
    frameRefs,
    clearSelection,
    toggleSelect,
  ]);
};
