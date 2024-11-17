import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../ui/select";
import { InputUnit } from "./InputUnit";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { HexAlphaColorPicker } from "react-colorful";
import "./styles/index.css";
import { useState } from "react";
import { useLayersStore } from "@/modules/workspaces/stories/workspaces";

export const Typography = (props: any) => {
  const { settings } = props;
  const { styles, id } = settings;
  const updateLayers = useLayersStore((state) => state.updateLayers);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <p className="text-xs font-medium text-neutral-600 uppercase">
          font family
        </p>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-1 w-1/2">
          <p className="text-xs font-medium text-neutral-600 uppercase">
            font weight
          </p>
          <Select
            onValueChange={(value) =>
              updateLayers(settings?.id, {
                fontWeight: value,
              })
            }
          >
            <SelectTrigger value={styles?.fontWeight} className="w-full">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="300">Light</SelectItem>
              <SelectItem value="400">Regular</SelectItem>
              <SelectItem value="700">Bold</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1 w-1/2">
          <p className="text-xs font-medium text-neutral-600 uppercase">
            font size
          </p>
          <InputUnit
            value={styles?.fontSize}
            onChange={(e) =>
              updateLayers(settings?.id, {
                fontSize: +e.target.value,
              })
            }
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-xs font-medium text-neutral-600 uppercase">align</p>
        <div className="flex flex-row justify-around items-center w-full bg-neutral-100 h-8 rounded">
          <AlignLeft className="w-5 h-5 text-neutral-400" />
          <AlignCenter className="w-5 h-5 " />
          <AlignRight className="w-5 h-5 text-neutral-400" />
          <AlignJustify className="w-5 h-5 text-neutral-400" />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-xs font-medium text-neutral-600 uppercase">color</p>
        <Popover>
          <PopoverTrigger>
            <div className="flex flex-row p-3 gap-2 items-center w-full bg-neutral-100 h-8 rounded">
              <div
                className="w-5 h-5 rounded-md cursor-pointer"
                style={{
                  background: styles?.color,
                }}
              ></div>
              <p className="text-xs text-neutral-600">{styles?.color}</p>
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <HexAlphaColorPicker
              className="color-picker w-full"
              color={styles?.color}
              onChange={(newColor) =>
                updateLayers(settings?.id, {
                  color: newColor,
                })
              }
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
