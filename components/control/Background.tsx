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
      <div className="flex flex-row items-center">
        <p className="text-xs font-medium text-neutral-600 uppercase w-2/5">color</p>
        <Popover >
          <PopoverTrigger className="w-3/5" >
            <div className="flex flex-row p-3 gap-2 items-center bg-neutral-100 h-8 rounded w-full">
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
