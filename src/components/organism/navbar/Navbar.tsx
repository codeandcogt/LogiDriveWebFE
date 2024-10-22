import React from "react"
import { ProfileIcon, SettingIcon, SunIcon } from "@/components/atom"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Check, LogOut, User, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useNavbar } from "@/hooks"


interface NavbarProps {
  title?: string
}

export const Navbar: React.FC<NavbarProps> = ({ title }) => {
  const {handleLogOut, handleNotificationClick, deleteNotification, unreadCount, notifications, markAsRead}= useNavbar()
  return (
    <nav className="bg-background border-b mb-4">
      <div className="max-w-7xl mx-auto my-3">
        <div className="flex items-center justify-between h-8">
          <div className="flex items-center text-lg font-semibold">
            {title}
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground bg-white hover:bg-gray-100 mx-1 shadow-md"
            >
              <SunIcon height={20} width={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground bg-white hover:bg-gray-100 mx-1 shadow-md"
            >
              <SettingIcon height={20} width={20} />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground bg-white hover:bg-gray-100 mx-1 shadow-md relative"
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <Badge 
                      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-red-500 text-white rounded-full"
                    >
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80 p-2">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">Notificaciones</h4>
                    {unreadCount > 0 && (
                      <Badge variant="secondary">{unreadCount} nuevas</Badge>
                    )}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup className="max-h-[300px] overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <DropdownMenuItem 
                        key={notification.id} 
                        className="p-3 cursor-pointer"
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <div className="flex items-start gap-2 w-full">
                          <div className={`mt-1 rounded-full p-1 ${
                            notification.read ? 'bg-gray-100' : 'bg-blue-100'
                          }`}>
                            <Bell className="h-4 w-4" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex justify-between items-start">
                              <p className={`text-sm font-medium leading-none ${
                                !notification.read ? 'text-blue-600' : ''
                              }`}>
                                {notification.title}
                              </p>
                              <span className="text-xs text-gray-500">{notification.time}</span>
                            </div>
                            <p className="text-sm text-gray-600">{notification.message}</p>
                          </div>
                          <div className="flex gap-1">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  markAsRead(notification.id)
                                }}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={(e) => {
                                e.stopPropagation()
                                deleteNotification(notification.id)
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <div className="text-center py-4 text-sm text-gray-500">
                      No hay notificaciones
                    </div>
                  )}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground bg-white hover:bg-gray-100 mx-1 shadow-md"
                >
                  <ProfileIcon height={20} width={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem >
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}
