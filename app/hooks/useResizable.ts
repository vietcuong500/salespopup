import React, { useCallback, useState, useEffect, useRef } from "react";

enum Direction {
  Left = "Left",
  Right = "Right", 
  Top = "Top",
  Bottom = "Bottom"
}

interface Position {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}

export const useResizable = (minWidth = 100, minHeight = 100) => {
  const [node, setNode] = useState<HTMLElement | null>(null);
  const positionRef = useRef<Position>({ x: 0, y: 0 });
  const [size, setSize] = useState<Size>({
    width: 100,
    height: 100,
  });

  const ref = useCallback((nodeEle: HTMLElement | null) => {
    setNode(nodeEle?.closest('.resizable'));
  }, []);

  const getDirection = (className: string): Direction => {
    if (className.includes("resizer--l")) return Direction.Left;
    if (className.includes("resizer--r")) return Direction.Right;
    if (className.includes("resizer--t")) return Direction.Top;
    return Direction.Bottom;
  };

  const calculateNewSize = (
    direction: Direction,
    originalSize: Size,
    originalPosition: Position,
    currentPosition: Position
  ): { newSize: Size; newPosition: Position } => {
    const dx = currentPosition.x - originalPosition.x;
    const dy = currentPosition.y - originalPosition.y;
    
    let newWidth = originalSize.width;
    let newHeight = originalSize.height;
    let newX = node?.offsetLeft || 0;
    let newY = node?.offsetTop || 0;

    switch (direction) {
      case Direction.Left:
        newWidth = Math.max(originalSize.width - dx, minWidth);
        newX = originalPosition.x + (originalSize.width - newWidth);
        break;
      case Direction.Right:
        newWidth = Math.max(originalSize.width + dx, minWidth);
        break;
      case Direction.Top:
        newHeight = Math.max(originalSize.height - dy, minHeight);
        newY = originalPosition.y + (originalSize.height - newHeight);
        break;
      case Direction.Bottom:
        newHeight = Math.max(originalSize.height + dy, minHeight);
        break;
    }

    return {
      newSize: { width: newWidth, height: newHeight },
      newPosition: { x: newX, y: newY }
    };
  };

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      if (!node) return;

      const direction = getDirection((e.target as HTMLElement).className);
      const startPos = { x: e.clientX, y: e.clientY };
      const originalSize = {
        width: node.offsetWidth,
        height: node.offsetHeight
      };
      const originalPosition = {
        x: node.offsetLeft,
        y: node.offsetTop
      };

      const handleMouseMove = (e: MouseEvent) => {
        requestAnimationFrame(() => {
          const currentPos = { x: e.clientX, y: e.clientY };
          const { newSize, newPosition } = calculateNewSize(
            direction,
            originalSize,
            startPos,
            currentPos
          );

        //   // Update position for left/top resizing
        //   if (direction === Direction.Left || direction === Direction.Top) {
        //     node.style.left = `${newPosition.x}px`;
        //     node.style.top = `${newPosition.y}px`;
        //   }

        //   // Update size
        //   node.style.width = `${newSize.width}px`;
        //   node.style.height = `${newSize.height}px`;
          setSize(newSize);
          updateCursor(direction);
        });
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        resetCursor();
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [node, minWidth, minHeight]
  );

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      e.preventDefault();
      if (!node) return;

      const direction = getDirection((e.target as HTMLElement).className);
      const touch = e.touches[0];
      const startPos = { x: touch.clientX, y: touch.clientY };
      const originalSize = {
        width: node.offsetWidth,
        height: node.offsetHeight
      };
      const originalPosition = {
        x: node.offsetLeft,
        y: node.offsetTop
      };

      const handleTouchMove = (e: TouchEvent) => {
        const touch = e.touches[0];
        requestAnimationFrame(() => {
          const currentPos = { x: touch.clientX, y: touch.clientY };
          const { newSize, newPosition } = calculateNewSize(
            direction,
            originalSize,
            startPos,
            currentPos
          );

          // Update position for left/top resizing
        //   if (direction === Direction.Left || direction === Direction.Top) {
        //     node.style.left = `${newPosition.x}px`;
        //     node.style.top = `${newPosition.y}px`;
        //   }

        //   // Update size
        //   node.style.width = `${newSize.width}px`;
        //   node.style.height = `${newSize.height}px`;
          setSize(newSize);
          updateCursor(direction);
        });
      };

      const handleTouchEnd = () => {
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
        resetCursor();
      };

      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    },
    [node, minWidth, minHeight]
  );

  const updateCursor = (direction: Direction) => {
    const cursors = {
      [Direction.Left]: 'ew-resize',
      [Direction.Right]: 'ew-resize',
      [Direction.Top]: 'ns-resize',
      [Direction.Bottom]: 'ns-resize'
    };
    document.body.style.cursor = cursors[direction];
    document.body.style.userSelect = 'none';
  };

  const resetCursor = () => {
    document.body.style.removeProperty('cursor');
    document.body.style.removeProperty('user-select');
  };

  useEffect(() => {
    if (!node) return;

    const resizerElements = node.querySelectorAll('.resizer');
    
    resizerElements.forEach((resizer) => {
      resizer.addEventListener('mousedown', handleMouseDown);
      resizer.addEventListener('touchstart', handleTouchStart, { passive: false });
    });

    return () => {
      resizerElements.forEach((resizer) => {
        resizer.removeEventListener('mousedown', handleMouseDown);
        resizer.removeEventListener('touchstart', handleTouchStart);
      });
    };
  }, [node, handleMouseDown, handleTouchStart]);

  return [ref, size.width, size.height] as const;
};