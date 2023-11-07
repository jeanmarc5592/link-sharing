import { CSSProperties, ReactNode } from "react"

interface TypogryphyProps {
  children?: ReactNode;
  variant?: "Heading M" | "Heading S" | "Body M" | "Body S";
  className?: string;
  style?: CSSProperties;
}

const Typography: React.FC<TypogryphyProps> = ({ children, variant = "Body M", className = "", style = {} }) => {
  const getVariantStyles = () => {
    switch(variant) {
      case "Heading M":
        return ["text-heading-md", "font-bold"].join(" ");
      case "Heading S":
        return ["text-base", "font-bold"].join(" ");
      case "Body M":
        return ["text-custom-gray text-base"].join(" ");
      case "Body S":
        return ["text-custom-gray text-xs"].join(" ");
      default: 
        return ["text-custom-gray text-base"].join(" ");
    }
  }

  return (
    <p style={style} className={`${getVariantStyles()} ${className}`}>
      {children}
    </p>
  )
}

export default Typography
