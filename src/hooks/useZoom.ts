import { useCallback } from "react";

interface UseZoomOptions {
  minZoom?: number;
  maxZoom?: number;
  zoom: number;
  pan: { x: number; y: number };
  setZoom: (z: number) => void;
  setPan: (p: { x: number; y: number }) => void;
  sensitivity?: number; 
  zoomSensitivity?: number;
}

export function useZoom({
  minZoom = 0.05,
  maxZoom = 8,
  zoom,
  pan,
  setZoom,
  setPan,
  sensitivity = 0.5, 
  zoomSensitivity = 0.001, 
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

      // --- Масштабирование
      const step = Math.exp(-e.deltaY * zoomSensitivity);
      const nextZoomRaw = zoom * step;
      const nextZoom = Math.min(Math.max(nextZoomRaw, minZoom), maxZoom);

      // --- Динамическая чувствительность панорамирования
      const dynamicSensitivity = Math.max(0.1, sensitivity * nextZoom / zoom);

      // --- Панорамирование
      const deltaX = e.deltaY * dynamicSensitivity * ((mouseX / rect.width) * 2 - 1);
      const deltaY = e.deltaY * dynamicSensitivity * ((mouseY / rect.height) * 2 - 1);

      const nextPan = {
        x: pan.x + deltaX,
        y: pan.y + deltaY,
      };

      // --- Привязка к курсору
      const contentX = (mouseX - nextPan.x) / zoom;
      const contentY = (mouseY - nextPan.y) / zoom;

      const adjustedPan = {
        x: mouseX - contentX * nextZoom,
        y: mouseY - contentY * nextZoom,
      };

      setZoom(nextZoom);
      setPan(adjustedPan);
    },
    [minZoom, maxZoom, zoom, pan, setZoom, setPan, sensitivity, zoomSensitivity]
  );

  return { onWheel };
}
