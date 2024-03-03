import { create } from "zustand"

interface IUseRentModal {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useRentModal = create<IUseRentModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
