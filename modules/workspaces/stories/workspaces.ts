import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { v4 as uuidv4 } from "uuid";

type Layer = {
  id: string;
  elementTag: string;
  styles: {
    width: number;
    height: number;
    top: number;
    left: number;
    alignItems: "start" | "center" | "end";
    justifyContent: "start" | "center" | "end";
    paddingLeft: number;
    paddingTop: number;
    paddingRight: number;
    paddingBottom: number;
  };
  settings: {
    isHidden: boolean;
    content?: string;
  };
};

type State = {
  layers: Layer[];
  layerCurrent?: Layer;
};

type Actions = {
  addLayer: (layer: Layer) => void;
  deleteLayer: (id: string) => void;
  duplicateLayer: (id: string) => void;
  setLayerCurrent: (id: string) => void;
  updateLayers: (id: string, value: any, type?: 'styles' | 'settings') => void;
  updateLayerCurrent: (value: any) => void;
  toggleHiddenLayer: (id: string) => void;
};

export const useLayersStore = create<State & Actions>()(
  immer((set) => ({
    layers: [],
    layerCurrent: undefined,
    addLayer: (layer) =>
      set((state) => {
        state.layers.push({
          ...layer,
        });
        state.layerCurrent = layer;
      }),
    deleteLayer: (id: string) =>
      set((state) => {
        const idx = state.layers.findIndex((el) => el.id === id);
        state.layerCurrent = undefined;
        state.layers.splice(idx, 1);
      }),
    toggleHiddenLayer: (id: string) =>
      set((state) => {
        const idx = state.layers.findIndex((el) => el.id === id);
        state.layers[idx].settings.isHidden =
          !state.layers[idx].settings.isHidden;
      }),
    duplicateLayer: (id: string) =>
      set((state) => {
        const layer = state.layers.find((el) => el.id === id);
        if (!layer) return;
        layer.id = uuidv4();
        state.layers.push(layer);
      }),
    setLayerCurrent: (id) =>
      set((state) => {
        const layer = state.layers.find((el) => el.id === id);
        state.layerCurrent = layer;
      }),
    updateLayerCurrent: (value) =>
      set((state) => {
        if (!state.layerCurrent) return;
        state.layerCurrent.styles = value;
      }),
    updateLayers: (id, value, type = 'styles') =>
      set((state) => {
        const idx = state.layers.findIndex((el) => el.id === id);
        if (idx === -1) return;
        state.layers[idx][type] = {
          ...state.layers[idx][type],
          ...value,
        };
      }),
  }))
);
