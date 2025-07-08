import { getCookie } from "typescript-cookie";

export function useUserNameFromCookie(): string | null {
  const cookie = getCookie("@User");

  if (!cookie) return null;

  try {
    const parsed = JSON.parse(cookie);
    return parsed?.state?.userName ?? null;
  } catch (err) {
    console.error("Erro ao ler cookie de userName:", err);
    return null;
  }
}
