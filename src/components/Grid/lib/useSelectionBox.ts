import { useEffect } from "react";
import { whiteboardStore } from "@/utils/state/state";

// --- Отслеживает изменения области выделения (selectionBox) и вычисляет, какие фреймы попадают в неё.

interface SelectionBoxType {
  x: number;
  y: number;
  width: number;
  height: number;
  visible: boolean;
}

export const useSelectionBox = (
  frames: React.RefObject<Map<number, HTMLDivElement>>, // --- ссылки на все фреймы в текущей сетке
  selectionBox: SelectionBoxType | undefined, // --- геометрия выделенной области
  containerRef?: React.RefObject<HTMLDivElement> // --- ссылка на контейнер, относительно которого считается выделение
) => {
  const { setSelection } = whiteboardStore();

  useEffect(() => {
    if (!frames.current || !containerRef?.current) return;
    if (!selectionBox?.visible) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const selectionRect = {
      left: selectionBox.x,
      top: selectionBox.y,
      right: selectionBox.x + selectionBox.width,
      bottom: selectionBox.y + selectionBox.height,
    };

    const selectedIds: number[] = [];

    frames.current.forEach((el, id) => {
      const rect = el.getBoundingClientRect();
      const frameRect = {
        left: rect.left - containerRect.left,
        top: rect.top - containerRect.top,
        right: rect.right - containerRect.left,
        bottom: rect.bottom - containerRect.top,
      };

      const intersects =
        selectionRect.left < frameRect.right &&
        selectionRect.right > frameRect.left &&
        selectionRect.top < frameRect.bottom &&
        selectionRect.bottom > frameRect.top;

      if (intersects) selectedIds.push(id);
    });

    setSelection(selectedIds);
  }, [
    selectionBox?.x,
    selectionBox?.y,
    selectionBox?.width,
    selectionBox?.height,
    selectionBox?.visible,
  ]);
};
