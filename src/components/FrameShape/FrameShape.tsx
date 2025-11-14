import {
  BaseBoxShapeUtil,
  HTMLContainer,
  RecordProps,
  T,
  TLBaseShape,
} from "tldraw";

import { Frame } from "@/shared/ui/components/Frame/Frame";

export type IFrameShape = TLBaseShape<
  "my-frame-shape",
  { w: number; h: number; src: string }
>;

export class FrameShape extends BaseBoxShapeUtil<IFrameShape> {
  static override type = "my-frame-shape" as const;
  static override props: RecordProps<IFrameShape> = {
    w: T.number,
    h: T.number,
    src: T.string,
  };

  fixedSize = true;

  override canEdit() {
		return false
	}
  
	override canResize() {
		return true
	}

  getDefaultProps(): IFrameShape["props"] {
    return { w: 180, h: 180, src: "/images/Gallery/img1.png" };
  }

  component(shape: IFrameShape) {
    const { w, h, src } = shape.props;
    const isEditing = this.editor.getEditingShapeId() === shape.id;

    return (
      <HTMLContainer
        id={shape.id}
        style={{
          width: w,
          height: h,
          overflow: "hidden",
          pointerEvents: "all",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onPointerDown={isEditing ? this.editor.markEventAsHandled : undefined}
      >
        <Frame
          src={src}
          onLoaded={(naturalW, naturalH) => {
            if (this.fixedSize) return;

            if (!naturalW || !naturalH) return;

            const aspect = naturalH / naturalW;
            const newH = Math.round(w * aspect);

            if (Math.abs(newH - h) > 1) {
              this.editor.updateShape({
                id: shape.id,
                type: shape.type,
                props: { ...shape.props, h: newH },
              });
            }

            const editorAny = this.editor as any;
            if (typeof editorAny.__scheduleRecalcLayout === "function") {
              editorAny.__scheduleRecalcLayout();
            }
          }}
        />
      </HTMLContainer>
    );
  }

  indicator(shape: IFrameShape) {
    return <rect width={shape.props.w} height={shape.props.h} rx={8} ry={8} />;
  }
}
