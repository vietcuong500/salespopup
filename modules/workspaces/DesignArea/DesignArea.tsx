import { Demo } from "@/app/components/Demo";
import { useLayersStore } from "../stories/workspaces";

export const DesignArea = (props: any) => {
  const layers = useLayersStore((state) => state.layers);
  const setLayerCurrent = useLayersStore((state) => state.setLayerCurrent);
  const updateLayers = useLayersStore((state) => state.updateLayers);
  return (
    <div className="w-9/12 bg-gray-200 h-[900px] relative overflow-hidden">
      <div className="w-[480px] h-[300px] bg-white absolute left-4 top-4 rounded-sm shadow-md">
        {layers.map((el: any, idx: number) => {
          if (el.settings.isHidden) return;
          return (
            <Demo
              key={idx}
              settings={el}
              id={el.id}
              onClick={(id: string) => {
                setLayerCurrent(id);
              }}
              handleUpdateLayer={updateLayers}
            />
          );
        })}
      </div>
    </div>
  );
};
