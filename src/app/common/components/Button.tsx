import clsx from "clsx";
import { ButtonHTMLAttributes } from "react"
import LoadingSpinner from "./LoadingSpinner";
import { ComponentVariants } from "./types";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ComponentVariants;
  isLoading?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, variant = "primary", isLoading = false, className = "", ...restProps }) => {
  const variantStyle: { [key in ComponentVariants]: string } = {
    primary: "bg-custom-purple text-white disabled:bg-custom-purple-light active:bg-custom-purple-lighter",
    secondary: "border border-custom-purple text-custom-purple disabled:bg-white disabled:opacity-40 active:bg-custom-purple-light"
  }

  return (
    <button
      className={clsx("py-3 px-6 rounded-md transition-all w-full sm:px-12", variantStyle[variant], className)}
      {...restProps}
    >
      {isLoading ? <LoadingSpinner variant={variant} /> : children}
    </button>
  );
}

export default Button
