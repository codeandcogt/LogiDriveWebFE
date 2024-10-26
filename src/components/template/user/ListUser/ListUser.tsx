import { ModalDelete, TableData } from "@/components/atom";
import { TableSkeleton } from "@/components/molecule";
import { useListUsers } from "@/hooks/User";
import { UserInterface } from "@/interface";
import { createColumnsUser } from "./createColumnsUser";

export const ListUser = () => {
    const {data, error, isError, isLoading, isOpen, setIsOpen, handleClick, handleConfirm, handleDelete, handleEdit}= useListUsers()
    const columns = createColumnsUser(handleEdit, handleDelete);

    if (isLoading) {
      return <TableSkeleton />;
    }
  
    if (isError) {
      return <div>Error: {error?.message}</div>;
    }
  
    return (
      <>
        <TableData<UserInterface>
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
}
