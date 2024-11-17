import {
  OnDragEndHandler,
  OnDragHandler,
  OnResizeHandler,
  OnResizeEndHandler,
  OnRotateHandler,
  OnRotateEndHandler,
  ResizableBox,
} from "@/packages/resizable";
import { useEffect, useState } from "react";

const DynamicContentComponent = ({
  type,
  styles,
  settings,
}: {
  type: string;
  styles: any;
  settings?: any;
}) => {
  switch (type) {
    case "Button":
      return (
        <button
          className="w-full h-full bg-slate-200 text-black inline-flex"
          style={{
            alignItems: styles?.alignItems,
            justifyContent: styles?.justifyContent,
            paddingLeft: styles?.paddingLeft,
            paddingTop: styles?.paddingTop,
            paddingRight: styles?.paddingRight,
            paddingBlock: styles?.paddingBottom,
            backgroundColor: styles?.backgroundColor,
            color: styles?.color,
            fontSize: styles?.fontSize,
            fontWeight: styles?.fontWeight,
            borderRadius: styles?.borderRadius,
            opacity: Number(styles?.opacity) / 100,
          }}
        >
          {settings?.content}
        </button>
      );
    case "Image":
      return (
        <img
          src="https://cdn.img.ly/assets/demo/v2/ly.img.image/thumbnails/sample_10.jpg"
          alt="hsdkj"
          className="w-full h-full object-cover"
        ></img>
      );
    case "Box":
      return (
        <div
          className="w-full h-full bg-slate-200 text-black inline-flex"
          style={{
            alignItems: styles?.alignItems,
            justifyContent: styles?.justifyContent,
            paddingLeft: styles?.paddingLeft,
            paddingTop: styles?.paddingTop,
            paddingRight: styles?.paddingRight,
            paddingBlock: styles?.paddingBottom,
            backgroundColor: styles?.backgroundColor,
            color: styles?.color,
            fontSize: styles?.fontSize,
            fontWeight: styles?.fontWeight,
            borderRadius: styles?.borderRadius,
            opacity: Number(styles?.opacity) / 100,
          }}
        ></div>
      );
    default:
      return <div>Default Content</div>;
  }
};

function splitValueAndUnit(input: string) {
  const match = input.match(/^(\d+)(\D+)$/);
  if (!match) return null;

  const value = parseInt(match[1], 10);
  const unit = match[2];

  return { value, unit };
}

export const Demo = (props: any) => {
  const { settings, onClick, handleUpdateLayer } = props;
  const { elementTag, id, styles } = settings;
  const [width, setWidth] = useState(styles?.width ?? 100);
  const [height, setHeight] = useState(styles?.height ?? 100);
  const [left, setLeft] = useState(styles?.left ?? 100);
  const [top, setTop] = useState(styles?.top ?? 100);
  const [angle, setAngle] = useState(styles?.rotate ?? 0);

  useEffect(() => {
    setWidth(styles?.width);
    setHeight(styles?.height);
    setTop(styles?.top);
    setLeft(styles?.left);
    setAngle(styles?.rotate);
  }, [styles]);

  const onDragHandler: OnDragHandler = (e) => {
    setLeft(e.style.left);
    setTop(e.style.top);
  };

  const onDragEndHandler: OnDragEndHandler = (e) => {
    handleUpdateLayer(id, {
      top: e.style.top,
      left: e.style.left,
    });
  };

  const onResizeHandler: OnResizeHandler = (e) => {
    setLeft(e.style.left);
    setTop(e.style.top);
    setWidth(e.style.width);
    setHeight(e.style.height);
  };

  const onResizeEndHandler: OnResizeEndHandler = (e) => {
    handleUpdateLayer(id, {
      top: e.style.top,
      left: e.style.left,
      width: e.style.width,
      height: e.style.height,
    });
  };

  const onRotateHandler: OnRotateHandler = (e) => {
    setAngle(e.style.rotationDeg);
  };

  const onRotateEndHandler: OnRotateEndHandler = (e) => {
    handleUpdateLayer(id, {
      rotate: e.style.rotationDeg,
    });
  };

  return (
    <ResizableBox
      width={width}
      height={height}
      left={left}
      top={top}
      rotationDeg={angle}
      onDrag={onDragHandler}
      onDragEnd={onDragEndHandler}
      onResize={onResizeHandler}
      onResizeEnd={onResizeEndHandler}
      onRotate={onRotateHandler}
      onRotateEnd={onRotateEndHandler}
      onClick={onClick}
      id={id}
    >
      <DynamicContentComponent
        type={elementTag}
        styles={styles}
        settings={settings?.settings}
      />
    </ResizableBox>
  );
};
