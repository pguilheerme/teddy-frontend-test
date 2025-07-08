import React from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import "./textInput.style.css";

export interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  error?: string;
  register?: UseFormRegisterReturn;
  fullWidth?: boolean;
}

export default function TextInput({
  name,
  error,
  register,
  fullWidth = false,
  ...rest
}: TextInputProps) {
  const widthClass = fullWidth ? "full-width" : "";

  return (
    <div className={`input-wrapper ${widthClass}`}>
      <input
        id={name}
        name={name}
        {...register}
        {...rest}
        className={`input-field ${error ? "input-error" : ""}`}
        aria-invalid={!!error}
      />
      {error && <span className="error-field">{error}</span>}
    </div>
  );
}
