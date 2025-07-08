import { useMutation, useQueryClient } from "@tanstack/react-query";
import { customerApi } from "../customerApi";
import { toast } from "react-toastify";

export function useDeleteCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => customerApi.deleteCustomer(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast.success("Cliente deletado com sucesso", {
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
