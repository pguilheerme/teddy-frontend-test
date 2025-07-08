import type {
  CreateCustomerSchemaType,
  UpdateCustomerSchemaType,
} from "../schemas/customerSchema";
import { api } from "../services/api";
import type { CustomerAPIType, CustomerType } from "./customerTypes";

const CUSTOMER_URL = "/users";

async function createCustomer(
  form: CreateCustomerSchemaType
): Promise<CustomerType> {
  try {
    const response = await api.post<CustomerType>(CUSTOMER_URL, form);
    return response.data;
  } catch (error) {
    console.log("Error creating customer:", error);
    throw error;
  }
}

async function getCustomers(
  page: number,
  limit: number
): Promise<CustomerAPIType> {
  try {
    const response = await api.get<CustomerAPIType>(
      `${CUSTOMER_URL}?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching customers:", error);
    throw error;
  }
}

async function getCustomerById(id: string): Promise<CustomerType> {
  try {
    const response = await api.get<CustomerType>(`${CUSTOMER_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error fetching customer by ID:", error);
    throw error;
  }
}

async function updateCustomer(
  form: UpdateCustomerSchemaType
): Promise<UpdateCustomerSchemaType> {
  try {
    const response = await api.patch<UpdateCustomerSchemaType>(
      `${CUSTOMER_URL}/${form.id}`,
      form
    );
    return response.data;
  } catch (error) {
    console.log("Error updating customer:", error);
    throw error;
  }
}

async function deleteCustomer(id: string): Promise<void> {
  try {
    await api.delete(`${CUSTOMER_URL}/${id}`);
    console.log("Customer deleted successfully");
  } catch (error) {
    console.log("Error deleting customer:", error);
    throw error;
  }
}

export const customerApi = {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
