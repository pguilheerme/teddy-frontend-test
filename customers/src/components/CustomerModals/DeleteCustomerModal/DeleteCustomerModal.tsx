import "./deleteCustomerModal.style.css";
import { lazy, useState } from "react";
import { type UpdateCustomerSchemaType } from "../../../schemas/customerSchema";

const Loading = lazy(() => import("designSystem/Loading"));
const Button = lazy(() => import("designSystem/Button"));
const BaseModal = lazy(() => import("designSystem/BaseModal"));

export interface DeleteCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (data: UpdateCustomerSchemaType) => void;
  selected: UpdateCustomerSchemaType;
}

export default function DeleteCustomerModal({
  isOpen,
  onClose,
  onDelete,
  selected,
}: DeleteCustomerModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const userName = selected.name;

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await onDelete(selected);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BaseModal title="Excluir cliente:" isOpen={isOpen} onClose={onClose}>
      <div className="create-customer-modal">
        <span>
          Você está prestes a excluir o cliente: <strong>{userName}</strong>
        </span>
        <Button
          text={isLoading ? <Loading size={15} /> : "Excluir cliente"}
          onClick={handleDelete}
          fullWidth
          disabled={isLoading}
        />
      </div>
    </BaseModal>
  );
}
