import "./baseModal.style.css";

export interface ModalProps {
  title: string;
  isOpen?: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function BaseModal({
  title,
  onClose,
  isOpen = false,
  children,
}: ModalProps) {
  if (!isOpen) return null;
  return (
    <div className={isOpen ? "modal-overlay" : "modal-hidden"}>
      <div className="modal-container">
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
