import { LayerSetting } from "@/components/control/LayerSetting";
import { useLayersStore } from "../../stories/workspaces";
import { Position } from "@/components/control/Position";
import { Spacing } from "@/components/control/Spacing";
import { Size } from "@/components/control/Size";
import { Typography } from "@/components/control/Typography";
import { Background } from "@/components/control/Background";
import { Border } from "@/components/control/Border";
import { ContentSetting } from "@/components/control/ContentSetting";

export const SidebarSetting = (props: any) => {
  const layerCurrent = useLayersStore((state) => state.layerCurrent);
  const layers = useLayersStore((state) => state.layers);
  if (!layerCurrent) return <div className="w-[300px]" ></div>;
  return (
    <div className="w-[300px] p-4 flex flex-col gap-5 max-h-[900px] overflow-scroll ">
      <div>
        <p>{layerCurrent.elementTag}</p>
      </div>
      <div id="Position">
        <p className="font-semibold mb-2 text-neutral-900 text-sm">Layer</p>
        <LayerSetting
          settings={layers.find((el) => el.id === layerCurrent.id)}
        />
      </div>
      {/* <div id="Position">
        <Alignment settings={layers.find((el) => el.id === layerCurrent.id)} />
      </div> */}
       <div id="Position">
        <p className="font-semibold mb-2 text-neutral-900 text-sm">Content</p>
        <ContentSetting settings={layers.find((el) => el.id === layerCurrent.id)} />
      </div>
      <div id="Position">
        <p className="font-semibold mb-2 text-neutral-900 text-sm">Position</p>
        <Position settings={layers.find((el) => el.id === layerCurrent.id)} />
      </div>
      <div id="spacing">
        <p className="font-semibold mb-2 text-neutral-900 text-sm">Spacing</p>
        <Spacing settings={layers.find((el) => el.id === layerCurrent.id)} />
      </div>
      <div id="size">
        <p className="font-semibold mb-2 text-neutral-900 text-sm">Size</p>
        <Size settings={layers.find((el) => el.id === layerCurrent.id)} />
      </div>
      <div id="size">
        <p className="font-semibold mb-2 text-neutral-900 text-sm">
          Typography
        </p>
        <Typography settings={layers.find((el) => el.id === layerCurrent.id)} />
      </div>
      <div id="size">
        <p className="font-semibold mb-2 text-neutral-900 text-sm">
          Background
        </p>
        <Background settings={layers.find((el) => el.id === layerCurrent.id)} />
      </div>
      <div id="size">
        <p className="font-semibold mb-2 text-neutral-900 text-sm">Border</p>
        <Border settings={layers.find((el) => el.id === layerCurrent.id)} />
      </div>
    </div>
  );
};
