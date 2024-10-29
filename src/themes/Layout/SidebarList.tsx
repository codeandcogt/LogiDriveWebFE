import { Rol } from "@/types";
import {
  CompassIcon,
  DocumentIcon,
  EditIcon,
  FolderIcon,
  HomeIcon,
  LocationIcon,
  MailIcon,
  PeopleIcon,
  TruckIcon,
  UserIcon,
  WrenchIcon,
} from "../../components";

export interface SidebarItemConfig {
  icon: React.ReactNode;
  text: string;
  url: string;
  alert?: boolean;
  rol: Rol[];
}

export const sidebarItems: SidebarItemConfig[] = [
  {
    icon: <HomeIcon width="20px" height="20px" />,
    text: "Inicio",
    url: "/home",
    rol: [
      Rol.ADMIN,
      Rol.ADMINLOGISTICA,
      Rol.COLABORADOR,
      Rol.GARITA,
      Rol.RRHH,
      Rol.SUPERADMIN,
      Rol.LOGISTICA,
    ],
  },
  {
    icon: <MailIcon width="20px" height="20px" />,
    text: "Solicitudes",
    url: "/request",
    alert: true,
    rol: [Rol.SUPERADMIN],
  },
  {
    icon: <FolderIcon width="20px" height="20px" />,
    text: "Asignaciones",
    url: "/assignment",
    rol: [Rol.ADMIN, Rol.ADMINLOGISTICA, Rol.SUPERADMIN, Rol.LOGISTICA],
  },
  {
    icon: <EditIcon width="20px" height="20px" />,
    text: "Inspecciones",
    url: "/inspection",
    rol: [Rol.ADMIN, Rol.ADMINLOGISTICA, Rol.SUPERADMIN, Rol.LOGISTICA],
  },
  {
    icon: <CompassIcon width="20px" height="20px" />,
    text: "Tracking",
    url: "/tracking",
    rol: [Rol.SUPERADMIN],
  },
  {
    icon: <TruckIcon width="20px" height="20px" />,
    text: "Vehiculos",
    url: "/vehicle",
    rol: [Rol.ADMIN, Rol.ADMINLOGISTICA, Rol.LOGISTICA, Rol.SUPERADMIN],
  },
  {
    icon: <WrenchIcon width="20px" height="20px" />,
    text: "Mantenimiento",
    url: "/maintenance",
    rol: [Rol.SUPERADMIN],
  },
  {
    icon: <UserIcon width="20px" height="20px" />,
    text: "Usuarios",
    url: "/user",
    rol: [Rol.ADMIN, Rol.RRHH, Rol.SUPERADMIN],
  },
  {
    icon: <PeopleIcon width="20px" height="20px" />,
    text: "Areas",
    url: "/area",
    rol: [Rol.ADMIN, Rol.RRHH, Rol.SUPERADMIN],
  },
  {
    icon: <LocationIcon width="20px" height="20px" />,
    text: "Ubicación",
    url: "/location",
    rol: [Rol.SUPERADMIN],
  },
  {
    icon: <DocumentIcon width="20px" height="20px" />,
    text: "Reportes",
    url: "/report",
    rol: [Rol.ADMIN, Rol.ADMINLOGISTICA, Rol.SUPERADMIN, Rol.LOGISTICA],
  },
];
