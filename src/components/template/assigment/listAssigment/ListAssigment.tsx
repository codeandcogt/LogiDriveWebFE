import { useListAssigment } from "@/hooks";
import { createColumnsAssignment } from "./createColumnsAssigment";
import { TableSkeleton } from "@/components/molecule";
import { TableData } from "@/components/atom";
import { AssigmentInterface } from "@/interface";

export const ListAssigment = () => {
    const { handleEdit, isError, isLoading, data, error}= useListAssigment()
    const columns = createColumnsAssignment(handleEdit );

    if (isLoading) {
      return <TableSkeleton />;
    }
  
    if (isError) {
      return <div>Error: {error?.message}</div>;
    }
  
    return (
      <>
        <TableData<AssigmentInterface>
          columns={columns}
          data={data || []}
          filterColumn="comment"
          showAdd={false}
        />
      </>
    );
}
