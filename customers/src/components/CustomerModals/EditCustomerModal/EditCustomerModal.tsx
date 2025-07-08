import "./editCustomerModal.style.css";
import { lazy, useEffect, useState } from "react";
import { moneyMask } from "../../../utils/moneyMask";

const TextInput = lazy(() => import("designSystem/TextInput"));
const Button = lazy(() => import("designSystem/Button"));
const BaseModal = lazy(() => import("designSystem/BaseModal"));
const Loading = lazy(() => import("designSystem/Loading"));

export interface EditCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (data: {
    id: string;
    name: string;
    salary: number;
    companyValuation: number;
  }) => void;
  selected: {
    id: string;
    name: string;
    salary: number;
    companyValuation: number;
  };
}

export default function EditCustomerModal({
  isOpen,
  onClose,
  onEdit,
  selected,
}: EditCustomerModalProps) {
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [companyValuation, setCompanyValuation] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selected) {
      setName(selected.name || "");
      setSalary(selected.salary ? moneyMask(selected.salary.toString()) : "");
      setCompanyValuation(
        selected.companyValuation
          ? moneyMask(selected.companyValuation.toString())
          : ""
      );
    }
  }, [selected]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name || name.length < 2) newErrors.name = "Nome inválido";
    if (!salary || parseFloat(salary.replace(/\D/g, "")) <= 0)
      newErrors.salary = "Salário inválido";
    if (
      !companyValuation ||
      parseFloat(companyValuation.replace(/\D/g, "")) <= 0
    )
      newErrors.companyValuation = "Valor da empresa inválido";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    setIsLoading(true);
    try {
      e.preventDefault();

      const newErrors = validate();
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      const parsedSalary = parseFloat(
        salary.replace("R$", "").replace(/\./g, "").replace(",", ".")
      );

      const parsedCompanyValuation = parseFloat(
        companyValuation.replace("R$", "").replace(/\./g, "").replace(",", ".")
      );

      onEdit({
        id: selected.id,
        name,
        salary: parsedSalary,
        companyValuation: parsedCompanyValuation,
      });

      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BaseModal title="Editar cliente:" isOpen={isOpen} onClose={onClose}>
      <div className="create-customer-modal">
        <form onSubmit={handleSubmit} className="create-customer-form">
          <TextInput
            name="name"
            placeholder="Digite o nome:"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            error={errors.name}
            fullWidth
          />

          <TextInput
            name="salary"
            placeholder="Digite o salário:"
            value={salary}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSalary(moneyMask(e.target.value))
            }
            error={errors.salary}
            fullWidth
          />

          <TextInput
            name="companyValuation"
            placeholder="Digite o valor da empresa:"
            value={companyValuation}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCompanyValuation(moneyMask(e.target.value))
            }
            error={errors.companyValuation}
            fullWidth
          />

          <Button
            text={isLoading ? <Loading size={15} /> : "Editar cliente"}
            fullWidth
            disabled={isLoading}
          />
        </form>
      </div>
    </BaseModal>
  );
}
