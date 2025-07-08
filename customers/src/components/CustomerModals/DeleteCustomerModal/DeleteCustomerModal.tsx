import "./deleteCustomerModal.style.css";
import { lazy } from "react";
import { type UpdateCustomerSchemaType } from "../../../schemas/customerSchema";

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
  const userName = selected.name;

  return (
    <BaseModal title="Excluir cliente:" isOpen={isOpen} onClose={onClose}>
      <div className="create-customer-modal">
        <span>
          Você está prestes a excluir o cliente: <strong>{userName}</strong>
        </span>
        <Button text="Excluir cliente" onClick={onDelete} fullWidth />
      </div>
    </BaseModal>
  );
}
