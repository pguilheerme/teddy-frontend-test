// src/components/CustomersPerPage.tsx
import "./customerPerPage.style.css";

const SELECTABLE_LIMITS = [16, 12, 8, 4];

interface CustomersPerPageProps {
  limit: number;
  totalCustomers: number;
  onLimitChange: (limit: number) => void;
}

export default function CustomersPerPage({
  limit,
  totalCustomers,
  onLimitChange,
}: CustomersPerPageProps) {
  return (
    <div className="top-wrapper">
      <span className="info-title">
        <strong>{totalCustomers}</strong> clientes nesta página
      </span>
      <div className="select-wrapper">
        <span>Itens por página:</span>
        <select
          className="limit-select"
          value={limit}
          onChange={({ target: { value } }) => onLimitChange(Number(value))}
        >
          {SELECTABLE_LIMITS.map((val) => (
            <option key={`select-option-${val}`} value={val}>
              {val}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
