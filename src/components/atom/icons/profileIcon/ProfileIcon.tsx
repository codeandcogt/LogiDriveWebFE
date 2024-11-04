import { IconDimension } from "@/interface";
import React from "react";

interface ProfileIconProps extends IconDimension {
  stroke?: string;
}

export const ProfileIcon: React.FC<ProfileIconProps> = ({
  width = "40px",
  height = "40px",
  stroke = "#011C26",
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 40 40"
      fill="none"
      {...props}
    >
      <g
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <path d="M20 3.333C10.795 3.333 3.333 10.795 3.333 20c0 9.205 7.462 16.667 16.667 16.667 9.205 0 16.667-7.462 16.667-16.667 0-9.205-7.462-16.667-16.667-16.667Z" />
        <path d="M7.12 30.576s3.714-4.743 12.88-4.743c9.168 0 12.883 4.743 12.883 4.743M20 20a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
      </g>
    </svg>
  );
};