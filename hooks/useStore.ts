import create from "zustand";
import { DEFAULT_FONT_SIZE } from "../types/font_size";

export interface StoreState {
  code: string;
  description: string;
  image_data: string;
  nft_name: string;
  setCode: (newCode: string) => void;
  setDescription: (newDescription: string) => void;
  setImageData: (newData: string) => void;
  setNFTName: (newName: string) => void;
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
  setCode: (newCode) => set({ code: newCode }),
  setDescription: (newDescription) => set({ description: newDescription }),
  setImageData: (newData) => set({ image_data: newData }),
  setNFTName: (newName) => set({ nft_name: newName }),
}));
