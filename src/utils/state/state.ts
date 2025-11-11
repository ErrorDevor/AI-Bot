import { create } from "zustand";

export interface FrameSelection {
  selectedIds: Set<number>;
  isDragging: boolean;
  selectionRect: { x: number; y: number; width: number; height: number } | null;
  pointerButton?: number;
}

interface WhiteboardState {
  selection: FrameSelection;
  selectSingle: (id: number) => void;
  toggleSelect: (id: number) => void;
  clearSelection: () => void;
  setSelectionButton?: (btn: number) => void;
  setSelection: (ids: number[]) => void;

  pan: { x: number; y: number };
  setPan: (pan: { x: number; y: number }) => void;

  zoom: number;
  setZoom: (zoom: number) => void;
}

const loadSavedPan = (): { x: number; y: number } => {
  try {
    const saved = localStorage.getItem("whiteboardPan");
    if (saved) {
      const parsed = JSON.parse(saved);
      console.log("[state.ts] Loaded savedPan from localStorage:", parsed);
      return parsed;
    }
  } catch (e) {
    console.warn("[state.ts] Error loading savedPan from localStorage:", e);
  }
  console.log("[state.ts] No savedPan in localStorage, using default {x:0, y:0}");
  return { x: 0, y: 0 };
};

const loadSavedZoom = (): number => {
  try {
    const saved = localStorage.getItem("whiteboardZoom");
    if (saved) return JSON.parse(saved);
  } catch {}
  return 1;
};

export const whiteboardStore = create<WhiteboardState>((set) => ({
  selection: { selectedIds: new Set(), isDragging: false, selectionRect: null },

  selectSingle: (id) =>
    set((state) => ({ selection: { ...state.selection, selectedIds: new Set([id]) } })),
  toggleSelect: (id) =>
    set((state) => {
      const newSet = new Set(state.selection.selectedIds);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return { selection: { ...state.selection, selectedIds: newSet } };
    }),
  clearSelection: () =>
    set((state) => ({ selection: { ...state.selection, selectedIds: new Set() } })),
  setSelectionButton: (btn) =>
    set((state) => ({ selection: { ...state.selection, pointerButton: btn } })),
  setSelection: (ids) =>
    set((state) => ({ selection: { ...state.selection, selectedIds: new Set(ids) } })),

  pan: loadSavedPan(),
  setPan: (pan) => {
    console.log("[state.ts] Saving pan to Zustand and localStorage:", pan);
    localStorage.setItem("whiteboardPan", JSON.stringify(pan));
    set({ pan });
  },

  zoom: loadSavedZoom(),
  setZoom: (zoom) => {
    localStorage.setItem("whiteboardZoom", JSON.stringify(zoom));
    set({ zoom });
  },
}));
