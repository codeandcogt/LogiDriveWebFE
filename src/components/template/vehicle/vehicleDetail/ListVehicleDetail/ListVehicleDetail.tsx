import { ModalDelete, TableData } from "@/components/atom";
import { TableSkeleton } from "@/components/molecule";
import { useListVehicleDetail } from "@/hooks";
import { VehicleDetail } from "@/interface";
import { createColumnsVehicle } from "./createColumsDetails";

export const ListVehicleDetail = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    handleClick,
    handleConfirm,
    handleDelete,
    handleEdit,
    isOpen,
    setIsOpen,
  } = useListVehicleDetail();
  const columns = createColumnsVehicle(handleEdit, handleDelete);

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <>
      <TableData<VehicleDetail>
        columns={columns}
        data={data || []}
        filterColumn="plate" 
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
