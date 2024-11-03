import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { InspectionInterface } from "@/interface";

export const createColumnsInspection = (
  handleEdit: (inspection: InspectionInterface) => void
): ColumnDef<InspectionInterface>[] => [
  {
    accessorKey: "idVehicleAssignment",
    header: "ID",
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
    accessorKey: "tripType",
    header: "Tipo de Viaje",
  },
  {
    accessorKey: "startDate",
    header: "Fecha de Inicio",
    cell: ({ row }) => {
      const date = new Date(row.getValue("startDate"));
      const formattedDate = date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      return formattedDate;
    },
  },
  {
    accessorKey: "endDate",
    header: "Fecha de Fin",
    cell: ({ row }) => {
      const date = new Date(row.getValue("endDate"));
      const formattedDate = date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      return formattedDate;
    },
  },
  {
    accessorKey: "idVehicle",
    header: "ID Vehículo",
  },
  {
    accessorKey: "idLogReservation",
    header: "ID Reserva",
  },
  {
    accessorKey: "creationDate",
    header: "Fecha de Creación",
    cell: ({ row }) => {
      const date = new Date(row.getValue("creationDate"));
      const formattedDate = date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
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
        <span
          className={`px-2 py-1 rounded-full text-sm ${
            status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {status ? "Activo" : "Inactivo"}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const inspection = row.original;
      return (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleEdit(inspection)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];
