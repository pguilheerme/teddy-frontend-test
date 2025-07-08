import type { ButtonProps } from "../components/Button/Button";

declare module "designSystem/Button" {
  import { ComponentType } from "react";

  const Button: ComponentType<ButtonProps>;
  export default Button;
}

declare module "*.css" {
  const content: string;
  export default content;
}
