import { lazy, Suspense, useState } from "react";
import CustomersPerPage from "../../components/CustomersPerPage/CustomersPerPage";
import { useCustomers } from "../../domain/useCases/useCostumers";
import { CustomerCard } from "../../components/CustomerCard/CustomerCard";
import "./customers.css";
import CreateCustomerModal from "../../components/CustomerModals/CreateCustomerModal/CreateCustomerModal";
import type {
  CreateCustomerSchemaType,
  UpdateCustomerSchemaType,
} from "../../schemas/customerSchema";
import { useCreateCustomer } from "../../domain/useCases/useCreateCustomers";
import EditCustomerModal from "../../components/CustomerModals/EditCustomerModal/EditCustomerModal";
import { useUpdateCustomer } from "../../domain/useCases/useUpdateCustomer";
import DeleteCustomerModal from "../../components/CustomerModals/DeleteCustomerModal/DeleteCustomerModal";
import { useDeleteCustomer } from "../../domain/useCases/useDeleteCustomers";
import { useSelectedCustomersStore } from "../../stores/useSelectedCustomersStore";

const PageContainer = lazy(() => import("designSystem/PageContainer"));
const Button = lazy(() => import("designSystem/Button"));
const Pagination = lazy(() => import("designSystem/Pagination"));

export default function CustomersPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(16);
  const [selected, setSelected] = useState<UpdateCustomerSchemaType>(
    {} as UpdateCustomerSchemaType
  );
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const createCustomer = useCreateCustomer();
  const updateCustomer = useUpdateCustomer();
  const deleteCustomer = useDeleteCustomer();
  const { addCustomer } = useSelectedCustomersStore();

  const { data, isLoading, isError, error } = useCustomers(page, limit);

  const totalPages = data?.totalPages || 1;
  const currentPage = data?.currentPage || 1;
  const customers = data?.clients || [];

  const handleClose = (index: number) => {
    switch (index) {
      case 0:
        setIsCreateModalOpen(false);
        break;
      case 1:
        setIsEditModalOpen(false);
        break;
      case 2:
        setIsDeleteModalOpen(false);
        break;
      default:
        console.error("Unknown index:", index);
    }
  };
  const handleCreate = async (form: CreateCustomerSchemaType) => {
    await createCustomer.mutateAsync(form);
    handleClose(0);
    setSelected({} as UpdateCustomerSchemaType);
  };

  const handleEdit = async (form: UpdateCustomerSchemaType) => {
    await updateCustomer.mutateAsync(form);
    handleClose(1);
  };

  const handleDelete = async (id: string) => {
    await deleteCustomer.mutateAsync(id);
    handleClose(2);
    setSelected({} as UpdateCustomerSchemaType);
  };

  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <Suspense
      fallback={
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f5f5f5",
          }}
        >
          Loading...
        </div>
      }
    >
      <PageContainer
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        <div className="wrapper-customers">
          <CustomersPerPage
            limit={limit}
            onLimitChange={(newLimit) => {
              setLimit(newLimit);
              setPage(1);
            }}
            totalCustomers={data?.clients.length || 0}
          />
          <div className="customer-cards-grid">
            {customers.map((customer) => (
              <CustomerCard
                name={customer.name}
                companyValuation={customer.companyValuation}
                salary={customer.salary}
                key={customer.id}
                onPlusClick={() => {
                  addCustomer(customer);
                }}
                onEditClick={() => {
                  setSelected(customer);
                  setIsEditModalOpen(true);
                }}
                onTrashClick={() => {
                  setSelected(customer);
                  setIsDeleteModalOpen(true);
                }}
              />
            ))}
          </div>
          <Button
            text="Criar cliente"
            fullWidth
            variant="outlined"
            onClick={() => setIsCreateModalOpen(true)}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(newPage: number) => {
              setPage(newPage);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </div>
        <CreateCustomerModal
          isOpen={isCreateModalOpen}
          onClose={() => handleClose(0)}
          onCreate={handleCreate}
        />
        <EditCustomerModal
          isOpen={isEditModalOpen}
          onClose={() => handleClose(1)}
          onEdit={(data) => {
            handleEdit(data);
          }}
          selected={selected}
        />
        <DeleteCustomerModal
          isOpen={isDeleteModalOpen}
          onClose={() => handleClose(2)}
          onDelete={() => {
            handleDelete(selected.id);
          }}
          selected={selected}
        />
      </PageContainer>
    </Suspense>
  );
}
