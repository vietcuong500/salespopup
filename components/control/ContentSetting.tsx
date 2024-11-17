import { useLayersStore } from "@/modules/workspaces/stories/workspaces";
import { Textarea } from "../ui/textarea";

export const ContentSetting = (props: any) => {
  const { settings } = props;
  const updateLayers = useLayersStore((state) => state.updateLayers);

  return (
    <div className="flex flex-col gap-1">
      <Textarea
        value={settings?.settings?.content}
        onChange={(e) => {
          updateLayers(settings?.id, {
            content: e.target.value,
          }, "settings");
        }}
      />
    </div>
  );
};
