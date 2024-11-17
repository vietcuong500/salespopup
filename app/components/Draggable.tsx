"use client";

import React, { useRef, useState } from "react";
import { useDraggable } from "../hooks/useDraggable";
import { useResizable } from "../hooks/useResizable";

export const Draggable = (props: any) => {
  const { settings, handleActive, layerActive } = props;
  const [draggeableRef, dx, dy] = useDraggable();
  const [resizableRef, width, height] = useResizable();

  return (
    <div
      className="draggable resizable"
      style={{
        transform: `translate(${dx}px, ${dy}px)`,
        width: `${width}px`,
        height: `${height}px`,
      }}
      onClick={() => handleActive(settings?.id)}
    >
      <div
        style={{
          visibility: layerActive ? "visible" : "hidden",
        }}
        className="draggable__handle"
        ref={draggeableRef}
      >
        <div className="draggable__dot" />
        <div className="draggable__dot" />
        <div className="draggable__dot" />
      </div>

      <div
        style={{
          visibility: layerActive ? "visible" : "hidden",
        }}
        ref={resizableRef}
      >
        <div className="resizer resizer--l absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-black" />
        <div className="resizer resizer--r absolute right-0 top-1/2 translate-x-2/4 -translate-y-2/4 w-4 h-4 bg-black" />
        <div className="resizer resizer--b absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-black  " />
        <div className="resizer resizer--t absolute top-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-black  " />
      </div>

      <div className="draggable__content">Content</div>
    </div>
  );
};
