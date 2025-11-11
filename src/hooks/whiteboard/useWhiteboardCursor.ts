import { useEffect } from "react";

export const useWhiteboardCursor = (
  ref: React.RefObject<HTMLDivElement | null>,
  dragging: boolean,
  panEnabled: boolean
) => {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const updateCursor = (isDragging: boolean) => {
      el.style.cursor = panEnabled
        ? isDragging
          ? "grabbing"
          : "grab"
        : "default";
    };

    let pointerDown = false;

    const onPointerDown = (e: PointerEvent) => {
      if (e.button === 1 || e.button === 2) e.preventDefault();
      pointerDown = true;
      updateCursor(true);
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!pointerDown) return;
      pointerDown = false;
      updateCursor(false);
    };

    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointerleave", onPointerUp);

    updateCursor(dragging);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointerleave", onPointerUp);
    };
  }, [ref, dragging, panEnabled]);
};
