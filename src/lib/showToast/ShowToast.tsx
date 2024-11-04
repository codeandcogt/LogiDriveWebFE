import { toast } from "sonner";

export const ShowToast = (
  message: string,
  description: string,
  isError: boolean = false
) => {
  return new Promise<void>((resolve) => {
    const toastFunc = isError ? toast.error : toast.success;
    toastFunc(message, {
      description: description,
      duration: 2000,
      onDismiss: () => resolve(),
    });
    setTimeout(resolve, 2000);
  });
};
