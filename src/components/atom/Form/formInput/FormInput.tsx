import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from 'lucide-react';

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  helperText?: string;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export const FormInput: React.FC<FormInputProps> = ({ 
  label, 
  name,
  type = 'text',
  placeholder,
  helperText,
  value,
  onChange,
  onBlur
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <Input
          id={name}
          name={name}
          type={type === 'password' && showPassword ? 'text' : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`pr-10 bg-white ${type === 'password' ? 'pr-12' : ''}`}
        />
        {type === 'password' && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 h-full px-2 py-1 bg-white"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>
      {helperText && (
        <p className="mt-2 text-sm text-red-500 ">{helperText}</p>
      )}
    </div>
  );
};