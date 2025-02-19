import { create } from "zustand";

interface TruckStore {
    selectedTruckId: string | null;
    setSelectedTruckId: (id: string | null) => void;
    clearSelectedTruck: () => void;
}

const useTruckStore = create<TruckStore>((set) => ({
    selectedTruckId: null,
    setSelectedTruckId: (id) => set({ selectedTruckId: id }),
    clearSelectedTruck: () => set({ selectedTruckId: null }),
}));

export default useTruckStore;
