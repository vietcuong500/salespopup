import { v4 as uuidv4 } from "uuid";
import { useLayersStore } from "@/modules/workspaces/stories/workspaces";

const ELEMENTS = ["Button", "Box", "Image"];

export const Elements = () => {
  const addLayer = useLayersStore((state) => state.addLayer);

  return (
    <div className="w-full">
      {ELEMENTS.map((el, idx) => (
        <div
          key={idx}
          onClick={() => {
            addLayer({
              elementTag: el,
              id: uuidv4(),
              styles: {
                width: 200,
                height: 100,
                top: 0,
                left: 0,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 0,
                paddingTop: 0,
                paddingRight: 0,
                paddingBottom: 0,
              },
              settings: {
                isHidden: false,
                content: "Click me"
              }
            });
          }}
        >
          {el}
        </div>
      ))}
    </div>
  );
};
