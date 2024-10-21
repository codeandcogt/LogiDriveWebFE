import React from 'react';
import { Sidebar, SidebarItem } from '../../components';
import { sidebarItems } from './SidebarList'; // Ajusta la ruta según tu estructura de archivos

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar>
        {sidebarItems.map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.icon}
            text={item.text}
            url={item.url}
            alert={item.alert}
          />
        ))}
      </Sidebar>
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
};