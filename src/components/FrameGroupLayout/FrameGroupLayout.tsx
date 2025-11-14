"use client";

import React, { useEffect } from "react";

interface FrameGroupLayoutProps {
  editor: any;
  frames: string[];
}

export const FrameGroupLayout: React.FC<FrameGroupLayoutProps> = ({
  editor,
  frames,
}) => {
  useEffect(() => {
    if (!editor) return;

    const COLUMNS = 6;
    const ITEM_W = 200;
    const ITEM_H = 200;
    const GAP = 6;
    const START_X = 100;
    const START_Y = 100;

    const existingIds: string[] = Array.isArray(editor.__layoutGridIds)
      ? editor.__layoutGridIds
      : [];
    existingIds.forEach((id) => {
      try {
        const s = editor.getShape(id);
        if (s) editor.deleteShape(id);
      } catch {}
    });
    editor.__layoutGridIds = [];

    frames.forEach((src, i) => {
      const col = i % COLUMNS;
      const row = Math.floor(i / COLUMNS);
      const x = START_X + col * (ITEM_W + GAP);
      const y = START_Y + row * (ITEM_H + GAP);

      try {
        const shape = editor.createShape({
          type: "my-frame-shape",
          x,
          y,
          props: {
            src,
            w: ITEM_W,
            h: ITEM_H,
          },
        });
        editor.__layoutGridIds.push(shape.id);
      } catch {}
    });
  }, [editor, frames]);

  return null;
};
