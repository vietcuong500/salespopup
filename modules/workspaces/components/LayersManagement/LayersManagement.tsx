import { Eye, EyeOff, Trash2 } from "lucide-react";
import { useLayersStore } from "../../stories/workspaces";
import { cn } from "@/lib/utils";

export const LayersManagement = () => {
  const layers = useLayersStore((state) => state.layers);
  const layerCurrent = useLayersStore((state) => state.layerCurrent);

  const toggleHiddenLayer = useLayersStore((state) => state.toggleHiddenLayer);
  const setLayerCurrent = useLayersStore((state) => state.setLayerCurrent);

  return (
    <div className="px-2">
      <div className="flex flex-col text-xs">
        {layers.map((el) => (
          <div
            key={el.id}
            className={cn(
              "flex items-center px-4 py-2 justify-between hover:bg-neutral-200 cursor-pointer rounded-md",
              {
                "text-neutral-500": el.id !== layerCurrent?.id,
                "text-neutral-950": el.id === layerCurrent?.id,
              }
            )}
            onClick={() => setLayerCurrent(el.id)}
          >
            <p>{el.elementTag}</p>
            <div onClick={() => toggleHiddenLayer(el.id)}>
              {el.settings.isHidden ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
