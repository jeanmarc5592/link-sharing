import clsx from "clsx";
import { ButtonHTMLAttributes } from "react"
import LoadingSpinner from "./LoadingSpinner";
import { ComponentVariants } from "./types";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ComponentVariants;
  isLoading?: boolean;
  className?: string;
  dense?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, variant = "primary", isLoading = false, className = "", dense = false, ...restProps }) => {
  const variantStyle: { [key in ComponentVariants]: string } = {
    primary: "bg-custom-purple text-white disabled:bg-custom-purple-light active:bg-custom-purple-lighter",
    secondary: "border border-custom-purple text-custom-purple disabled:bg-white disabled:opacity-40 active:bg-custom-purple-light"
  };

  const denseStyle = dense ? "py-2 px-3" : "py-3 px-6 sm:px-12"

  return (
    <button
      className={clsx("rounded-md transition-all w-full sm:px-12", variantStyle[variant], denseStyle, className)}
      {...restProps}
    >
      {isLoading ? <LoadingSpinner variant={variant} /> : children}
    </button>
  );
}

export default Button
