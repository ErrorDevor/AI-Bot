import { useCallback, useRef, useState } from "react";

export function usePan() {
  const pRef = useRef({
    dragging: false,
    startX: 0,
    startY: 0,
  });

  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);
  const [dragging, setDragging] = useState(false);

  const enablePan = useCallback(() => setEnabled(true), []);
  const disablePan = useCallback(() => {
    setEnabled(false);
    setDragging(false);
    pRef.current.dragging = false;
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!enabled && e.button !== 1) return;
      if (e.button === 1) setEnabled(true);

      (e.target as Element).setPointerCapture?.(e.pointerId);
      pRef.current.dragging = true;
      pRef.current.startX = e.clientX;
      pRef.current.startY = e.clientY;
      setDragging(true);
    },
    [enabled]
  );

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!pRef.current.dragging) return;

    const dx = e.clientX - pRef.current.startX;
    const dy = e.clientY - pRef.current.startY;

    pRef.current.startX = e.clientX;
    pRef.current.startY = e.clientY;

    setPan((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    pRef.current.dragging = false;
    setDragging(false);
    if (e.button === 1) setEnabled(false);
    try {
      (e.target as Element).releasePointerCapture?.(e.pointerId);
    } catch {}
  }, []);

  return {
    pan,
    setPan,
    dragging,
    enabled,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    enablePan,
    disablePan,
  };
}
