"use client";

import React, { useRef } from "react";
import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";
import { FrameShape } from "@/components/FrameShape/FrameShape";

import css from "./Whiteboard.module.scss";

interface WhiteboardProps {
  frames?: string[];
}

export const Whiteboard: React.FC<WhiteboardProps> = ({ frames = [] }) => {
  const shapeIdRef = useRef<string | null>(null);
  const customShapeUtils = [FrameShape];

  return (
    <div className={css.whiteboard}>
      <div className={css.tldraw_container}>
        <Tldraw
          hideUi
          shapeUtils={customShapeUtils}
          onMount={(editor) => {
            if (shapeIdRef.current) return;
            const id = editor.createShape({
              type: "my-frame-shape",
              x: 100,
              y: 100,
              props: {
                src: "/images/Gallery/img1.png",
                w: 200,
                h: 200,
              },
            }).id;
            shapeIdRef.current = id;
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(circle at center, rgba(17,49,93,0.18) 0.15rem, transparent 0.15rem)",
              backgroundSize: "4.8rem 4.8rem",
              pointerEvents: "none",
            }}
          />
        </Tldraw>
      </div>
    </div>
  );
};
