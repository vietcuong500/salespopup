import { useLayersStore } from "@/modules/workspaces/stories/workspaces";
import { InputUnit } from "./InputUnit";

export const Border = (props: any) => {
  const { settings } = props;
  const { styles } = settings;
  const updateLayers = useLayersStore((state) => state.updateLayers);
  return (
    <div className="flex flex-col gap-4" >
      <div className="flex flex-col gap-1 w-1/2">
        <p className="text-xs font-medium text-neutral-600 uppercase">Radius</p>
        <InputUnit
          value={styles?.borderRadius}
          onChange={(e) =>
            updateLayers(settings?.id, {
              borderRadius: +e.target.value,
            })
          }
        />
      </div>
    </div>
  );
};
