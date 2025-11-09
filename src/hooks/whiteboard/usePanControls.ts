import { useEffect } from "react";

export function usePanControls(
  enablePan: () => void,
  disablePan: () => void
) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        enablePan();
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space") disablePan();
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [enablePan, disablePan]);
}
