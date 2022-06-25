import create from "zustand";
import { Steps, NUMBER_OF_STEPS } from "../types/steps";

interface ImageSize {
  width: number;
  height: number;
}

export interface StoreState {
  code: string;
  description: string;
  image_data: string;
  nft_name: string;
  current_step: Steps;
  image_size: ImageSize;
  blob: Blob | null;
  setCode: (newCode: string) => void;
  setDescription: (newDescription: string) => void;
  setImageData: (newData: string) => void;
  setNFTName: (newName: string) => void;
  switchStep: () => void;
  setImageSize: (newSize: ImageSize) => void;
  setBlob: (newBlob: Blob) => void;
}

export const useStore = create<StoreState>()((set) => ({
  code: `const pluckDeep = key => obj => key.split('.').reduce((accum, key) => accum[key], obj)

const compose = (...fns) => res => fns.reduce((accum, next) => next(accum), res)

const unfold = (f, seed) => {
  const go = (f, seed, acc) => {
    const res = f(seed)
    return res ? go(f, res[1], acc.concat([res[0]])) : acc
  }
  return go(f, seed, [])
}`,
  description: "",
  image_data: "",
  nft_name: "",
  current_step: 0,
  image_size: { width: 0, height: 0 },
  blob: null,
  setCode: (newCode) => set({ code: newCode }),
  setDescription: (newDescription) => set({ description: newDescription }),
  setImageData: (newData) => set({ image_data: newData }),
  setNFTName: (newName) => set({ nft_name: newName }),
  switchStep: () =>
    set((state) => ({
      current_step: (state.current_step + 1) % NUMBER_OF_STEPS,
    })),
  setImageSize: (newSize) => set({ image_size: newSize }),
  setBlob: (newBlob) => set({ blob: newBlob }),
}));

export interface EditorState {
  code: string;
  lang: string;
  fontSize: number;
  color: string;
  windowColor: string;
  windowStyle: boolean;
  codeStyle: string;
  setCode: (newCode: string) => void;
  setLang: (newLang: string) => void;
  setFontSize: (newFontSize: number) => void;
  setColor: (newColor: string) => void;
  setWindowColor: (newWindowColor: string) => void;
  setWindowStyle: (newWindowStyle: boolean) => void;
  setCodeStyle: (newCodeStyle: string) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  code: "",
  lang: "JavaScript",
  fontSize: 17,
  color: "#DB88D6",
  windowColor: "#E1A5DD",
  windowStyle: true,
  codeStyle: "vs",
  setCode: (newCode) => set({ code: newCode }),
  setLang: (newLang) => set({ lang: newLang }),
  setFontSize: (newFontSize) => set({ fontSize: newFontSize }),
  setWindowColor: (newWindowColor) => set({ windowColor: newWindowColor }),
  setWindowStyle: (newWindowStyle) => set({ windowStyle: newWindowStyle }),
  setCodeStyle: (newCodeStyle) => set({ codeStyle: newCodeStyle }),
  setColor: (newColor) => set({ color: newColor }),
}));
