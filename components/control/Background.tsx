import { HexAlphaColorPicker } from "react-colorful";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import "./styles/index.css";
import { useState } from "react";
import { useLayersStore } from "@/modules/workspaces/stories/workspaces";

export const Background = (props: any) => {
  const {} = props;
  const { settings } = props;
  const { styles, id } = settings;
  const updateLayers = useLayersStore((state) => state.updateLayers);

  return (
    <div>
      <div className="flex flex-col gap-1">
        <p className="text-xs font-medium text-neutral-600 uppercase">color</p>
        <Popover>
          <PopoverTrigger>
            <div className="flex flex-row p-3 gap-2 items-center w-full bg-neutral-100 h-8 rounded">
              <div
                className="w-5 h-5 rounded-md cursor-pointer"
                style={{
                  background: styles?.backgroundColor,
                }}
              ></div>
              <p className="text-xs text-neutral-600">{styles?.backgroundColor}</p>
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <HexAlphaColorPicker
              className="color-picker w-full"
              color={styles?.backgroundColor}
              onChange={(newColor) =>
                updateLayers(settings?.id, {
                  backgroundColor: newColor,
                })
              }
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
