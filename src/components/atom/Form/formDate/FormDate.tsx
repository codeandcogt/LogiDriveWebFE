import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { format, parse } from 'date-fns'
import { cn } from "@/lib/utils"
import { useState, useEffect } from 'react'

interface FormDateProps {
  label: string
  name: string
  placeholder?: string
  helperText?: string
  value?: Date | string
  onChange?: (date: Date | string | undefined) => void
  type: 'date' | 'year'
  dateFormat?: string // Formato para parsear strings, por defecto 'yyyy-MM-dd'
}

export default function FormDate({ 
  label, 
  name,
  placeholder,
  helperText,
  value,
  onChange,
  type,
  dateFormat = 'yyyy-MM-dd'
}: FormDateProps) {
  // Estado interno para manejar la fecha
  const [internalDate, setInternalDate] = useState<Date | undefined>(
    value instanceof Date ? value : 
    typeof value === 'string' && value ? parse(value, dateFormat, new Date()) : 
    undefined
  )

  // Actualizar el estado interno cuando cambia el valor externo
  useEffect(() => {
    if (value instanceof Date) {
      setInternalDate(value)
    } else if (typeof value === 'string' && value) {
      try {
        const parsedDate = parse(value, dateFormat, new Date())
        setInternalDate(parsedDate)
      } catch (error) {
        console.error('Error parsing date string:', error)
        setInternalDate(undefined)
      }
    } else {
      setInternalDate(undefined)
    }
  }, [value, dateFormat])

  const handleDateSelect = (newDate: Date | undefined) => {
    setInternalDate(newDate)
    if (onChange) {
      // Si el valor original era string, devolvemos string
      if (typeof value === 'string') {
        onChange(newDate ? format(newDate, dateFormat) : undefined)
      } else {
        onChange(newDate)
      }
    }
  }

  const formatDate = (date: Date | undefined) => {
    if (!date) return ''
    return type === 'year' ? format(date, 'yyyy') : format(date, 'PPP')
  }

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !internalDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {internalDate ? formatDate(internalDate) : <span>{placeholder || (type === 'year' ? "Seleccionar año" : "Seleccionar fecha")}</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={internalDate}
              onSelect={handleDateSelect}
              initialFocus
              disabled={(date) => type === 'year' && date.getFullYear() !== (internalDate?.getFullYear() || new Date().getFullYear())}
              fromYear={1900}
              toYear={2100}
              captionLayout={type === 'year' ? "dropdown-buttons" : "buttons"}
              {...(type === 'year' ? { view: "year" as const } : {})}
            />
          </PopoverContent>
        </Popover>
      </div>
      {helperText && (
        <p className="mt-2 text-sm text-red-500">{helperText}</p>
      )}
    </div>
  )
}