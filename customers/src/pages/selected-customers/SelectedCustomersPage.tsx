import "./selectedCustomers.style.css";
import { lazy, Suspense } from "react";
import { CustomerCard } from "../../components/CustomerCard/CustomerCard";
import { useSelectedCustomersStore } from "../../stores/useSelectedCustomersStore";

const PageContainer = lazy(() => import("designSystem/PageContainer"));
const Button = lazy(() => import("designSystem/Button"));

export default function SelectedCustomersPage() {
  const { clearCustomers, selectedCustomers, removeCustomer } =
    useSelectedCustomersStore();

  const handleRemove = (id: string) => {
    removeCustomer(id);
  };

  const handleClearAll = () => {
    clearCustomers();
  };

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
          <div className="title-wrapper">
            <h2 className="title">Clientes Selecionados:</h2>
          </div>

          <div className="customer-cards-grid">
            {selectedCustomers.length === 0 ? (
              <p>Nenhum cliente selecionado</p>
            ) : (
              selectedCustomers.map((customer) => (
                <CustomerCard
                  key={customer.id}
                  name={customer.name}
                  salary={customer.salary}
                  companyValuation={customer.companyValuation}
                  onTrashClick={() => handleRemove(customer.id)}
                  type="selected"
                  selected={true}
                  onPlusClick={() => handleRemove(customer.id)}
                />
              ))
            )}
          </div>

          {selectedCustomers.length > 0 && (
            <Button
              text="Limpar clientes selecionados"
              variant="outlined"
              fullWidth
              onClick={handleClearAll}
              style={{ marginTop: "1rem" }}
            />
          )}
        </div>
      </PageContainer>
    </Suspense>
  );
}
