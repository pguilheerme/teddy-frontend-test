import { useNavigate } from "react-router-dom";
import { useUserStore } from "welcome/UseUserStore";
import { useSelectedCustomersStore } from "customers/UseSelectedCustomersStore";

export function useLogout() {
  const { clearUser } = useUserStore();
  const { clearCustomers } = useSelectedCustomersStore();
  const navigate = useNavigate();

  function logout() {
    clearCustomers();
    clearUser();
    navigate("/");
  }

  return logout;
}
