import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { VehiclePart } from "@/interface";

export const createColumnsVehiclePart = (
  handleEdit: (vehiclePart: VehiclePart) => void,
  handleDelete: (vehiclePart: VehiclePart) => void
): ColumnDef<VehiclePart>[] => [
  {
    accessorKey: "idPartVehicle",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "description",
    header: "Descripción",
  },
  {
    accessorKey: "statusPart",
    header: "Estado",
    cell: ({ row }) => {
      const status = row.getValue("statusPart") as string;
      const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
          case "nuevo":
            return "bg-green-500 text-white";
          case "usado":
            return "bg-blue-100 text-blue-800";
          case "desgastado":
            return "bg-yellow-100 text-yellow-800";
          case "roto":
            return "bg-red-100 text-red-800";
          case "oxidado":
            return "bg-orange-100 text-orange-800";
          case "reparado":
            return "bg-purple-100 text-purple-800";
          case "reacondicionado":
            return "bg-indigo-100 text-indigo-800";
          case "fuera_servicio":
            return "bg-gray-100 text-gray-800";
          default:
            return "bg-gray-100 text-gray-800";
        }
      };

      return (
        <Badge
          variant={"outline"}
          className={`${getStatusColor(status)} font-medium`}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "idVehicle",
    header: "ID Vehículo",
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const vehiclePart = row.original;
      return (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleEdit(vehiclePart)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleDelete(vehiclePart)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];
