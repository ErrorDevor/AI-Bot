"use client";

import { useState, useCallback, useRef } from "react";

/**
 * Хук для группового выделения FrameGroup
 * Поддерживает:
 * - одиночный клик
 * - Ctrl / Cmd для добавления/снятия с выделения
 * - Shift для выделения диапазона
 */
export function useGroupSelect() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const lastSelectedRef = useRef<string | null>(null);

  // выделение одного элемента
  const selectOne = useCallback((id: string) => {
    setSelectedIds(new Set([id]));
    lastSelectedRef.current = id;
  }, []);

  // переключение выделения (Ctrl/Cmd)
  const toggleSelect = useCallback((id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      lastSelectedRef.current = id;
      return next;
    });
  }, []);

  // очистка выделения
  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
    lastSelectedRef.current = null;
  }, []);

  // проверка, выделен ли элемент
  const isSelected = useCallback(
    (id: string) => selectedIds.has(id),
    [selectedIds]
  );

  /**
   * Групповое выделение
   * @param id - кликнутый элемент
   * @param allIds - массив всех id на полотне (для Shift)
   * @param shift - был ли зажат Shift
   * @param ctrl - был ли зажат Ctrl/Cmd
   */
  const selectWithModifiers = useCallback(
    (id: string, allIds: string[], shift?: boolean, ctrl?: boolean) => {
      if (shift && lastSelectedRef.current) {
        const start = allIds.indexOf(lastSelectedRef.current);
        const end = allIds.indexOf(id);
        if (start === -1 || end === -1) {
          selectOne(id);
          return;
        }
        const [from, to] = start < end ? [start, end] : [end, start];
        const rangeIds = allIds.slice(from, to + 1);
        setSelectedIds(prev => new Set([...prev, ...rangeIds]));
      } else if (ctrl) {
        toggleSelect(id);
      } else {
        selectOne(id);
      }
    },
    [selectOne, toggleSelect]
  );

  return {
    selectedIds,
    isSelected,
    selectOne,
    toggleSelect,
    clearSelection,
    selectWithModifiers,
  };
}
