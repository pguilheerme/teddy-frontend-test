import "./customerCard.style.css";
import { moneyMask } from "../../utils/moneyMask";
const Pencil = new URL("../../assets/pencil.svg", import.meta.url).href;
const Trash = new URL("../../assets/trash.svg", import.meta.url).href;

interface CustomerCardProps {
  name: string;
  companyValuation: number | string;
  salary: number | string;
  type?: "selected";
  selected?: boolean;

  onEditClick?(): void;
  onPlusClick?(selected?: boolean): void;
  onTrashClick?(): void;
}

export function CustomerCard({
  companyValuation,
  name,
  salary,
  type,
  selected,

  onEditClick = () => {},
  onPlusClick = () => {},
  onTrashClick = () => {},
}: CustomerCardProps) {
  return (
    <div className={`client_card_wrapper ${selected ? "selected" : ""}`}>
      <strong>{name}</strong>
      <span className="field_text">Salário: {moneyMask(String(salary))}</span>
      <span className="field_text">
        Empresa: {moneyMask(String(companyValuation))}
      </span>
      <div
        className={`client_card_row ${type === "selected" ? "selected" : ""}`}
      >
        {type === "selected" ? (
          <div
            onClick={() => onPlusClick(selected)}
            className="client_card_clickable"
          >
            <div className="red_line" />
          </div>
        ) : (
          <>
            <div
              onClick={() => {
                onPlusClick(selected);
              }}
              className="client_card_clickable"
            >
              {selected ? (
                <div className="red_line" />
              ) : (
                <>
                  <div className="plus_1" />
                  <div className="plus_2" />
                </>
              )}
            </div>
            <div
              onClick={() => {
                onEditClick();
              }}
              className="client_card_clickable"
            >
              <img src={Pencil} />
            </div>
            <div
              onClick={() => {
                onTrashClick();
              }}
              className="client_card_clickable"
            >
              <img src={Trash} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
