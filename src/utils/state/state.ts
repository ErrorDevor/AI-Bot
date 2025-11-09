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
}

export const whiteboardStore = create<WhiteboardState>((set, get) => ({
  selection: { selectedIds: new Set(), isDragging: false, selectionRect: null },
  selectSingle: (id) =>
    set((state) => ({
      selection: { ...state.selection, selectedIds: new Set([id]), pointerButton: undefined },
    })),
  toggleSelect: (id) =>
    set((state) => {
      const newSet = new Set(state.selection.selectedIds);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return { selection: { ...state.selection, selectedIds: newSet, pointerButton: undefined } };
    }),
  clearSelection: () =>
    set((state) => ({
      selection: { ...state.selection, selectedIds: new Set(), pointerButton: undefined },
    })),
  setSelectionButton: (btn) =>
    set((state) => ({
      selection: { ...state.selection, pointerButton: btn },
    })),
}));
