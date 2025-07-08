import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import cookiesStorage from "./cookiesStorage";

interface UserState {
  userName: string | null;
  setUserName: (name: string) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userName: null,
      setUserName: (name) => set({ userName: name }),
      clearUser: () => set({ userName: null }),
    }),
    {
      name: "@User",
      storage: createJSONStorage(() => cookiesStorage),
    }
  )
);
