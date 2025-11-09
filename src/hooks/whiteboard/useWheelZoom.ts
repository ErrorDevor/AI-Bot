import { useEffect } from "react";

export function useWheelZoom(
  containerRef: React.RefObject<HTMLDivElement | null>,
  onWheel: (e: WheelEvent) => void
) {
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = (e: WheelEvent) => onWheel(e);
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, [containerRef, onWheel]);
}
