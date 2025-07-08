import { useNavigate } from "react-router-dom";
import { useUserStore } from "welcome/UseUserStore";

export function useLogout() {
  const { clearUser } = useUserStore();
  const navigate = useNavigate();

  function logout() {
    clearUser();
    navigate("/");
  }

  return logout;
}
