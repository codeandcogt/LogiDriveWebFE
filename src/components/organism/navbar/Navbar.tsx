import { NotificationIcon, ProfileIcon, SettingIcon, SunIcon } from "@/components/atom"
import { Button } from "@/components/ui/button"
import React from "react";

interface navbarProps{
    title?: string;
}

export const Navbar: React.FC<navbarProps> = ({title}) => {
  return (
    <nav className="bg-background border-b mb-4">
      <div className="max-w-7xl mx-auto my-3">
        <div className="flex items-center justify-between h-8">
          <div className="flex items-center text-lg font-semibold">
            {title}
          </div>
          <div className="flex gap-1"> 
            <Button variant="ghost" size="icon" className="text-foreground bg-white hover:bg-gray-100 mx-1 shadow-md">
              <SunIcon height={20} width={20} />
            </Button>
            <Button variant="ghost" size="icon" className="text-foreground bg-white hover:bg-gray-100 mx-1 shadow-md">
              <SettingIcon height={20} width={20}/>
            </Button>
            <Button variant="ghost" size="icon" className="text-foreground bg-white hover:bg-gray-100 mx-1 shadow-md">
              <NotificationIcon height={20} width={20}/>
            </Button>
            <Button variant="ghost" size="icon" className="text-foreground bg-white hover:bg-gray-100 mx-1 shadow-md">
              <ProfileIcon height={20} width={20}/>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}