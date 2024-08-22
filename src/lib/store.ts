import { create } from "zustand";
type Store = {
  city?: string;
  update: (city: string) => void;
};

export const useStore = create<Store>((set) => ({
  city: undefined,
  update: (city) => set(() => ({ city })),
}));
