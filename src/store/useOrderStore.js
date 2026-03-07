import { create } from "zustand";

export const useOrderStore = create((set) => ({
  isModalOpen: false,
  selectedOrder: null,
 
  openModal: (order) => set({ isModalOpen: true, selectedOrder: order }),
  closeModal: () => set({ isModalOpen: false, selectedOrder: null }),
 
  updateSelectedOrderStatus: (status) => 
    set((state) => ({
      selectedOrder: { ...state.selectedOrder, status }
    })),
}));