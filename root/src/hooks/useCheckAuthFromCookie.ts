import { getCookie } from "typescript-cookie";

export function useCheckAuthFromCookie(): boolean {
  const cookie = getCookie("@User");

  if (!cookie) return false;

  try {
    const parsed = JSON.parse(cookie);
    const userName = parsed?.state?.userName;
    return Boolean(userName);
  } catch (err) {
    console.error("Erro ao ler cookie de auth:", err);
    return false;
  }
}
