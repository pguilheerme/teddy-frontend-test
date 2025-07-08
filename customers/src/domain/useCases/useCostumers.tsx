import { useQuery } from "@tanstack/react-query";
import type { CustomerAPIType } from "../customerTypes";
import { customerApi } from "../customerApi";

export function useCustomers(page: number, limit: number) {
  return useQuery<CustomerAPIType>({
    queryKey: ["customers", page, limit],
    queryFn: () => customerApi.getCustomers(page, limit),
  });
}
