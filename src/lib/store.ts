import type { CityDetails } from "@/types";
import { create } from "zustand";
type Store = {
  city?: string;
  country?: string;
  cityDetails?: CityDetails;
  updateCity: (city: string) => void;
  updateCountry: (country: string) => void;
  updateCityDetails: (cityDetails: CityDetails) => void;
};

export const useStore = create<Store>((set) => ({
  city: undefined,
  country: undefined,
  cityDetails: undefined,
  updateCity: (city) => set((state) => ({ ...state, city })),
  updateCountry: (country) => set((state) => ({ ...state, country })),
  updateCityDetails: (cityDetails) => set((state) => ({ ...state, cityDetails })),
}));
