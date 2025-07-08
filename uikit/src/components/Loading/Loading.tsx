import "./loading.style.css";

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
}

export default function LoadingSpinner({
  size = 48,
  color = "#ec6724",
}: LoadingSpinnerProps) {
  return (
    <div
      className="loading-spinner"
      style={{
        width: size,
        height: size,
        borderColor: `${color} transparent ${color} transparent`,
      }}
    />
  );
}
