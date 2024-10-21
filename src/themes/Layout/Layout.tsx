import React from "react";
import { Sidebar, SidebarItem } from "../../components";
import { sidebarItems } from "./SidebarList"; // Ajusta la ruta según tu estructura de archivos
import { useSession } from "@/store";
import { Rol } from "@/types";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { session } = useSession()

  const filteredSidebarItems = sidebarItems.filter(item => 
    item.rol.includes(session?.role as Rol)
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar>
        {filteredSidebarItems.map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.icon}
            text={item.text}
            url={item.url}
            alert={item.alert}
          />
        ))}
      </Sidebar>
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
};
