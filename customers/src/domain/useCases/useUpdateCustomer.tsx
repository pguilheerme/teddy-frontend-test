import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateCustomerSchemaType } from "../../schemas/customerSchema";
import { customerApi } from "../customerApi";

export function useUpdateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (form: UpdateCustomerSchemaType) =>
      customerApi.updateCustomer(form),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
}
