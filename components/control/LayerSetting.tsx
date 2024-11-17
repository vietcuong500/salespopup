import { useLayersStore } from "@/modules/workspaces/stories/workspaces";
import { InputUnit } from "./InputUnit";

export const LayerSetting = (props) => {
  const { settings } = props;
  const { styles } = settings;
  const updateLayers = useLayersStore((state) => state.updateLayers);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center">
        <p className="w-2/5  text-xs ">Arrange</p>
        <div className="w-3/5 flex flex-row items-center gap-2">
          <div className="bg-neutral-100 cursor-pointer flex items-center justify-center h-8 w-full shadow-sm rounded">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M2.447 3.776l5.106-2.552a1 1 0 01.894 0l5.106 2.552a.25.25 0 010 .448L8.447 6.776a1 1 0 01-.894 0L2.447 4.224a.25.25 0 010-.448z"
                fill="currentColor"
                fill-opacity="0.9"
              ></path>
              <path
                opacity="0.75"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9 9.382l-1 .5L4.236 8l1.382-.691L4.5 6.75 2.447 7.776a.25.25 0 000 .448l5.106 2.552a1 1 0 00.894 0L9 10.5V9.382zM9.764 13L8 13.882 4.236 12l1.382-.691L4.5 10.75l-1.382.691-.037.019-.336.167-.298.15a.25.25 0 000 .447l.298.149.336.167.037.019 4.435 2.217a1 1 0 00.894 0l2.198-1.099A3.01 3.01 0 019.764 13z"
                fill="currentColor"
                fill-opacity="0.9"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13 14v1h-1v-1h1zm0-1V9l1.2.9.4.3.6-.8-.4-.3-2-1.5a.5.5 0 00-.6 0l-2 1.5-.4.3.6.8.4-.3L12 9v4h1z"
                fill="currentColor"
                fill-opacity="0.9"
              ></path>
            </svg>
          </div>
          <div className="bg-neutral-100 cursor-pointer flex items-center justify-center h-8 w-full shadow-sm rounded">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M2.447 4.776l5.106-2.552a1 1 0 01.894 0l5.106 2.552a.25.25 0 010 .448L8.447 7.776a1 1 0 01-.894 0L2.447 5.224a.25.25 0 010-.448z"
                fill="currentColor"
                fill-opacity="0.9"
              ></path>
              <path
                opacity="0.75"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.27 12.247L8 12.882 4.236 11l2.382-1.191L5.5 9.25l-2.382 1.191-.037.019-.336.167-.298.15a.25.25 0 000 .447l.298.149.336.167.037.019 4.435 2.217a1 1 0 00.894 0l1.392-.695a3.006 3.006 0 01-.568-.834z"
                fill="currentColor"
                fill-opacity="0.9"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13 9v4h-1V9l-1.2.9-.4.3-.6-.8.4-.3 2-1.5a.5.5 0 01.6 0l2 1.5.4.3-.6.8-.4-.3L13 9z"
                fill="currentColor"
                fill-opacity="0.9"
              ></path>
            </svg>
          </div>
          <div className="bg-neutral-100 cursor-pointer flex items-center justify-center h-8 w-full shadow-sm rounded">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.5 9.25l-3.053 1.526a.25.25 0 000 .448l5.106 2.552a1 1 0 00.894 0l5.106-2.552a.25.25 0 000-.448L10.5 9.25l-2.053 1.026a1 1 0 01-.894 0L5.5 9.25z"
                fill="currentColor"
                fill-opacity="0.9"
              ></path>
              <path
                opacity="0.75"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M2.745 5.373l.336.168.037.018 4.435 2.218a1 1 0 00.576.097A3 3 0 018 7v-.118L4.236 5 8 3.118l1.108.554c.32-.26.693-.456 1.102-.567l-1.763-.881a1 1 0 00-.894 0L3.118 4.44l-.037.019-.336.167-.298.15a.25.25 0 000 .447l.298.149z"
                fill="currentColor"
                fill-opacity="0.9"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13 7V3h-1v4l-1.2-.9-.4-.3-.6.8.4.3 2 1.5a.5.5 0 00.6 0l2-1.5.4-.3-.6-.8-.4.3L13 7z"
                fill="currentColor"
                fill-opacity="0.9"
              ></path>
            </svg>
          </div>
          <div className="bg-neutral-100 cursor-pointer flex items-center justify-center h-8 w-full shadow-sm rounded">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.5 10.75l-2.053 1.027a.25.25 0 000 .447l5.106 2.553a1 1 0 00.894 0l5.106-2.553a.25.25 0 000-.447L11.5 10.75l-3.053 1.526a1 1 0 01-.894 0L4.5 10.75z"
                fill="currentColor"
                fill-opacity="0.9"
              ></path>
              <path
                opacity="0.75"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.08 4.54l-.335-.167-.298-.15a.25.25 0 010-.446l.298-.15.336-.167.037-.019 4.435-2.217a1 1 0 01.894 0l1.763.881a2.991 2.991 0 00-1.102.567L8 2.118 4.236 4 8 5.882v1a1 1 0 01-.447-.105L3.118 4.559l-.037-.018zm6.028 4.788L8 9.882 4.236 8l1.382-.69L4.5 6.75 2.447 7.777a.25.25 0 000 .447l5.106 2.553a1 1 0 00.894 0l1.763-.882a2.991 2.991 0 01-1.102-.567z"
                fill="currentColor"
                fill-opacity="0.9"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13 2V1h-1v1h1zm0 1v4l1.2-.9.4-.3.6.8-.4.3-2 1.5a.5.5 0 01-.6 0l-2-1.5-.4-.3.6-.8.4.3L12 7V3h1z"
                fill="currentColor"
                fill-opacity="0.9"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center">
        <p className="w-2/5  text-xs ">Rotate & Flip</p>
        <div className="w-3/5 flex flex-row items-center gap-2 ">
          <InputUnit
            value={styles?.rotate}
            onChange={(e) =>
              updateLayers(settings?.id, {
                rotate: +e.target.value,
              })
            }
          />
          <div className="flex items-center gap-2">
            <div className="bg-neutral-100 cursor-pointer flex items-center justify-center h-8 w-8 shadow-sm rounded">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M14.5 13H9V3h2l3.5 10z"
                  fill="currentColor"
                  fill-opacity="0.9"
                ></path>
                <path
                  opacity="0.5"
                  d="M5.355 3.5l-3.15 9H6.5v-9H5.355z"
                  stroke="currentColor"
                  stroke-opacity="0.9"
                ></path>
              </svg>
            </div>
            <div className="bg-neutral-100 cursor-pointer flex items-center justify-center h-8 w-8 shadow-sm rounded">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M3 14.5V9h10v2L3 14.5z"
                  fill="currentColor"
                  fill-opacity="0.9"
                ></path>
                <path
                  opacity="0.5"
                  d="M12.5 5.355l-9-3.15V6.5h9V5.355z"
                  stroke="currentColor"
                  stroke-opacity="0.9"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center">
        <p className="w-2/5  text-xs ">Opacity</p>
        <InputUnit
          className="w-3/5"
          value={styles?.opacity}
          onChange={(e) =>
            updateLayers(settings?.id, {
              opacity: +e.target.value,
            })
          }
        />
      </div>
    </div>
  );
};
