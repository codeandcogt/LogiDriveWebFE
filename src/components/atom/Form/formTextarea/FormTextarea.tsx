import React from 'react';
import { Textarea } from '@/components/ui/textarea';

interface FormTextareaProps {
  label: string;
  name: string;
  placeholder?: string;
  helperText?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  disabled?: boolean;
  className?: string;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({ 
  label, 
  name,
  placeholder,
  helperText,
  value,
  onChange,
  onBlur,
  rows = 2,
  disabled,
  className
}) => {
  return (
    <div className="mb-2"> 
      <label 
        htmlFor={name} 
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <div className="relative">
        <Textarea
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          rows={rows}
          disabled={disabled}
          className={`resize-none ${className}`} 
          style={{ maxHeight: '100px' }} 
        />
      </div>
      {helperText && (
        <p className="mt-1 text-sm text-red-500">
          {helperText}
        </p>
      )}
    </div>
  );
};