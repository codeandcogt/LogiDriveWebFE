import React from "react";
import { ModalDelete, TableData } from "@/components/atom";
import { Area } from "@/interface";
import { TableSkeleton } from "@/components/molecule";
import { useListArea } from "@/hooks";
import { createColumnsArea } from "./createColumnsArea";

export const ListArea: React.FC = () => {
  const {
    isLoading,
    isError,
    error,
    data,
    handleClick,
    handleDelete,
    handleEdit,
    isOpen,
    setIsOpen,
    handleConfirm,
  } = useListArea();
  const columns = createColumnsArea(handleEdit, handleDelete);

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <>
      <TableData<Area>
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
