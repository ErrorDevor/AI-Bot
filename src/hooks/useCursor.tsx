"use client";

import { useState, useEffect, useCallback } from "react";

export type CursorType =
  | "default"
  | "grab"
  | "grabbing"
  | "pointer"
  | "move"
  | "crosshair"
  | "text"
  | "not-allowed";

export function useCursor(
  targetRef?: React.RefObject<HTMLElement | SVGElement | null>
) {
  const [cursor, setCursor] = useState<CursorType>("default");

  useEffect(() => {
    const el = targetRef?.current || document.body;
    if (el) el.style.cursor = cursor;
    return () => {
      if (el) el.style.cursor = "default";
    };
  }, [cursor, targetRef]);

  const setGrab = useCallback(() => setCursor("grab"), []);
  const setGrabbing = useCallback(() => setCursor("grabbing"), []);
  const setPointer = useCallback(() => setCursor("pointer"), []);
  const setDefault = useCallback(() => setCursor("default"), []);

  return {
    cursor,
    setCursor,
    setGrab,
    setGrabbing,
    setPointer,
    setDefault,
  };
}
