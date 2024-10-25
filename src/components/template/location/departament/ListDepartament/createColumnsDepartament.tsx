import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Departament } from "@/interface";

export const createColumnsDepartament = (
  handleEdit: (departament: Departament) => void,
  handleDelete: (departament: Departament) => void
): ColumnDef<Departament>[] => [
  {
    accessorKey: "idDepartment", // Cambiado de idDepartament a idDepartment
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "status",  // Agregado el campo status
    header: "Estado",
    cell: ({ row }) => {
      const status = row.getValue("status") as boolean;
      return (
        <div className="text-center">
          {status ? "Activo" : "Inactivo"}
        </div>
      );
    },
  },
  {
    accessorKey: "towns",  // Agregado el campo towns
    header: "Municipios",
    cell: ({ row }) => {
      const towns = row.getValue("towns") as any[];
      return (
        <div className="max-w-[300px] truncate">
          {towns.length} municipios
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const departament = row.original;
      return (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleEdit(departament)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleDelete(departament)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];