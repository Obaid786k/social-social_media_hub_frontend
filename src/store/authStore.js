// State management (Zustand example)
import { create } from "zustand"

export const useAuthStore = create((set) => ({
  isLoggedIn: false,
  user: null,
  setUser: (user) => set({ user, isLoggedIn: !!user }),
  logout: () => set({ user: null, isLoggedIn: false }),
}))
