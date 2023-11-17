import clsx from "clsx";
import styles from "./loading-spinner.module.css";
import { ComponentVariants } from "./types";

interface LoadingSpinnerProps {
  variant?: ComponentVariants
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ variant = "primary" }) => {
  const variantStyle: { [key in ComponentVariants]: string } = {
    primary: styles.loadingPrimary,
    secondary: styles.loadingSecondary,
  }

  return (
    <div className={clsx(styles.loading, variantStyle[variant])}></div>
  )
}

export default LoadingSpinner
