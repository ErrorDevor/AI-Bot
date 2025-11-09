import { useEffect } from "react";
import { whiteboardStore } from "@/utils/state/state";

export const useClearSelectionOnOutsideClick = (
  gridRef: React.RefObject<HTMLDivElement | null>,
  isDragging?: boolean,
  panEnabled?: boolean
) => {
  const clearSelection = whiteboardStore((state) => state.clearSelection);

  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;

      if (isDragging || panEnabled) return;

      if (!gridRef.current) return;
      if (!gridRef.current.contains(e.target as Node)) {
        clearSelection();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown, true);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown, true);
    };
  }, [gridRef, clearSelection, isDragging, panEnabled]);
};
