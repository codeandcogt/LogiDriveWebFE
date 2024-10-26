import { EditDescriptionModal } from "@/components/atom";
import { DetailCard } from "@/components/molecule";
import { useFormAssigment } from "@/hooks";

export const FormAssigments = () => {
  const { 
    assigment, 
    setIsModalOpen, 
    isModalOpen, 
    formik,
    handleAccept,
    handleModalSave,
  } = useFormAssigment();

  if (!assigment) {
    return <div>No se encontró la asignación</div>;
  }

  return (
    <>
      <DetailCard
        assignment={assigment}
        onEdit={handleAccept}
        onStatusChange={() => setIsModalOpen(true)}
        className="mt-4"
      />
      
      <EditDescriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialDescription={formik.values.justify}
        onSave={handleModalSave}
        isSubmitting={formik.isSubmitting}
        submitButtonText="Rechazar Solicitud"
      />
    </>
  );
};