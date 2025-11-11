import { useState, useCallback } from "react";

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
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const onWheel = useCallback(
    (e: WheelEvent) => {
      if (!e.ctrlKey) return;
      e.preventDefault();

      const delta = -e.deltaY * sensitivity;
      const nextZoom = Math.min(Math.max(zoom + delta, minZoom), maxZoom);
      if (nextZoom === zoom) return;

      const container = e.currentTarget as HTMLElement;
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      setPan((prevPan) => {
        const dx = (mouseX - prevPan.x) * (nextZoom / zoom - 1);
        const dy = (mouseY - prevPan.y) * (nextZoom / zoom - 1);
        return {
          x: prevPan.x - dx,
          y: prevPan.y - dy,
        };
      });

      setZoom(nextZoom);
    },
    [zoom, minZoom, maxZoom, sensitivity]
  );

  return { zoom, pan, setPan, setZoom, onWheel };
}
