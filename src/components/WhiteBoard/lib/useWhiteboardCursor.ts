import { useEffect } from "react";

// --- Управляет стилем курсора контейнера в зависимости от состояния панорамирования.

export const useWhiteboardCursor = (
  ref: React.RefObject<HTMLDivElement | null>, // --- ref на контейнер (HTMLDivElement)
  dragging: boolean, // --- флаг, происходит ли перетаскивание
  panEnabled: boolean // --- включено ли панорамирование
) => {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.cursor = panEnabled ? (dragging ? "grabbing" : "grab") : "default";
  }, [ref, dragging, panEnabled]);
};
