import React from "react";
import { ModalDelete, TableData } from "@/components/atom";
import { Departament } from "@/interface";
import { TableSkeleton } from "@/components/molecule";
import { createColumnsDepartament } from "./createColumnsDepartament";
import { useListDepartament } from "@/hooks/Location/Departament";

export const ListDepartament: React.FC = () => {
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
  } = useListDepartament();
  const columns = createColumnsDepartament(handleEdit, handleDelete);

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <>
      <TableData<Departament>
        columns={columns}
        data={data || []}
        filterColumn="name"
        onClick={handleClick}
      />

      <ModalDelete
        title="Confirmar Eliminación"
        description="¿Estás seguro de que deseas eliminar este departamento? Esta acción no se puede deshacer."
        open={isOpen}
        onConfirm={handleConfirm}
        onCancel={() => setIsOpen(false)}
      />
    </>
  );
};