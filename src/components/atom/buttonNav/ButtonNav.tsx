import { Card, CardContent } from "@/components/ui/card"
import React from "react";

interface ButtonNavProps {
    imageUrl: string;
    alt: string;
    title: string;
    onClick: ()=> void;
    fill?: string;
}

export const ButtonNav: React.FC<ButtonNavProps> = ({imageUrl, alt, title, onClick, fill}) => {
  return (
    <Card style={{backgroundColor: fill}} onClick={onClick} className="w-full h-full mx-2 bg-gradient-to-b from-white to-gray-50 hover:from-gray-50 hover:to-white cursor-pointer transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl group border border-gray-100">
      <CardContent className="p-0 h-full relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8),transparent_70%)]" />
        
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-6">
          <div className="relative">
            {/* Decorative rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] rounded-full border-2 border-gray-100 opacity-50 animate-pulse" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[190px] h-[190px] rounded-full border border-gray-100 opacity-30" />
            
            {/* Main circle */}
            <div className="w-[180px] h-[180px] rounded-full overflow-hidden shadow-lg bg-white transition-all duration-500 ease-in-out relative z-10">
              <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden group-hover:from-blue-100 group-hover:to-indigo-100">
                <img
                  src={imageUrl}
                  alt={alt}
                  className="w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />
              </div>
            </div>
          </div>
          
          <div className="text-center space-y-2">
            <span className="block text-lg font-semibold text-slate-700 transition-all duration-500 group-hover:text-slate-900">
              {title}
            </span>
            <div className="h-0.5 w-12 mx-auto bg-gradient-to-r from-transparent via-slate-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}