import React from "react";
import { ModalDelete, TableData } from "@/components/atom";
import { Municipality } from "@/interface";
import { TableSkeleton } from "@/components/molecule";
import { createColumnsMunicipality } from "./createColumnsMunicipality";
import { useListMunicipality } from "@/hooks/Location/Municipality";

export const ListMunicipality: React.FC = () => {
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
  } = useListMunicipality();
  const columns = createColumnsMunicipality(handleEdit, handleDelete);

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <>
      <TableData<Municipality>
        columns={columns}
        data={data || []}
        filterColumn="name"
        onClick={handleClick}
      />

      <ModalDelete
        title="Confirmar Eliminación"
        description="¿Estás seguro de que deseas eliminar este municipio? Esta acción no se puede deshacer."
        open={isOpen}
        onConfirm={handleConfirm}
        onCancel={() => setIsOpen(false)}
      />
    </>
  );
};