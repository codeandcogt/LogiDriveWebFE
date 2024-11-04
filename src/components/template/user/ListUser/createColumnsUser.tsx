import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { UserInterface } from "@/interface";
import { Badge } from "@/components/ui/badge";

const getRoleName = (
  idRole: number
): {
  name: string;
  variant: "default" | "secondary" | "destructive" | "outline";
} => {
  switch (idRole) {
    case 1:
      return { name: "SuperAdmin", variant: "destructive" };
    case 2:
      return { name: "Admin", variant: "destructive" };
    case 3:
      return { name: "AdminLogistica", variant: "secondary" };
    case 4:
      return { name: "Logistica", variant: "default" };
    case 5:
      return { name: "Colaborador", variant: "outline" };
    case 6:
      return { name: "RRHH", variant: "default" };
    case 7:
      return { name: "Garita", variant: "default" };
    default:
      return { name: "Desconocido", variant: "outline" };
  }
};

export const createColumnsUser = (
  handleEdit: (user: UserInterface) => void,
  handleDelete: (user: UserInterface) => void
): ColumnDef<UserInterface>[] => [
  {
    accessorKey: "appUserId",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "email",
    header: "Correo",
  },
  {
    accessorKey: "collaboratorName",
    header: "Nombre Colaborador",
  },
  {
    accessorKey: "collaboratorLastName",
    header: "Apellido Colaborador",
  },
  {
    accessorKey: "position",
    header: "Cargo",
  },
  {
    accessorKey: "phone",
    header: "Teléfono",
  },
  {
    accessorKey: "idRole",
    header: "Rol",
    cell: ({ row }) => {
      const idRole = row.getValue("idRole") as number;
      const role = getRoleName(idRole);
      return <Badge variant={role.variant}>{role.name}</Badge>;
    },
  },
  {
    accessorKey: "areaName",
    header: "Área",
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleEdit(user)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleDelete(user)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];
