import React, {
  CSSProperties,
  DetailedHTMLProps,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  OnDragHandler,
  OnDragEndHandler,
  OnResizeHandler,
  OnRotateHandler,
  OnDragStartHandler,
  OnResizeStartHandler,
  OnResizeEndHandler,
  OnRotateStartHandler,
  OnRotateEndHandler,
} from "../types";
import classnames from "classnames";
import useDrag from "../hooks/useDrag";
import useResize from "../hooks/useResize";
import useRotate from "../hooks/useRotate";
import { Rectangle } from "./Rectangle";
import { MoveHandler } from "./MoveHandler";
import { ResizeHandler } from "./ResizeHandler";
import { RotateHandler } from "./RotateHandler";
import {
  getParametricPos,
  getResizeCursors,
  rotatePoint,
  topLeft2Center,
} from "../utils";
import styles from "./ResizableBox.module.css";
import useClickOutside from "@/hooks/useClickOutside";
import { Toolbox } from "@/modules/workspaces/components/Toolbox/Toolbox";

export interface ResizableBoxProps
  extends Omit<
    DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    | "onDrag"
    | "onDragEnd"
    | "onResize"
    | "onResizeEnd"
    | "onRotate"
    | "onRotateEnd"
  > {
  /**
   * The width of the box.
   */
  width: number;
  /**
   * The height of the box.
   */
  height: number;
  /**
   * The left position of the box.
   */
  left: number;
  /**
   * The top position of the box.
   */
  top: number;
  /**
   * The rotation of the box in degrees.
   */
  rotationDeg?: number;
  /**
   * The scale to use for dragging and resizing the box. Defaults to 1.
   */
  scale?: number;
  /**
   * The color of the box.
   */
  color?: CSSProperties["color"];
  /**
   * Whether the box is draggable.
   */
  draggable?: boolean;
  /**
   * Whether to show the drag handler.
   */
  dragHandler?: boolean;
  /**
   * Custom styles for the drag handler.
   */
  dragHandlerStyles?: CSSProperties;
  /**
   * The absolute position of the drag handler in degrees.
   * If relativeHandlers is true, the position is measured relative to the box vertical axis.
   */
  dragHandlerDeg?: number;
  /**
   * Whether the box is resizable.
   */
  resizable?: boolean;
  /**
   * Custom styles for the resize handlers.
   */
  resizeHandlerStyles?: CSSProperties;
  /**
   * The aspect ratio of the box.
   */
  aspectRatio?: boolean | number;
  /**
   * Whether the box is rotatable.
   */
  rotatable?: boolean;
  /**
   * Custom styles for the rotate handler.
   */
  rotateHandlerStyles?: CSSProperties;
  /**
   * The snap angle in degrees.
   */
  snapAngle?: number | boolean;
  /**
   * The absolute position of the rotate handler in degrees.
   * If relativeHandlers is true, the position is measured relative to the box vertical axis.
   */
  rotateHandlerDeg?: number;
  /**
   * The minimum width of the box.
   */
  minWidth?: number;
  /**
   * The minimum height of the box.
   */
  minHeight?: number;
  /**
   * The offset between the move and rotate handlers to the edges of the box.
   */
  handlersOffset?: number;
  /**
   * The minimum distance where all the handlers will start to space out.
   *
   * If the width or height of the box is less than this value, the handlers will
   * keep the distance as if the box where this value.
   */
  handlersSpaceOut?: number;
  /**
   * Whether the handlers are relative to the box vertical axis.
   * Defaults to true.
   */
  relativeHandlers?: boolean;
  /**
   * The callback fired when the box starts to be dragged.
   */
  onDragStart?: OnDragStartHandler;
  /**
   * The callback fired when the box is being dragged.
   */
  onDrag?: OnDragHandler;
  /**
   * The callback fired when the box stops being dragged.
   */
  onDragEnd?: OnDragEndHandler;
  /**
   * The callback fired when the box starts to be resized.
   */
  onResizeStart?: OnResizeStartHandler;
  /**
   * The callback fired when the box is being resized.
   */
  onResize?: OnResizeHandler;
  /**
   * The callback fired when the box stops being resized.
   */
  onResizeEnd?: OnResizeEndHandler;
  /**
   * The callback fired when the box starts to be rotated.
   */
  onRotateStart?: OnRotateStartHandler;
  /**
   * The callback fired when the box is being rotated.
   */
  onRotate?: OnRotateHandler;
  /**
   * The callback fired when the box stops being rotated.
   */
  onRotateEnd?: OnRotateEndHandler;
}

export const ResizableBox = (props: ResizableBoxProps) => {
  const {
    width,
    height,
    left,
    top,
    rotationDeg = 0,
    scale = 1,
    color,
    draggable = true,
    dragHandler = false,
    dragHandlerStyles = {},
    dragHandlerDeg = 180,
    resizable = true,
    aspectRatio = false,
    rotatable = true,
    rotateHandlerStyles = {},
    snapAngle = 45,
    rotateHandlerDeg = 0,
    minWidth = 10,
    minHeight = 10,
    handlersOffset = 20,
    handlersSpaceOut = 0,
    relativeHandlers = true,
    id,
    resizeHandlerStyles: handlerStyles = {},
    onDragStart,
    onDrag,
    onDragEnd,
    onResizeStart,
    onResize,
    onResizeEnd,
    onRotateStart,
    onRotate,
    onRotateEnd,
    onClick,
    ...htmlProps
  } = props;

  const resizableRef = useRef<HTMLDivElement>(null);

  const [layerActive, setLayerActive] = useState(false);

  const [onDragMouseDown, isDragging] = useDrag({
    styles: { left, top },
    scale,
    onDragStart,
    onDrag,
    onDragEnd,
  });
  const [onResizeMouseDown, isResizing] = useResize({
    styles: { left, top, width, height, rotationDeg },
    scale,
    minHeight,
    minWidth,
    aspectRatio,
    onResizeStart,
    onResize,
    onResizeEnd,
  });
  const [onRotateMouseDown, isRotating] = useRotate({
    styles: { top, left, width, height, rotationDeg },
    resizableRef,
    snapAngle,
    onRotateStart,
    onRotate,
    onRotateEnd,
  });

  /**
   * The computed offsets for the handlers from the edge of the box, calculated from the
   * {@link handlersSpaceOut} and {@link handlersOffset} values.
   */
  const offsets = useMemo(
    () => ({
      left: width < handlersSpaceOut ? (handlersSpaceOut - width) / 2 : 0,
      top: height < handlersSpaceOut ? (handlersSpaceOut - height) / 2 : 0,
    }),
    [width, height, handlersSpaceOut]
  );

  /**
   * The center of the box.
   */
  const rectangleCenter = useMemo(() => {
    const center = topLeft2Center(top, left, width, height);

    return {
      top: center.y,
      left: center.x,
    };
  }, [top, left, width, height]);

  /**
   * The position of the rotate handler, relative to the box.
   */
  const rotateHandlerPos = useMemo(() => {
    const parametricPos = getParametricPos(
      width,
      height,
      rotateHandlerDeg - (relativeHandlers ? 0 : rotationDeg),
      handlersOffset + offsets.left,
      handlersOffset + offsets.top
    );

    return rotatePoint(
      rectangleCenter.left,
      rectangleCenter.top,
      left + parametricPos.left,
      top + parametricPos.top,
      rotationDeg
    );
  }, [
    isRotating,
    left,
    top,
    width,
    height,
    rotationDeg,
    rotateHandlerDeg,
    relativeHandlers,
    handlersOffset,
    offsets,
  ]);

  /**
   * The position of the drag handler, relative to the box.
   */
  const dragHandlerPos = useMemo(() => {
    const parametricPos = getParametricPos(
      width,
      height,
      dragHandlerDeg - (relativeHandlers ? 0 : rotationDeg),
      handlersOffset + offsets.left,
      handlersOffset + offsets.top
    );

    return rotatePoint(
      rectangleCenter.left,
      rectangleCenter.top,
      left + parametricPos.left,
      top + parametricPos.top,
      rotationDeg
    );
  }, [
    isRotating,
    left,
    top,
    width,
    height,
    rotationDeg,
    dragHandlerDeg,
    relativeHandlers,
    handlersOffset,
    offsets,
  ]);

  /**
   * The curret cursor when dragging.
   */
  const dragCursor = useMemo((): CSSProperties["cursor"] => {
    if (!draggable || isResizing || isRotating) return;
    if (!isDragging) return "grab";
    return "grabbing";
  }, [draggable, isResizing, isRotating, isDragging]);

  /**
   * The corresponding cursors for the resize handlers.
   */
  const resizeCursors: any = useMemo(() => {
    if (!resizable || isDragging || isRotating) return {};
    return getResizeCursors(rotationDeg);
  }, [resizable, isDragging, isRotating, rotationDeg]);

  /**
   * The current cursor for the rotate handler.
   */
  const rotateCursor = useMemo((): CSSProperties["cursor"] => {
    if (!rotatable || isDragging || isResizing) return;
    if (!isRotating) return "pointer";
    return "grabbing";
  }, [rotatable, isDragging, isResizing, isRotating]);

  const rotateRef = useRef<HTMLDivElement>(null);
  const resize1Ref = useRef<HTMLDivElement>(null);
  const resize2Ref = useRef<HTMLDivElement>(null);
  const resize3Ref = useRef<HTMLDivElement>(null);
  const resize4Ref = useRef<HTMLDivElement>(null);
  const resize5Ref = useRef<HTMLDivElement>(null);
  const resize6Ref = useRef<HTMLDivElement>(null);
  const resize7Ref = useRef<HTMLDivElement>(null);
  const resize8Ref = useRef<HTMLDivElement>(null);
  const toolboxRef = useRef<HTMLDivElement>(null);

  useClickOutside(
    resizableRef,
    () => {
      setLayerActive(false);
    },
    [
      rotateRef,
      resize1Ref,
      resize2Ref,
      resize3Ref,
      resize4Ref,
      resize5Ref,
      resize6Ref,
      resize7Ref,
      resize8Ref,
      toolboxRef,
    ]
  );

  const [resizeCursorCurrent, setResizeCursorCurrent] = useState("");

  useEffect(() => {
    if (!isResizing) setResizeCursorCurrent("");
  }, [isResizing]);

  return (
    <>
      <div
        {...htmlProps}
        className={classnames(styles.mainContainer, htmlProps.className)}
        ref={resizableRef}
        style={{
          left,
          top,
          width,
          height,
          overflow: "visible",
          transform: `rotate(${rotationDeg}deg)`,
          ...htmlProps.style,
        }}
        onClick={() => {
          onClick(id);
          setLayerActive(true);
        }}
      >
        {props.children}
        <Rectangle
          onDragMouseDown={(e) => {
            setLayerActive(true);
            onDragMouseDown(e);
            onClick(id);
          }}
          draggable={draggable}
          isActive={!!layerActive}
          style={{ color, cursor: dragCursor }}
        />
      </div>
      {draggable && dragHandler && (
        <MoveHandler
          style={{
            fill: color,
            cursor: dragCursor,
            ...dragHandlerStyles,
            ...dragHandlerPos,
          }}
          onDragMouseDown={(e) => {
            setLayerActive(true);
            onDragMouseDown(e);
            onClick(id);
          }}
        />
      )}
      {layerActive && rotatable && !isResizing && (
        <div ref={rotateRef}>
          <RotateHandler
            style={{
              fill: color,
              cursor: rotateCursor,
              ...rotateHandlerStyles,
              // ...rotateHandlerPos,
              ...rotatePoint(
                rectangleCenter.left,
                rectangleCenter.top,
                left + width / 2,
                top + height + offsets.top + 20,
                rotationDeg
              ),
            }}
            onRotateMouseDown={onRotateMouseDown}
          />
        </div>
      )}
      <>
        {layerActive && !isRotating && !isDragging && !isResizing && (
          <div ref={toolboxRef}>
            <Toolbox
              style={{
                ...rotatePoint(
                  rectangleCenter.left,
                  rectangleCenter.top,
                  left + (width - 200) / 2,
                  top - 50,
                  rotationDeg
                ),
                width: 200,
              }}
              id={id}
            />
          </div>
        )}
      </>
      {layerActive && resizable && !isRotating && (
        <>
          <div
            ref={resize1Ref}
            id="cursor-top-left"
            style={{
              visibility:
                (resizeCursorCurrent === "nw" && isResizing) || !isResizing
                  ? "visible"
                  : "hidden",
            }}
          >
            <ResizeHandler
              rotationDeg={rotationDeg}
              style={{
                ...handlerStyles,
                ...rotatePoint(
                  rectangleCenter.left,
                  rectangleCenter.top,
                  left - offsets.left,
                  top - offsets.top,
                  rotationDeg
                ),
                color,
                cursor: resizeCursors["nw"],
                borderRadius: "100%",
              }}
              type="nw"
              onMouseDownCapture={() => {
                setResizeCursorCurrent("nw");
              }}
              onResizeMouseDown={onResizeMouseDown}
            />
          </div>
          <div
            ref={resize2Ref}
            style={{
              visibility:
                (resizeCursorCurrent === "n" && isResizing) || !isResizing
                  ? "visible"
                  : "hidden",
            }}
          >
            <ResizeHandler
              rotationDeg={rotationDeg}
              style={{
                ...handlerStyles,
                ...rotatePoint(
                  rectangleCenter.left,
                  rectangleCenter.top,
                  left + width / 2,
                  top - offsets.top,
                  rotationDeg
                ),
                color,
                cursor: resizeCursors["n"],
                width: 18,
                height: 6,
                borderRadius: 4,
              }}
              type="n"
              onMouseDownCapture={() => setResizeCursorCurrent("n")}
              onResizeMouseDown={onResizeMouseDown}
            />
          </div>
          <div
            ref={resize3Ref}
            style={{
              visibility:
                (resizeCursorCurrent === "ne" && isResizing) || !isResizing
                  ? "visible"
                  : "hidden",
            }}
          >
            <ResizeHandler
              rotationDeg={rotationDeg}
              style={{
                ...handlerStyles,
                ...rotatePoint(
                  rectangleCenter.left,
                  rectangleCenter.top,
                  left + width + offsets.left,
                  top - offsets.top,
                  rotationDeg
                ),
                color,
                cursor: resizeCursors["ne"],
                borderRadius: "100%",
              }}
              type="ne"
              onMouseDownCapture={() => setResizeCursorCurrent("ne")}
              onResizeMouseDown={onResizeMouseDown}
            />
          </div>

          <div
            ref={resize4Ref}
            style={{
              visibility:
                (resizeCursorCurrent === "w" && isResizing) || !isResizing
                  ? "visible"
                  : "hidden",
            }}
          >
            <ResizeHandler
              rotationDeg={rotationDeg}
              style={{
                ...handlerStyles,
                ...rotatePoint(
                  rectangleCenter.left,
                  rectangleCenter.top,
                  left - offsets.left,
                  top + height / 2,
                  rotationDeg
                ),
                color,
                cursor: resizeCursors["w"],
                width: 6,
                height: 18,
                borderRadius: 4,
              }}
              type="w"
              onMouseDownCapture={() => setResizeCursorCurrent("w")}
              onResizeMouseDown={onResizeMouseDown}
            />
          </div>
          <div
            ref={resize5Ref}
            style={{
              visibility:
                (resizeCursorCurrent === "e" && isResizing) || !isResizing
                  ? "visible"
                  : "hidden",
            }}
          >
            <ResizeHandler
              rotationDeg={rotationDeg}
              style={{
                ...handlerStyles,
                ...rotatePoint(
                  rectangleCenter.left,
                  rectangleCenter.top,
                  left + width + offsets.left,
                  top + height / 2,
                  rotationDeg
                ),
                color,
                cursor: resizeCursors["e"],
                width: 6,
                height: 18,
                borderRadius: 4,
              }}
              type="e"
              onMouseDownCapture={() => setResizeCursorCurrent("e")}
              onResizeMouseDown={onResizeMouseDown}
            />
          </div>
          <div
            ref={resize6Ref}
            style={{
              visibility:
                (resizeCursorCurrent === "sw" && isResizing) || !isResizing
                  ? "visible"
                  : "hidden",
            }}
          >
            <ResizeHandler
              rotationDeg={rotationDeg}
              style={{
                ...handlerStyles,
                ...rotatePoint(
                  rectangleCenter.left,
                  rectangleCenter.top,
                  left - offsets.left,
                  top + height + offsets.top,
                  rotationDeg
                ),
                color,
                cursor: resizeCursors["sw"],
                borderRadius: "100%",
              }}
              type="sw"
              onMouseDownCapture={() => setResizeCursorCurrent("sw")}
              onResizeMouseDown={onResizeMouseDown}
            />
          </div>

          <div
            ref={resize7Ref}
            style={{
              visibility:
                (resizeCursorCurrent === "s" && isResizing) || !isResizing
                  ? "visible"
                  : "hidden",
            }}
          >
            <ResizeHandler
              rotationDeg={rotationDeg}
              style={{
                ...handlerStyles,
                ...rotatePoint(
                  rectangleCenter.left,
                  rectangleCenter.top,
                  left + width / 2,
                  top + height + offsets.top,
                  rotationDeg
                ),
                color,
                cursor: resizeCursors["s"],
                width: 18,
                height: 6,
                borderRadius: 4,
              }}
              type="s"
              onMouseDownCapture={() => setResizeCursorCurrent("s")}
              onResizeMouseDown={onResizeMouseDown}
            />
          </div>
          <div
            className=""
            ref={resize8Ref}
            style={{
              visibility:
                (resizeCursorCurrent === "se" && isResizing) || !isResizing
                  ? "visible"
                  : "hidden",
            }}
          >
            <ResizeHandler
              rotationDeg={rotationDeg}
              style={{
                ...handlerStyles,
                ...rotatePoint(
                  rectangleCenter.left,
                  rectangleCenter.top,
                  left + width + offsets.left,
                  top + height + offsets.top,
                  rotationDeg
                ),
                color,
                cursor: resizeCursors["se"],
                borderRadius: "100%",
              }}
              type="se"
              onMouseDownCapture={() => setResizeCursorCurrent("se")}
              onResizeMouseDown={onResizeMouseDown}
            />
          </div>
        </>
      )}
    </>
  );
};
