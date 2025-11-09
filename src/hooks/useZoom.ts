import { useCallback, useState } from "react";

interface UseZoomOptions {
  minZoom?: number;
  maxZoom?: number;
  sensitivity?: number;
}

export function useZoom({
  minZoom = 0.25,
  maxZoom = 3,
  sensitivity = 0.0012,
}: UseZoomOptions = {}) {
  const [zoom, setZoom] = useState<number>(1);

  const onWheel = useCallback(
    (e: WheelEvent) => {
      if (!e.ctrlKey) return;
      e.preventDefault();

      const delta = -e.deltaY;
      setZoom((prev) => {
        const next = prev + delta * sensitivity;
        return Math.min(Math.max(next, minZoom), maxZoom);
      });
    },
    [minZoom, maxZoom, sensitivity]
  );

  return { zoom, setZoom, onWheel };
}
