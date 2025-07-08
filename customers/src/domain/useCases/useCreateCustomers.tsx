import { useMutation, useQueryClient } from "@tanstack/react-query";
import { customerApi } from "../customerApi";
import type { CreateCustomerSchemaType } from "../../schemas/customerSchema";

export function useCreateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (form: CreateCustomerSchemaType) =>
      customerApi.createCustomer(form),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
}
