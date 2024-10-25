import { ModalDelete, TableData } from "@/components/atom";
import { useListVehiclePart } from "@/hooks";
import { VehiclePart } from "@/interface";
import { createColumnsVehiclePart } from "./createColumnsVehiclePart";
import { TableSkeleton } from "@/components/molecule";

export const ListVehiclePart = () => {
  const {
    data,
    isOpen,
    setIsOpen,
    handleConfirm,
    handleClick,
    handleDelete,
    handleEdit,
    isError,
    isLoading, 
    error
  } = useListVehiclePart();
  const columns = createColumnsVehiclePart(handleEdit, handleDelete);

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <>
      <TableData<VehiclePart>
        columns={columns}
        data={data || []}
        filterColumn="name"
        onClick={handleClick}
      />

      <ModalDelete
        title="Confirmar Eliminación"
        description="¿Estás seguro de que deseas eliminar este área? Esta acción no se puede deshacer."
        open={isOpen}
        onConfirm={handleConfirm}
        onCancel={() => setIsOpen(false)}
      />
    </>
  );
};
