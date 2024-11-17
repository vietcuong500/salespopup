import { CopyPlus, Trash2 } from "lucide-react";
import { useLayersStore } from "../../stories/workspaces";

export const Toolbox = (props: any) => {
  const { id, ...htmlProps } = props;
  const deleteLayer = useLayersStore((state) => state.deleteLayer);
  const duplicateLayer = useLayersStore((state) => state.duplicateLayer);


  return (
    <div
      className="flex flex-row text-neutral-700 gap-2 relative bg-neutral-200 shadow-md rounded-md text-xs"
      {...htmlProps}
    >
      <div
        className="flex items-center gap-1 p-2 w-1/2 cursor-pointer justify-center "
        onClick={() => duplicateLayer(id)}
      >
        <CopyPlus className="w-4 h-4" />
        <p>Duplicate</p>
      </div>
      <div
        className="flex items-center p-2 gap-1 w-1/2 cursor-pointer justify-center "
        onClick={() => deleteLayer(id)}
      >
        <Trash2 className="w-4 h-4" />
        <p>Delete</p>
      </div>
    </div>
  );
};
