import clsx from "clsx";
import { ButtonHTMLAttributes } from "react"

type ButtonVariants = "primary" | "secondary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants;
}

const Button: React.FC<ButtonProps> = ({ children, variant="primary", ...restProps }) => {
  const variantStyle: { [key in ButtonVariants]: string } = {
    primary: "bg-custom-purple text-white disabled:bg-custom-purple-light active:bg-custom-purple-lighter",
    secondary: "border border-custom-purple text-custom-purple py-3 px-12 disabled:bg-white disabled:opacity-40 active:bg-custom-purple-light"
  }

  return (
    <button
      className={clsx("mb-6 mr-6 py-3 px-12 rounded-[8px] transition-all", variantStyle[variant])}
      {...restProps}
    >
      {children}
    </button>
  );
}

export default Button
