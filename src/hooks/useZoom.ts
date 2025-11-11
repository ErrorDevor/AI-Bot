import { useCallback } from "react";

interface UseZoomOptions {
  minZoom?: number;
  maxZoom?: number;
  getZoom: () => number;
  getPan: () => { x: number; y: number };
  setZoom: (z: number) => void;
  setPan: (p: { x: number; y: number }) => void;
}

export function useZoom({
  minZoom = 0.25,
  maxZoom = 3,
  getZoom,
  getPan,
  setZoom,
  setPan,
}: UseZoomOptions) {
  const onWheel = useCallback(
    (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();

      const container = e.currentTarget as HTMLElement;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const currentZoom = getZoom();
      const zoomSpeed = 0.0008;
      const nextZoom = Math.min(
        Math.max(currentZoom * Math.exp(-e.deltaY * zoomSpeed), minZoom),
        maxZoom
      );
      if (nextZoom === currentZoom) return;

      const prevPan = getPan();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // --- направление от центра к курсору, нормализованное
      const offsetX = (mouseX - centerX) / centerX;
      const offsetY = (mouseY - centerY) / centerY;

      // --- величина смещения зависит от изменения масштаба
      const zoomDelta = nextZoom - currentZoom;
      const panStrength = 400;
      const nextPan = {
        x: prevPan.x - offsetX * zoomDelta * panStrength,
        y: prevPan.y - offsetY * zoomDelta * panStrength,
      };

      setPan(nextPan);
      setZoom(nextZoom);
    },
    [minZoom, maxZoom, getZoom, getPan, setZoom, setPan]
  );

  return { onWheel };
}
