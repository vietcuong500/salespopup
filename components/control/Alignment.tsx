import { cn } from "@/lib/utils";
import { useLayersStore } from "@/modules/workspaces/stories/workspaces";
import {
  AlignStartVertical,
  AlignCenterVertical,
  AlignEndVertical,
  AlignStartHorizontal,
  AlignCenterHorizontal,
  AlignEndHorizontal,
} from "lucide-react";
import { useEffect, useState } from "react";

enum AlignType {
  START = "start",
  CENTER = "center",
  END = "end",
}

const verticalAlignments = [
  { Icon: AlignStartVertical, value: AlignType.START },
  { Icon: AlignCenterVertical, value: AlignType.CENTER },
  { Icon: AlignEndVertical, value: AlignType.END },
];

const horizontalAlignments = [
  { Icon: AlignStartHorizontal, value: AlignType.START },
  { Icon: AlignCenterHorizontal, value: AlignType.CENTER },
  { Icon: AlignEndHorizontal, value: AlignType.END },
];

const AlignmentItem = ({ Icon, isActive, onClick }) => (
  <Icon
    onClick={onClick}
    className={cn(
      "w-4 h-4 text-neutral-800 cursor-pointer transition duration-300",
      isActive && "fill-neutral-800"
    )}
  />
);

export const Alignment = (props: any) => {
  const { settings } = props;
  const { styles } = settings;
  const [alignVertical, setAlignVertical] = useState(
    styles?.justifyContent ?? "center"
  );
  const [alignHorizontal, setAlignHorizontal] = useState(
    styles?.alignItems ?? "center"
  );

  useEffect(() => {
    setAlignVertical(styles?.justifyContent);
    setAlignHorizontal(styles?.alignItems);
  }, [styles]);

  const updateLayers = useLayersStore((state) => state.updateLayers);

  return (
    <div className="flex flex-row justify-between gap-12">
      <div className="flex flex-row justify-between w-1/2">
        {verticalAlignments.map(({ Icon, value }) => (
          <AlignmentItem
            key={value}
            Icon={Icon}
            isActive={alignVertical === value}
            onClick={() => {
              updateLayers(settings?.id, {
                justifyContent: value,
              });
            }}
          />
        ))}
      </div>
      <div className="flex flex-row justify-between w-1/2">
        {horizontalAlignments.map(({ Icon, value }) => (
          <AlignmentItem
            key={value}
            Icon={Icon}
            isActive={alignHorizontal === value}
            onClick={() =>
              updateLayers(settings?.id, {
                alignItems: value,
              })
            }
          />
        ))}
      </div>
    </div>
  );
};
