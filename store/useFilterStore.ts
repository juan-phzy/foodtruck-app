import { create } from "zustand";

/**
 * Zustand Store for managing category filters and modal state.
 *
 * This store is used to:
 * - Store selected category filters for filtering food trucks.
 * - Manage the visibility of the category selection modal.
 * - Provide actions to update category selections and modal state.
 */

interface FilterStore {
    /** Array of selected category names */
    categoryFilters: string[];

    /** Boolean flag to control the visibility of the category modal */
    showCategoryModal: boolean;

    /**
     * Sets the category filters to a new array of selected categories.
     * @param filters - Array of category names to set as selected filters.
     */
    setCategoryFilters: (filters: string[]) => void;

    /**
     * Toggles the selection state of a category.
     * - If the category is already selected, it removes it.
     * - If the category is not selected, it adds it.
     * @param category - The category name to toggle.
     */
    updateCategories: (category: string) => void;

    /**
     * Clears all selected category filters.
     */
    clearCategoryFilters: () => void;

    /**
     * Sets the visibility of the category modal.
     * @param show - Boolean value to show or hide the modal.
     */
    toggleCategoryModal: () => void;


}

const useFilterStore = create<FilterStore>((set) => ({
    categoryFilters: [],
    showCategoryModal: false,

    /** Updates the selected category filters with a new array */
    setCategoryFilters: (filters) => set({ categoryFilters: filters }),

    /** Adds or removes a category from the selected filters */
    updateCategories: (category) =>
        set((state) => ({
            categoryFilters: state.categoryFilters.includes(category)
                ? state.categoryFilters.filter((c) => c !== category)
                : [...state.categoryFilters, category],
        })),

    /** Clears all category filters */
    clearCategoryFilters: () => set({ categoryFilters: [] }),

    /** Controls the visibility of the category modal */
    toggleCategoryModal: () => set((state)=>({showCategoryModal: !state.showCategoryModal})),
}));

export default useFilterStore;
