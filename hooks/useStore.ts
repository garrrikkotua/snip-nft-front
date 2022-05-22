import create from "zustand";

export interface StoreState {
  code: string;
  description: string;
  setCode: (newCode: string) => void;
  setDescription: (newDescription: string) => void;
}

export const useStore = create<StoreState>()((set) => ({
  code: "",
  description: "",
  setCode: (newCode) => set({ code: newCode }),
  setDescription: (newDescription) => set({ description: newDescription }),
}));
