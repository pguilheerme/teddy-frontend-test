import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateCustomerSchemaType } from "../../schemas/customerSchema";
import { customerApi } from "../customerApi";
import { toast } from "react-toastify";

export function useUpdateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (form: UpdateCustomerSchemaType) =>
      customerApi.updateCustomer(form),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast.success("Cliente editado com sucesso", {
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
