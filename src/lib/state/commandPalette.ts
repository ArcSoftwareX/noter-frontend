import { create } from "zustand";

type State = {
  isOpen: boolean;
};

type Actions = {
  open: () => void;
  close: () => void;
  set: (factory: ((prev: boolean) => boolean) | boolean) => void;
};

export const useCommandPalette = create<State & Actions>((set, get) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  set: (f) => set({ isOpen: typeof f === "boolean" ? f : f(get().isOpen) }),
}));
