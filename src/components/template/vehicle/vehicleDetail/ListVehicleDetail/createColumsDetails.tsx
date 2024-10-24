import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { VehicleDetail } from "@/interface";

export const createColumnsVehicle = (
  handleEdit: (vehicle: VehicleDetail) => void,
  handleDelete: (vehicle: VehicleDetail) => void
): ColumnDef<VehicleDetail>[] => [
  {
    accessorKey: "idVehicle",
    header: "ID",
  },
  {
    accessorKey: "brand",
    header: "Marca",
  },
  {
    accessorKey: "plate",
    header: "Placa",
  },
  {
    accessorKey: "tyoe",
    header: "Tipo",
  },
  {
    accessorKey: "year",
    header: "Año",
  },
  {
    accessorKey: "mileage",
    header: "Kilometraje",
  },
  {
    accessorKey: "capacity",
    header: "Capacidad",
  },
  {
    accessorKey: "statusVehicle",
    header: "Estado",
    cell: ({ row }) => {
      const status = row.getValue("statusVehicle") as string;
      const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
          case "disponible":
            return "bg-green-100 text-green-800";
          case "en mantenimiento":
            return "bg-yellow-100 text-yellow-800";
          case "en uso":
            return "bg-blue-100 text-blue-800";
          case "fuera de servicio":
            return "bg-red-100 text-red-800";
          default:
            return "bg-gray-100 text-gray-800";
        }
      };
      
      return (
        <Badge variant={"outline"} className={`${getStatusColor(status)} font-medium`}>
          {status}
        </Badge>
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
      const vehicle = row.original;
      return (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleEdit(vehicle)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleDelete(vehicle)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];