import { useEffect } from "react";

// --- Подключает обработку колесика мыши. Когда панорамирование отключено: при прокрутке колесом будет скролл контейнера.

export const useWheelScroll = (
  ref: React.RefObject<HTMLDivElement | null>, // --- ref на контейнер
  panEnabled: boolean // --- если true — пан неактивен для колесика
) => {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (!panEnabled) {
        // --- +/- поведение: вертикальная и горизонтальная прокрутка
        el.scrollTop += e.deltaY;
        el.scrollLeft += e.deltaX;
      }
    };

    el.addEventListener("wheel", onWheel, { passive: true });
    return () => el.removeEventListener("wheel", onWheel);
  }, [ref, panEnabled]);
};
