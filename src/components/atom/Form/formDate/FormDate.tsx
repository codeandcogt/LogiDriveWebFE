import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from "@/lib/utils";

interface FormDateProps {
  label: string;
  name: string;
  placeholder?: string;
  helperText?: string;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
}

export const FormDate: React.FC<FormDateProps> = ({ 
  label, 
  name,
  placeholder,
  helperText,
  value,
  onChange
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !value && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {value ? format(value, "PPP") : <span>{placeholder || "Seleccionar fecha"}</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={value}
              onSelect={onChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      {helperText && (
        <p className="mt-2 text-sm text-red-500">{helperText}</p>
      )}
    </div>
  );
};