import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import type { UpdateCustomerSchemaType } from "../schemas/customerSchema";
import cookiesStorage from "./cookiesStorage";

interface SelectedCustomersState {
  selectedCustomers: UpdateCustomerSchemaType[];
  setCustomers: (customers: UpdateCustomerSchemaType[]) => void;
  addCustomer: (customer: UpdateCustomerSchemaType) => void;
  removeCustomer: (id: string) => void;
  clearCustomers: () => void;
}

export const useSelectedCustomersStore = create<SelectedCustomersState>()(
  persist(
    (set, get) => ({
      selectedCustomers: [],
      setCustomers: (customers) => set({ selectedCustomers: customers }),
      addCustomer: (customer) => {
        const currentCustomers = get().selectedCustomers;
        const exists = currentCustomers.some((c) => c.id === customer.id);

        if (!exists) {
          const updated = [...currentCustomers, customer];
          set({ selectedCustomers: updated });
        }
      },
      removeCustomer: (id) => {
        const updated = get().selectedCustomers.filter((c) => c.id !== id);
        set({ selectedCustomers: updated });
      },
      clearCustomers: () => set({ selectedCustomers: [] }),
    }),
    {
      name: "@SelectedCustomers",
      storage: createJSONStorage(() => cookiesStorage),
    }
  )
);
