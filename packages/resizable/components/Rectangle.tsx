import React, { DetailedHTMLProps, MouseEventHandler, useEffect, useState } from "react";
import { OnDragMouseDown } from "../types";
import { LEFT_MOUSE_BUTTON } from "../utils";
import styles from "./ResizableBox.module.css";

interface RectangleProps
  extends DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  draggable: boolean;
  isActive: boolean;
  onDragMouseDown: OnDragMouseDown;
}

export const Rectangle = (props: RectangleProps) => {
  const { draggable, onDragMouseDown, isActive, ...htmlProps } = props;

  const [stylesCurrent, setStylesCurrent] = useState({
    boxShadow: "inset 0 0 0 0px",
  });

  const onMouseDownHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.button !== LEFT_MOUSE_BUTTON) return;
    e.preventDefault();
    document.body.style.cursor = "grabbing";
    onDragMouseDown?.(e);
  };

  useEffect(() => {
    if(isActive) {
      setStylesCurrent({
        boxShadow: "inset 0 0 0 1px",
      })
    }
    else {
      setStylesCurrent({
        boxShadow: "inset 0 0 0 0px",
      })
    }
  }, [isActive])

  return (
    <div
      className={styles.rectangle}
      {...htmlProps}
      style={stylesCurrent}
      onMouseEnter={() => {
        setStylesCurrent({
          boxShadow: "inset 0 0 0 1px",
        })
      }}
      onMouseLeave={() => {
        if(isActive) return;
        setStylesCurrent({
          boxShadow: "inset 0 0 0 0px",
        })
      }}
      onMouseDown={draggable ? onMouseDownHandler : undefined}
    />
  );
};
