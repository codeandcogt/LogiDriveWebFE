import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { FormTextarea } from "../Form";
import { useState, useEffect } from "react";

interface EditDescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDescription: string;
  onSave: (description: string) => void;
  isSubmitting?: boolean;
  submitButtonText: string;
}

export const EditDescriptionModal = ({
  isOpen,
  onClose,
  initialDescription,
  onSave,
  isSubmitting = false,
  submitButtonText,
}: EditDescriptionModalProps) => {
  const [description, setDescription] = useState(initialDescription);

  useEffect(() => {
    setDescription(initialDescription);
  }, [initialDescription]);

  const handleClose = () => {
    setDescription(initialDescription);
    onClose();
  };

  const handleSave = () => {
    onSave(description);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleClose}>
      <AlertDialogContent className="sm:max-w-[525px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Justificación del Rechazo</AlertDialogTitle>
          <AlertDialogDescription>
            Por favor, ingrese la justificación del rechazo:
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="my-4">
          <FormTextarea
            name="justify"
            placeholder="Ingrese la justificación del rechazo"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[100px]"
            label=""
          />
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleClose}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleSave}
            disabled={isSubmitting}
            className="bg-red-600 hover:bg-red-700"
          >
            {submitButtonText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};