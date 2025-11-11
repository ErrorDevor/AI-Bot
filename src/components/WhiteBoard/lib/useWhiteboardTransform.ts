import { OFFSET_Y, INITIAL_SCALE } from "./constants";

// --- хук для позиционирования и масштабирования

export const useWhiteboardTransform = (
  pan: { x: number; y: number },
  scale = INITIAL_SCALE,
  offsetY = OFFSET_Y
) => {
  return `translate(${pan.x}px, ${pan.y + offsetY}px) scale(${scale})`;
};
