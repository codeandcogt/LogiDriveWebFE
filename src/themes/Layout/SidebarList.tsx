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
}

export const sidebarItems: SidebarItemConfig[] = [
  {
    icon: <HomeIcon width="20px" height="20px" />,
    text: "Inicio",
    url: "/home",
  },
  {
    icon: <MailIcon width="20px" height="20px" />,
    text: "Solicitudes",
    url: "/request",
    alert: true, 
  },
  {
    icon: <FolderIcon width="20px" height="20px" />,
    text: "Asignaciones",
    url: "/assignment",
  },
  {
    icon: <EditIcon width="20px" height="20px" />,
    text: "Inspecciones",
    url: "/inspection",
  },
  {
    icon: <CompassIcon width="20px" height="20px" />,
    text: "Tracking",
    url: "/tracking",
  },
  {
    icon: <TruckIcon width="20px" height="20px" />,
    text: "Vehiculos",
    url: "/vehicle",
  },
  {
    icon: <WrenchIcon width="20px" height="20px" />,
    text: "Mantenimiento",
    url: "/maintenance",
  },
  {
    icon: <UserIcon width="20px" height="20px" />,
    text: "Usuarios",
    url: "/user",
  },
  {
    icon: <PeopleIcon width="20px" height="20px" />,
    text: "Areas",
    url: "/area",
  },
  {
    icon: <LocationIcon width="20px" height="20px" />,
    text: "Ubicación",
    url: "/location",
  },
  {
    icon: <DocumentIcon width="20px" height="20px" />,
    text: "Reportes",
    url: "/report",
  },
];
