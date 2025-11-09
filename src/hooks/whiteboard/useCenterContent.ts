import { useEffect } from "react";

export function useCenterContent(
  containerRef: React.RefObject<HTMLDivElement | null>,
  contentRef: React.RefObject<HTMLDivElement | null>,
  imagesLoaded: boolean,
  setPan: (coords: { x: number; y: number }) => void
) {
  useEffect(() => {
    if (!imagesLoaded) return;
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const observer = new ResizeObserver(() => {
      const containerRect = container.getBoundingClientRect();
      const contentRect = content.getBoundingClientRect();

      setPan({
        x: containerRect.width / 2 - contentRect.width / 2,
        y: containerRect.height / 2 - contentRect.height / 2,
      });
    });

    observer.observe(content);
    return () => observer.disconnect();
  }, [imagesLoaded, setPan, containerRef, contentRef]);
}
