import { Eye, EyeOff } from "lucide-react";
import { InputUnit } from "./InputUnit";
import { useLayersStore } from "@/modules/workspaces/stories/workspaces";

export const Size = (props: any) => {
  const { settings } = props;
  const { styles } = settings;
  const updateLayers = useLayersStore((state) => state.updateLayers);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-1 w-1/2">
          <p className="text-xs font-medium text-neutral-600 uppercase">
            width
          </p>
          <InputUnit
            value={styles?.width}
            onChange={(e) =>
              updateLayers(settings?.id, {
                width: +e.target.value,
              })
            }
          />
        </div>
        <div className="flex flex-col gap-1 w-1/2">
          <p className="text-xs font-medium text-neutral-600 uppercase">
            height
          </p>
          <InputUnit
            value={styles?.height}
            onChange={(e) =>
              updateLayers(settings?.id, {
                height: +e.target.value,
              })
            }
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-xs font-medium text-neutral-600 uppercase leading-7">
          overflow
        </p>
        <div className="flex flex-row justify-around items-center w-1/2 bg-neutral-100 h-7 rounded">
          <Eye className="w-5 h-5" />
          <EyeOff className="w-5 h-5 fill-neutral-800" />
        </div>
      </div>
    </div>
  );
};
