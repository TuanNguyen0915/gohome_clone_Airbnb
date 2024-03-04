import { create } from "zustand"

interface ILoginModelStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useLoginModal = create<ILoginModelStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
