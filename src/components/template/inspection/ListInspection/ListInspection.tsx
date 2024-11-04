import { createColumnsInspection } from "./createColumnsInspection";
import { TableSkeleton } from "@/components/molecule";
import { TableData } from "@/components/atom";
import {InspectionInterface } from "@/interface";
import { useListInspection } from "@/hooks/Inspection";

export const ListInspection = () => {
  const { handleEdit, isError, isLoading, data, error}= useListInspection()
  const columns = createColumnsInspection(handleEdit );

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <>
      <TableData<InspectionInterface>
        columns={columns}
        data={data || []}
        filterColumn="comment"
        showAdd={false}
      />
    </>
  );
}