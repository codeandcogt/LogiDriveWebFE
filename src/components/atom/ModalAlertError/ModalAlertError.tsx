import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription, 
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ModalAlertErrorProps {
  // Títulos para el modal
  errorTitle: string;
  errorDescription: string;
  // Texto del botón (opcional)
  buttonText?: string;
  // Callback cuando se cierra el modal
  onClose?: () => void;
  // Control de visibilidad
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const ModalAlertError: React.FC<ModalAlertErrorProps> = ({
  errorTitle,
  errorDescription,
  buttonText = "Entendido",
  onClose,
  open,
  onOpenChange,
}) => {
  const handleClose = () => {
    onClose?.();
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-600">
            {errorTitle}
          </AlertDialogTitle>
          <AlertDialogDescription>{errorDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={handleClose}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {buttonText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};