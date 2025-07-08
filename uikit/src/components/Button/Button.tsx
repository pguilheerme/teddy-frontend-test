import "./button.styles.css";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  variant?: "solid" | "outlined";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export default function Button({
  text,
  variant = "solid",
  size = "medium",
  fullWidth = false,
  startIcon,
  endIcon,
  className = "",
  ...rest
}: ButtonProps) {
  const sizeClass =
    size === "small" ? "small" : size === "large" ? "large" : "";
  const widthClass = fullWidth ? "full-width" : "";

  return (
    <button
      className={`button-wrapper ${variant} ${sizeClass} ${widthClass} ${className}`}
      {...rest}
    >
      {startIcon && <span className="button-icon">{startIcon}</span>}
      {text}
      {endIcon && <span className="button-icon">{endIcon}</span>}
    </button>
  );
}
