import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormSelectProps {
  label: string;
  name: string;
  placeholder?: string;
  helperText?: string;
  value?: string;
  onChange?: (e: { target: { name: string; value: string } }) => void;
  options: { value: string; label: string }[];
}

export const FormSelect: React.FC<FormSelectProps> = ({
  label,
  name,
  placeholder,
  helperText,
  value = "",
  onChange,
  options,
}) => {
  const handleValueChange = (newValue: string) => {
    if (onChange) {
      // Simular un evento como lo espera Formik
      onChange({
        target: {
          name: name,
          value: newValue
        }
      });
    }
  };

  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <Select 
        defaultValue={value} 
        onValueChange={handleValueChange}
        value={value}
      >
        <SelectTrigger id={name} className="w-full bg-white">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem 
              key={option.value} 
              value={option.value}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {helperText && <p className="mt-2 text-sm text-red-500">{helperText}</p>}
    </div>
  );
};