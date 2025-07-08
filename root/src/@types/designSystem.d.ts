declare module "designSystem/Button" {
  import { ComponentType } from "react";
  import { ButtonProps } from "designSystem/ButtonTypes";

  const Button: ComponentType<ButtonProps>;
  export default Button;
}

declare module "designSystem/ButtonTypes" {
  export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string;
    variant?: "solid" | "outlined";
    size?: "small" | "medium" | "large";
    fullWidth?: boolean;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
  }
}

declare module "designSystem/TextInput" {
  import { ComponentType } from "react";
  import { TextInputProps } from "designSystem/TextInputTypes";

  const TextInput: ComponentType<TextInputProps>;
  export default TextInput;
}

declare module "designSystem/TextInputTypes" {
  export interface TextInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    error?: string;
    register?: UseFormRegisterReturn;
    fullWidth?: boolean;
  }
}
declare module "designSystem/PageContainer" {
  import PageContainer from "designSystem/PageContainer";
  export default PageContainer;

  export interface PageContainerProps {
    children: React.ReactNode;
    style?: React.CSSProperties;
  }
}

declare module "designSystem/BaseModal" {
  import { ComponentType } from "react";
  import { ModalProps } from "designSystem/ModalTypes";

  const BaseModal: ComponentType<ModalProps>;
  export default BaseModal;
}
