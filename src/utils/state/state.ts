import { create } from "zustand";

export interface FrameState {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  src: string;
}

interface WhiteboardState {
  zoom: number;
  panX: number;
  panY: number;
  frames: FrameState[];

  setCanvasTransform: (zoom: number, panX: number, panY: number) => void;
  setFrames: (frames: FrameState[]) => void;
}

export const whiteboardStore = create<WhiteboardState>((set) => ({
  zoom: 1,
  panX: 0,
  panY: 0,
  frames: [],

  setCanvasTransform: (zoom, panX, panY) =>
    set({ zoom, panX, panY }),

  setFrames: (frames) =>
    set({ frames }),
}));
