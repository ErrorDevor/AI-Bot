"use client";

import React, { useRef, useState, useEffect } from "react";

import { Tldraw, TLShapeId } from "tldraw";
import "tldraw/tldraw.css";

import { FrameShape } from "@/components/FrameShape/FrameShape";
import { FrameGroupLayout } from "../FrameGroupLayout/FrameGroupLayout";
import { whiteboardStore, FrameState } from "@/utils/state/state";

import css from "./Whiteboard.module.scss";

interface WhiteboardProps {
  frames?: string[];
}

export const WhiteboardFrame: React.FC<WhiteboardProps> = ({ frames = [] }) => {
  const editorRef = useRef<any>(null);
  const restoredIdsRef = useRef<Set<string>>(new Set());
  const initializedRef = useRef(false);
  const [mounted, setMounted] = useState(false);
  const customShapeUtils = [FrameShape];

  const TLDRAW_LICENSE_KEY = "tldraw-2026-02-22/WyIwN2VYYXhaSSIsWyIqIl0sMTYsIjIwMjYtMDItMjIiXQ.RRkit6PfOSg2Fc7zAOjwPq2aiRiRKiinhnjXYpOqN01wfIDIa5Thisthq97k/YTaRyhlHcKhngtLZspX27n3PQ"

  // useEffect(() => {
  //   localStorage.clear();
  //   whiteboardStore.setState({ frames: [], zoom: 1, panX: 0, panY: 0 });
  // }, []);

  useEffect(() => {
    const unsubscribe = whiteboardStore.subscribe((state) => {
      localStorage.setItem("whiteboard-state", JSON.stringify(state));
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className={css.whiteboard}>
      <div className="tldraw__editor">
        <div className={css.tldraw_container}>
          <Tldraw
            hideUi
            shapeUtils={customShapeUtils}
            licenseKey={TLDRAW_LICENSE_KEY}
            onMount={(editor) => {
              editorRef.current = editor;
              setMounted(true);

              if (initializedRef.current) return;
              initializedRef.current = true;

              const saved = localStorage.getItem("whiteboard-state");
              if (saved) {
                const state = JSON.parse(saved) as {
                  zoom: number;
                  panX: number;
                  panY: number;
                  frames: FrameState[];
                };
                whiteboardStore.setState(state);

                editor.setCamera({
                  x: state.panX,
                  y: state.panY,
                  z: state.zoom,
                });

                state.frames.forEach((f) => {
                  const shapeId = f.id as TLShapeId;
                  if (!editor.getShape(shapeId)) {
                    editor.createShape({
                      id: shapeId,
                      type: "my-frame-shape",
                      x: f.x ?? 0,
                      y: f.y ?? 0,
                      props: { w: f.w ?? 180, h: f.h ?? 180, src: f.src ?? "" },
                    });
                  }
                  restoredIdsRef.current.add(f.src);
                });
              }

              editor.store.listen(
                () => {
                  const shapes = editor
                    .getCurrentPageShapes()
                    .filter((s) => s.type === "my-frame-shape")
                    .map((s) => ({
                      id: s.id,
                      x: s.x,
                      y: s.y,
                      w: (s.props as any).w,
                      h: (s.props as any).h,
                      src: (s.props as any).src,
                    }));
                  whiteboardStore.getState().setFrames(shapes);

                  const cam = editor.getCamera();
                  whiteboardStore
                    .getState()
                    .setCanvasTransform(editor.getZoomLevel(), cam.x, cam.y);
                },
                { source: "user", scope: "all" }
              );
            }}
          >
            {mounted && initializedRef.current && frames.length > 0 && (
              <FrameGroupLayout
                editor={editorRef.current}
                frames={frames.filter((src) => {
                  if (restoredIdsRef.current.has(src)) return false;
                  restoredIdsRef.current.add(src);
                  return true;
                })}
              />
            )}

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
    </div>
  );
};
