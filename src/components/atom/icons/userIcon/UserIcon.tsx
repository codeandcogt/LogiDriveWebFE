import { IconDimension } from "@/interface";
import React from "react";

export const UserIcon: React.FC<IconDimension> = ({
  width = "30px",
  height = "38px",
  fill = "#011C26",
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 30 38"
      fill="none"
      {...props}
    >
      <path
        fill={fill}
        d="M15 21.083A10.417 10.417 0 1 0 15 .25a10.417 10.417 0 0 0 0 20.833Zm0-16.666a6.25 6.25 0 1 1 0 12.5 6.25 6.25 0 0 1 0-12.5ZM29.583 31.5v4.167a2.083 2.083 0 0 1-4.166 0V31.5a2.083 2.083 0 0 0-2.084-2.083H6.667A2.083 2.083 0 0 0 4.583 31.5v4.167a2.083 2.083 0 0 1-4.166 0V31.5a6.25 6.25 0 0 1 6.25-6.25h16.666a6.25 6.25 0 0 1 6.25 6.25Z"
      />
    </svg>
  );
};