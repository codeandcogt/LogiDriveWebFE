import React, { createContext, useContext, useState } from "react";
import { Logo } from "../../atom";
import { useNavigate, useLocation } from "react-router-dom";

interface SidebarProps {
  children: React.ReactNode;
}

interface SidebarContextType {
  isExpanded: boolean;
  isFixed: boolean;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isFixed, setIsFixed] = useState<boolean>(false);

  const handleMouseEnter = () => {
    if (!isFixed) setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    if (!isFixed) setIsExpanded(false);
  };

  const toggleFixed = () => {
    setIsFixed(!isFixed);
    setIsExpanded(!isFixed);
  };

  return (
    <aside 
      className={`h-screen p-4 transition-all duration-300 ease-in-out ${
        isFixed || isExpanded ? 'w-72' : 'w-24'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <nav className={`
        h-full flex flex-col bg-white shadow-lg rounded-2xl
        transition-all duration-300 ease-in-out
        ${isFixed || isExpanded ? 'px-4' : 'px-2'}
      `}>
        <div className="flex-shrink-0 py-4 flex justify-center items-center">
          <button
            onClick={toggleFixed}
            className="w-full flex px-2 justify-center items-center"
          >
            <Logo height={70} width={70} />
          </button>
        </div>
        <SidebarContext.Provider value={{ isExpanded: isExpanded || isFixed, isFixed }}>
          <ul className="flex-1 mt-1">{children}</ul>
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
};

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  url: string;
  alert?: boolean;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  text,
  url,
  alert = false,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const context = useContext(SidebarContext);
  
  if (!context) {
    throw new Error("SidebarItem must be used within a Sidebar");
  }
  
  const { isExpanded } = context;
  const active = location.pathname === url;

  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-xl cursor-pointer
        transition-colors group
        ${active
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
          : "hover:bg-indigo-50 text-gray-600"
        }
      `}
      onClick={() => navigate(url)}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          isExpanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded-full bg-indigo-400 ${
            isExpanded ? "" : "top-2"
          }`}
        />
      )}

      {!isExpanded && (
        <div
          className={`
            absolute left-full rounded-md px-2 py-1 ml-6
            bg-indigo-100 text-indigo-800 text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
          `}
        >
          {text}
        </div>
      )}
    </li>
  );
};