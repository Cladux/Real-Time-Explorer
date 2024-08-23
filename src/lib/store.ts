import { create } from "zustand";
type Store = {
  city?: string;
  country?: string;
  update: (city: string, country?: string) => void;
};

export const useStore = create<Store>((set) => ({
  city: undefined,
  country: undefined,
  update: (city, country) => set(() => ({ city, country })),
}));
