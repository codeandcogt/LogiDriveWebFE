import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Area } from "@/interface";

export const createColumnsArea = (
  handleEdit: (area: Area) => void,
  handleDelete: (area: Area) => void
): ColumnDef<Area>[] => [
  {
    accessorKey: "idArea",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "description",
    header: "Descripción",
    cell: ({ row }) => {
      const description = row.getValue("description") as string;
      return (
        <div className="max-w-[300px] truncate" title={description}>
          {description}
        </div>
      );
    },
  },
  {
    accessorKey: "creationDate",
    header: "Fecha de Creación",
    cell: ({ row }) => {
      const date = new Date(row.getValue("creationDate"));
      return date.toLocaleDateString();
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const area = row.original;
      return (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleEdit(area)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleDelete(area)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];