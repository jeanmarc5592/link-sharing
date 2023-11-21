"use client"

import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import Typography from "./Typography";
import { useFormContext } from "react-hook-form";

interface InputProps {
  label?: string;
  validationName: string;
  inputProps?: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
  error?: string;
  icon?: ReactNode;
  noGutter?: boolean;
}

const Input: React.FC<InputProps> = ({ label, inputProps = {}, error = "", icon, validationName, noGutter = false }) => {
  const { register } = useFormContext();

  return (
    <div>
      {label && (
        <label 
          htmlFor={label.toLowerCase()} 
          className="block mb-1 text-custom-gray"
        >
          {label} {inputProps.required ? "*" : ""}
        </label>
      )}

      <div className={clsx("relative", noGutter ? "mb-0" : "mb-6")}>
        {icon && (
          <div className="absolute top-3.5 left-0 flex items-center pl-3.5 pointer-events-none">
            {icon}
          </div>
        )}

        <input 
          {...register(validationName)}
          id={label && label.toLowerCase()} 
          className={
            clsx(
              "border border-custom-gray-lighter rounded-md focus:border-custom-purple focus-visible:outline-none focus:text-custom-black block w-full p-2.5", 
              error && "text-custom-red border-custom-red focus:border-custom-red",
              icon && "pl-10",
              noGutter ? "mb-0": "mb-1"
            )
          } 
          {...inputProps}
        />

        {error && <Typography variant="Body S" className="text-custom-red">{error}</Typography>}
      </div>
    </div>
  );
}

export default Input
