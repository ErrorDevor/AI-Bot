import { useRef } from "react";

export const useFrameRefs = (
  externalRefs?: React.RefObject<Map<number, HTMLDivElement>>
) => {
  const internalRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const frames = externalRefs || internalRefs;

  const setFrameRef = (id: number, el: HTMLDivElement | null) => {
    if (el) frames.current.set(id, el);
    else frames.current.delete(id);
  };

  return { frames, setFrameRef };
};
