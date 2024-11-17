import { cn } from "@/lib/utils";
import { useState } from "react";
import { InputUnit } from "./InputUnit";
import { useLayersStore } from "@/modules/workspaces/stories/workspaces";

enum Directions {
  TOP_LEFT = "topLeft",
  TOP_CENTER = "topCenter",
  TOP_RIGHT = "topRight",
  MIDDLE_LEFT = "middleLeft",
  MIDDLE_CENTER = "middleCenter",
  MIDDLE_RIGHT = "middleRight",
  BOTTOM_LEFT = "bottomLeft",
  BOTTOM_CENTER = "bottomCenter",
  BOTTOM_RIGHT = "bottomRight",
}

const POSITION_CONFIG = [
  {
    value: Directions.TOP_LEFT,
    positionClasses: "left-2 top-2",
  },
  {
    value: Directions.MIDDLE_LEFT,
    positionClasses: "left-2 top-1/2 -translate-y-1/2",
  },
  {
    value: Directions.BOTTOM_LEFT,
    positionClasses: "left-2 bottom-2",
  },
  {
    value: Directions.TOP_CENTER,
    positionClasses: "left-1/2 -translate-x-1/2 top-2",
  },
  {
    value: Directions.MIDDLE_CENTER,
    positionClasses: "left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2",
  },
  {
    value: Directions.BOTTOM_CENTER,
    positionClasses: "left-1/2 -translate-x-1/2 bottom-2",
  },
  {
    value: Directions.TOP_RIGHT,
    positionClasses: "right-2 top-2",
  },
  {
    value: Directions.MIDDLE_RIGHT,
    positionClasses: "right-2 top-1/2 -translate-y-1/2",
  },
  {
    value: Directions.BOTTOM_RIGHT,
    positionClasses: "right-2 bottom-2",
  },
];

const WIDTH_POPUP = 480;
const HEIGHT_POPUP = 300;

export const Position = (props: any) => {
  const { settings } = props;
  const updateLayers = useLayersStore((state) => state.updateLayers);
  const [position, setPosition] = useState(Directions.TOP_LEFT);

  const handleChangePosition = (value: Directions) => {
    const height = settings?.styles?.height;
    const width = settings?.styles?.width;

    switch (value) {
      case Directions.TOP_LEFT: {
        updateLayers(settings?.id, {
          top: 0,
          left: 0,
        });
        return;
      }
      case Directions.MIDDLE_LEFT: {
        const top = (HEIGHT_POPUP - height) / 2;
        updateLayers(settings?.id, {
          top,
          left: 0,
        });
        return;
      }
      case Directions.BOTTOM_LEFT: {
        updateLayers(settings?.id, {
          top: HEIGHT_POPUP - height,
          left: 0,
        });
        return;
      }
      case Directions.TOP_CENTER: {
        updateLayers(settings?.id, {
          top: 0,
          left: (WIDTH_POPUP - width) / 2,
        });
        return;
      }
      case Directions.MIDDLE_CENTER: {
        updateLayers(settings?.id, {
          top: (HEIGHT_POPUP - height) / 2,
          left: (WIDTH_POPUP - width) / 2,
        });
        return;
      }

      case Directions.BOTTOM_CENTER: {
        updateLayers(settings?.id, {
          top: HEIGHT_POPUP - height,
          left: (WIDTH_POPUP - width) / 2,
        });
        return;
      }
      case Directions.TOP_RIGHT: {
        updateLayers(settings?.id, {
          top: 0,
          left: WIDTH_POPUP - width,
        });
        return;
      }
      case Directions.MIDDLE_RIGHT: {
        updateLayers(settings?.id, {
          top: (HEIGHT_POPUP - height) / 2,
          left: WIDTH_POPUP - width,
        });
        return;
      }
      case Directions.BOTTOM_RIGHT: {
        updateLayers(settings?.id, {
          top: HEIGHT_POPUP - height,
          left: WIDTH_POPUP - width,
        });
        return;
      }
      default:
        return;
    }
  };
  return (
    <div className="flex flex-row gap-4 h-28">
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold text-neutral-800">X</p>
          <InputUnit
            className="w-16"
            placeholder="0"
            value={settings?.styles?.top}
            onChange={(e) => {
              updateLayers(settings?.id, {
                top: +e.target.value,
              });
            }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold text-neutral-800">Y</p>
          <InputUnit
            className="w-16"
            placeholder="0"
            value={settings?.styles?.left}
            onChange={(e) => {
              updateLayers(settings?.id, {
                left: +e.target.value,
              });
            }}
          />
        </div>
      </div>
      <div className="w-full h-full rounded-lg bg-neutral-100 p-2 relative">
        {POSITION_CONFIG.map(({ value, positionClasses }) => (
          <div
            key={value}
            className={cn(
              "w-4 h-4 cursor-pointer rounded absolute ",
              positionClasses,
              position === value ? "bg-blue-500" : "bg-neutral-300"
            )}
            onClick={() => handleChangePosition(value)}
          />
        ))}
      </div>
    </div>
  );
};
