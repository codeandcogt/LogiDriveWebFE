import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { AssigmentInterface } from "@/interface";

export const createColumnsAssignment = (
  handleEdit: (assignment: AssigmentInterface) => void,
): ColumnDef<AssigmentInterface>[] => [
  {
    accessorKey: "idLogReservation",
    header: "ID",
  },
  {
    accessorKey: "fullName", 
    header: "Colaborador",
    cell: ({ row }) => {
      const name = row.original.name;
      const lastName = row.original.lastName;
      return (
        <div className="max-w-[200px] truncate" title={`${name} ${lastName}`}>
          {name} {lastName}
        </div>
      );
    },
  },
  {
    accessorKey: "comment",
    header: "Comentario",
    cell: ({ row }) => {
      const comment = row.getValue("comment") as string;
      return (
        <div className="max-w-[300px] truncate" title={comment}>
          {comment}
        </div>
      );
    },
  },
  {
    accessorKey: "numberPeople",
    header: "Número de Personas",
  },
  {
    accessorKey: "statusReservation",
    header: "Estado de Reserva",
  },
  {
    accessorKey: "addres",
    header: "Dirección",
    cell: ({ row }) => {
      const address = row.getValue("addres") as string;
      return (
        <div className="max-w-[200px] truncate" title={address}>
          {address}
        </div>
      );
    },
  },
  {
    accessorKey: "creationDate",
    header: "Fecha de Creación",
    cell: ({ row }) => {
      const date = new Date(row.getValue("creationDate"));
      const formattedDate = date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
      return formattedDate;
    },
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const status = row.getValue("status") as boolean;
      return (
        <span className={`px-2 py-1 rounded-full text-sm ${status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {status ? "Activo" : "Inactivo"}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const assignment = row.original;
      return (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleEdit(assignment)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];