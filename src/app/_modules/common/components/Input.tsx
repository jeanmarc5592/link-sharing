import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import Typography from "./Typography";

interface InputProps {
  label: string;
  inputProps?: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
  error?: string;
  icon?: ReactNode;
}

const Input: React.FC<InputProps> = ({ label, inputProps = {}, error = "", icon }) => {
  return (
    <div>
      <label 
        htmlFor={label.toLowerCase()} 
        className="block mb-1 text-custom-gray"
      >
        {label}
      </label>

      <div className="relative mb-6">
        {icon && (
          <div className="absolute top-4 left-0 flex items-center pl-3.5 pointer-events-none">
            {icon}
          </div>
        )}
        <input 
          id={label.toLowerCase()} 
          className={
            clsx(
              "border border-custom-gray-lighter custom-black rounded-md focus:border-custom-purple block w-full p-2.5 mb-1", 
              error && "text-custom-red border-custom-red focus:border-custom-red",
              icon && "pl-10",
            )
          } 
          {...inputProps}
        />
        {error && <Typography variant="Body S" className="text-custom-red">{error}</Typography>}
      </div>
    </div>
  )
}

export default Input
