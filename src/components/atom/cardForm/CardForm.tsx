import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from 'lucide-react';

interface FormCardProps {
  title: string;
  description?: string;
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  submitButtonText?: string;
  isSubmitting?: boolean;
  children: React.ReactNode;
  footerContent?: React.ReactNode;
  className?: string;
  maxWidth?: string;
  onClose?: () => void; 
}

export const CardForm: React.FC<FormCardProps> = ({
  title,
  description,
  handleSubmit,
  submitButtonText = "Enviar",
  isSubmitting = false,
  children,
  footerContent,
  className = "",
  maxWidth = "max-w-4xl",
  onClose
}) => {
  return (
    <Card className={`w-full ${maxWidth} mx-auto ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <CardHeader className="relative">
          <div className="flex justify-between items-center">
            <CardTitle>{title}</CardTitle>
            {onClose && (
              <Button
                variant="ghost"
                size="icon"
                type="button"
                onClick={onClose}
                className="h-10 w-10 rounded-full border"
              >
                <X className="h-8 w-8" />
              </Button>
            )}
          </div>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-4">
          {footerContent || (
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : submitButtonText}
            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
};