"use client";

import { BaseBoxShapeUtil, HTMLContainer, RecordProps, T, TLBaseShape } from "tldraw";
import React from "react";
import { Frame } from "@/shared/ui/components/Frame/Frame";

type IFrameShape = TLBaseShape<
  "my-frame-shape",
  {
    w: number;
    h: number;
    src: string;
  }
>;

export class FrameShape extends BaseBoxShapeUtil<IFrameShape> {
  static override type = "my-frame-shape" as const;
  static override props: RecordProps<IFrameShape> = {
    w: T.number,
    h: T.number,
    src: T.string,
  };

  override canEdit() {
    return true;
  }

  getDefaultProps(): IFrameShape["props"] {
    return {
      w: 200,
      h: 200,
      src: "/images/Gallery/img1.png", // можно менять через проп
    };
  }

  component(shape: IFrameShape) {
    const isEditing = this.editor.getEditingShapeId() === shape.id;

    return (
      <HTMLContainer
        id={shape.id}
        style={{
          width: shape.props.w,
          height: shape.props.h,
          pointerEvents: "all",
        }}
        onPointerDown={isEditing ? this.editor.markEventAsHandled : undefined}
      >
        <Frame src={shape.props.src} />
      </HTMLContainer>
    );
  }

  indicator(shape: IFrameShape) {
    return <rect width={shape.props.w} height={shape.props.h} />;
  }
}
