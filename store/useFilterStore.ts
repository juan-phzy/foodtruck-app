import { create } from "zustand";

interface FilterStore {
    categoryFilters: string[];
    toggleCategory: (category: string) => void;
    clearFilters: () => void;
}

const useFilterStore = create<FilterStore>((set) => ({
    categoryFilters: [],
    toggleCategory: (category) =>
        set((state) => ({
            categoryFilters: state.categoryFilters.includes(category)
                ? state.categoryFilters.filter((name) => name !== category)
                : [...state.categoryFilters, category],
        })),
    clearFilters: () => set({ categoryFilters: [] }),
}));

export default useFilterStore;
