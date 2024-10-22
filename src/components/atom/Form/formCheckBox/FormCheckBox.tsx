import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface FormCheckboxProps {
  label: string;
  name: string;
  helperText?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export const FormCheckbox: React.FC<FormCheckboxProps> = ({
  label,
  name,
  helperText,
  checked,
  onChange,
  disabled
}) => {
  return (
    <div className="mb-4 flex items-center space-x-2">
      <Checkbox
        id={name}
        checked={checked}
        onCheckedChange={onChange}
        disabled={disabled}
      />
      <label
        htmlFor={name}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
      {helperText && (
        <p className="mt-2 text-sm text-red-500">{helperText}</p>
      )}
    </div>
  );
};