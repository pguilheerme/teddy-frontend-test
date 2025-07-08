import { useCookies as useReactCookies } from "react-cookie";

export function useSelectedCustomersCookies() {
  const [cookies, setCookie, removeCookie] = useReactCookies([
    "@SelectedCustomers",
  ]);
  return { cookies, setCookie, removeCookie } as const;
}
