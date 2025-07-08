import type { StateStorage } from "zustand/middleware";
import { getCookie, setCookie, removeCookie } from "typescript-cookie";

const cookiesStorage: StateStorage = {
  getItem: (name: string): string | null => {
    return getCookie(name) ?? null;
  },
  setItem: (name: string, value: string): void => {
    setCookie(name, value, { expires: 7, path: "/" });
  },
  removeItem: (name: string): void => {
    removeCookie(name, { path: "/" });
  },
};

export default cookiesStorage;
