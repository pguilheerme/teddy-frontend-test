import { useMutation, useQueryClient } from "@tanstack/react-query";
import { customerApi } from "../customerApi";
import type { CreateCustomerSchemaType } from "../../schemas/customerSchema";
import { toast } from "react-toastify";

export function useCreateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (form: CreateCustomerSchemaType) =>
      customerApi.createCustomer(form),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast.success("Cliente criado com sucesso", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        theme: "light",
      });
    },
  });
}
