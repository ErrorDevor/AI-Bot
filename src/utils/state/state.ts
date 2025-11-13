import { create } from "zustand";

export interface FrameSelection {
  selectedIds: Set<string>;
  isDragging: boolean;
  selectionRect: { x: number; y: number; width: number; height: number } | null;
  pointerButton?: number;
}

interface WhiteboardState {
  selection: FrameSelection;
  selectSingle: (id: string) => void;
  toggleSelect: (id: string) => void;
  clearSelection: () => void;
  setSelection: (ids: string[]) => void;
setSelectionDragging: (isDragging: boolean) => void;
  pan: { x: number; y: number };
  setPan: (pan: { x: number; y: number }) => void;

  zoom: number;
  setZoom: (zoom: number) => void;

  framePositions: Record<string, { x: number; y: number }>;
  setFramePosition: (id: string, pos: { x: number; y: number }) => void;
  getFramePosition: (id: string) => { x: number; y: number } | null;
}

const loadSavedPan = (): { x: number; y: number } => {
  try {
    const saved = localStorage.getItem("whiteboardPan");
    return saved ? JSON.parse(saved) : { x: 0, y: 0 };
  } catch {
    return { x: 0, y: 0 };
  }
};

const loadSavedZoom = (): number => {
  try {
    const saved = localStorage.getItem("whiteboardZoom");
    return saved ? JSON.parse(saved) : 1;
  } catch {
    return 1;
  }
};

const loadSavedFrames = (): Record<string, { x: number; y: number }> => {
  try {
    const saved = localStorage.getItem("framePositions");
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
};

export const whiteboardStore = create<WhiteboardState>((set, get) => ({
  selection: { selectedIds: new Set(), isDragging: false, selectionRect: null },

   setSelectionDragging: (isDragging: boolean) =>
    set((state) => ({
      selection: { ...state.selection, isDragging },
    })),

  selectSingle: (id) =>
    set((state) => ({
      selection: { ...state.selection, selectedIds: new Set([id]) },
    })),

  toggleSelect: (id) =>
    set((state) => {
      const selectedIds = new Set(state.selection.selectedIds);
      selectedIds.has(id) ? selectedIds.delete(id) : selectedIds.add(id);
      return { selection: { ...state.selection, selectedIds } };
    }),

  clearSelection: () =>
    set((state) => ({
      selection: { ...state.selection, selectedIds: new Set() },
    })),

  setSelection: (ids) =>
    set((state) => ({
      selection: { ...state.selection, selectedIds: new Set(ids) },
    })),

  pan: loadSavedPan(),
  setPan: (pan) => {
    localStorage.setItem("whiteboardPan", JSON.stringify(pan));
    set({ pan });
  },

  zoom: loadSavedZoom(),
  setZoom: (zoom) => {
    localStorage.setItem("whiteboardZoom", JSON.stringify(zoom));
    set({ zoom });
  },

  framePositions: loadSavedFrames(),
  setFramePosition: (id, pos) => {
    const updated = { ...get().framePositions, [id]: pos };
    localStorage.setItem("framePositions", JSON.stringify(updated));
    set({ framePositions: updated });
  },
  getFramePosition: (id) => get().framePositions[id] ?? null,
}));
