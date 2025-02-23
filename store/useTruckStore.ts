import { create } from "zustand";
import { FoodTruck } from "@/types";
import { FOOD_TRUCKS } from "@/constants";

interface TruckStore {
    selectedTruckId: string | null;
    selectedTruck: FoodTruck | null;
    showTruckPage: boolean;
    setSelectedTruckId: (id: string | null) => void;
    clearSelectedTruck: () => void;
    nextTruck: () => void;
    previousTruck: () => void;
    toggleTruckPage: () => void;
}

const useTruckStore = create<TruckStore>((set, get) => ({
    selectedTruckId: null,
    selectedTruck: null,
    showTruckPage: false,

    toggleTruckPage: () => set((state) => ({ showTruckPage: !state.showTruckPage })),

    setSelectedTruckId: (id) => {
        const truck = FOOD_TRUCKS.find((t) => t.id === id) || null;
        set({ selectedTruckId: id, selectedTruck: truck });
    },

    clearSelectedTruck: () => set({ selectedTruckId: null, selectedTruck: null }),

    nextTruck: () => {
        set((state) => {
            if (!state.selectedTruckId) return state; // If no truck is selected, do nothing
            
            const currentId = parseInt(state.selectedTruckId);
            const nextId = currentId < 10 ? currentId + 1 : 1;
            const truck = FOOD_TRUCKS.find((t) => t.id === nextId.toString()) || null;

            return { selectedTruckId: nextId.toString(), selectedTruck: truck };
        });
    },

    previousTruck: () => {
        set((state) => {
            if (!state.selectedTruckId) return state; // If no truck is selected, do nothing
            
            const currentId = parseInt(state.selectedTruckId);
            const prevId = currentId > 1 ? currentId - 1 : 10;
            const truck = FOOD_TRUCKS.find((t) => t.id === prevId.toString()) || null;

            return { selectedTruckId: prevId.toString(), selectedTruck: truck };
        });
    },
}));

export default useTruckStore;
