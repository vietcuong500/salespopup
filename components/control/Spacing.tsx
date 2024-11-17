import { LockKeyholeOpen, LockKeyhole } from "lucide-react";
import { InputUnit } from "./InputUnit";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useLayersStore } from "@/modules/workspaces/stories/workspaces";

enum PositionLock {
  TOP = "TOP",
  LEFT = "LEFT",
  BOTTOM = "BOTTOM",
  RIGHT = "RIGHT",
}

const POSITION_LOCK_CONFIG = [
  {
    value: PositionLock.LEFT,
    classes: "left-0 -translate-y-1/2 top-1/2 h-1 w-8",
  },
  {
    value: PositionLock.TOP,
    classes: "left-1/2 -translate-x-1/2 top-0 h-8 w-1",
  },
  {
    value: PositionLock.RIGHT,
    classes: "right-0 -translate-y-1/2 top-1/2 h-1 w-8",
  },
  {
    value: PositionLock.BOTTOM,
    classes: "left-1/2 -translate-x-1/2 bottom-0 h-8 w-1",
  },
];

export const Spacing = (props: any) => {
  const { settings } = props;
  const { styles, id } = settings;
  const [isLock, setIsLock] = useState(false);
  const [position, setPosition] = useState<PositionLock[]>([]);
  const updateLayers = useLayersStore((state) => state.updateLayers);

  useEffect(() => {
    if (position.length === 4) setIsLock(true);
  }, [position]);

  return (
    <div>
      <div className="relative w-5/6 h-36 mx-auto">
        <InputUnit
          className="absolute bg-neutral-100 rounded left-0 top-1/2 -translate-y-1/2 w-16 text-xs text-center"
          placeholder="0px"
          value={styles?.paddingLeft}
          onChange={(e) => {
            updateLayers(settings?.id, {
              paddingLeft: +e.target.value,
            });
          }}
        />
        <InputUnit
          className="absolute bg-neutral-100 rounded top-0 left-1/2 -translate-x-1/2 w-16 text-xs text-center"
          placeholder="0px"
          value={styles?.paddingTop}
          onChange={(e) => {
            updateLayers(settings?.id, {
              paddingTop: +e.target.value,
            });
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-neutral-100 rounded flex items-center justify-center">
          {POSITION_LOCK_CONFIG.map(({ value, classes }) => (
            <div
              className={cn(
                "cursor-pointer absolute",
                classes,
                isLock || position.includes(value)
                  ? "bg-blue-500"
                  : "bg-neutral-200"
              )}
              key={value}
              onClick={() => {
                setIsLock(false);
                const isExist = position.find((el) => el === value);
                if (isExist) setPosition(position.filter((el) => el !== value));
                else setPosition([...position, value]);
              }}
            ></div>
          ))}

          <div
            className="w-6 h-6 bg-white flex items-center justify-center rounded absolute z-1 cursor-pointer"
            onClick={() => {
              setIsLock(!isLock);
              setPosition([]);
            }}
          >
            {isLock ? (
              <LockKeyhole className="w-4 h-4 text-neutral-800" />
            ) : (
              <LockKeyholeOpen className="w-4 h-4 text-neutral-800" />
            )}
          </div>
        </div>
        <InputUnit
          className="absolute bg-neutral-100 rounded right-0 top-1/2 -translate-y-1/2 w-16 text-xs text-center"
          placeholder="0px"
          value={styles?.paddingRight}
          onChange={(e) => {
            updateLayers(settings?.id, {
              paddingRight: +e.target.value,
            });
          }}
        />
        <InputUnit
          className="absolute bg-neutral-100 rounded bottom-0 left-1/2 -translate-x-1/2 w-16 text-xs text-center"
          placeholder="0px"
          value={styles?.paddingBottom}
          onChange={(e) => {
            updateLayers(settings?.id, {
              paddingBottom: +e.target.value,
            });
          }}
        />
      </div>
    </div>
  );
};
