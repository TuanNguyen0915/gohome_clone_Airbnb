import { create } from "zustand"

interface IRegisterModelStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useRegisterModel = create<IRegisterModelStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
