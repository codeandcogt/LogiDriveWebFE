import React from "react";
import { Logo } from "../../atom";

export const BrandContainer: React.FC = () => {
  return (
    <div
      className="hidden md:flex w-full md:w-1/2 h-full justify-center items-center bg-gradient-to-r from-orange-400 to-rose-400 rounded-2xl shadow-2xl p-8"
    >
      <div className="flex flex-col items-center">
        <Logo fill="#011C26" height="15rem" width="15rem" />
        <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl mt-4 text-[#011C26]">
          LogiDrive
        </h1>
      </div>
    </div>
  );
};
