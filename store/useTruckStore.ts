import { create } from "zustand";

interface TruckStore {
    selectedTruckId: string | null;
    setSelectedTruckId: (id: string | null) => void;
    clearSelectedTruck: () => void;
    nextTruck: () => void;
    previousTruck: () => void;
}

const useTruckStore = create<TruckStore>((set, get) => ({
    selectedTruckId: null,

    setSelectedTruckId: (id) => set({ selectedTruckId: id }),

    clearSelectedTruck: () => set({ selectedTruckId: null }),

    nextTruck: () => {
        set((state) => {
            const currentId = state.selectedTruckId ? parseInt(state.selectedTruckId) : 0;
            const nextId = currentId < 10 ? currentId + 1 : 0;
            return { selectedTruckId: nextId.toString() };
        });
    },

    previousTruck: () => {
        set((state) => {
            const currentId = state.selectedTruckId ? parseInt(state.selectedTruckId) : 0;
            const prevId = currentId > 0 ? currentId - 1 : 10;
            return { selectedTruckId: prevId.toString() };
        });
    },
}));

export default useTruckStore;
