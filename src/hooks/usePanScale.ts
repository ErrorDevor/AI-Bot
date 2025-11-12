import { useEffect, useRef } from "react";

type Point = { x: number; y: number };

interface UsePanScaleOptions {
  svgRef: React.RefObject<SVGSVGElement | null>;
  pan: Point;
  setPan: (p: Point) => void;
  scale: number;
  setScale: (s: number) => void;
  minScale?: number;
  maxScale?: number;
  cell?: number;
  cursor?: {
    setGrab: () => void;
    setGrabbing: () => void;
    setDefault: () => void;
  };
}

export function usePanScale({
  svgRef,
  pan,
  setPan,
  scale,
  setScale,
  minScale = 0.25,
  maxScale = 4,
  cursor,
}: UsePanScaleOptions) {
  const isPanningRef = useRef(false);
  const spacePressedRef = useRef(false);
  const panSourceRef = useRef<"space" | "mouse" | null>(null);

  const panRef = useRef<Point>(pan);
  const scaleRef = useRef<number>(scale);
  useEffect(() => {
    panRef.current = pan;
  }, [pan]);
  useEffect(() => {
    scaleRef.current = scale;
  }, [scale]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    function onPointerDown(evt: PointerEvent) {
      if (!(spacePressedRef.current || evt.button === 1)) return;

      evt.preventDefault();
      isPanningRef.current = true;

      panSourceRef.current = evt.button === 1 ? "mouse" : "space";

      cursor?.setGrabbing();

      const start = { x: evt.clientX, y: evt.clientY };
      const startPan = { ...panRef.current };

      function onMove(e: PointerEvent) {
        const dx = e.clientX - start.x;
        const dy = e.clientY - start.y;
        setPan({ x: startPan.x + dx, y: startPan.y + dy });
      }

      function onUp() {
        isPanningRef.current = false;

        if (panSourceRef.current === "space") {
          cursor?.setGrab();
        } else {
          cursor?.setDefault();
        }

        panSourceRef.current = null;

        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      }

      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    }

    function onWheel(evt: WheelEvent) {
      if (!evt.ctrlKey) return;
      evt.preventDefault();

      const delta = evt.deltaY;
      const scaleStep = Math.abs(delta) < 50 ? 0.05 : 0.25;
      const nextScaleRaw =
        scaleRef.current + (delta < 0 ? scaleStep : -scaleStep);
      const nextScale = Math.max(minScale, Math.min(maxScale, nextScaleRaw));

      const origin = { x: evt.clientX, y: evt.clientY };
      const k = nextScale / scaleRef.current;
      const nextPan = {
        x: k * (panRef.current.x - origin.x) + origin.x,
        y: k * (panRef.current.y - origin.y) + origin.y,
      };

      setScale(nextScale);
      setPan(nextPan);
    }

    function onKeyDown(evt: KeyboardEvent) {
      if (evt.code === "Space") {
        spacePressedRef.current = true;
        if (!isPanningRef.current) cursor?.setGrab();
      }
    }

    function onKeyUp(evt: KeyboardEvent) {
      if (evt.code === "Space") {
        spacePressedRef.current = false;
        if (!isPanningRef.current) cursor?.setDefault();
      }
    }

    svg.addEventListener("pointerdown", onPointerDown);
    svg.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      svg.removeEventListener("pointerdown", onPointerDown);
      svg.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [svgRef, setPan, setScale, cursor, minScale, maxScale]);
}
