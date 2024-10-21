import { IconDimension } from "@/interface";
import React from "react";

export const DocumentIcon: React.FC<IconDimension> = ({
  width = "38px",
  height = "42px",
  fill = "#011C26",
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 38 42"
      fill="none"
      {...props}
    >
      <path
        fill={fill}
        d="M35.917 12.063 25.854 2A6.25 6.25 0 0 0 21.438.167H6.5a6.25 6.25 0 0 0-6.25 6.25v29.166a6.25 6.25 0 0 0 6.25 6.25h25a6.25 6.25 0 0 0 6.25-6.25V16.48a6.25 6.25 0 0 0-1.833-4.416Zm-3.188 2.687H25.25a2.083 2.083 0 0 1-2.083-2.083v-7.48l9.562 9.563ZM31.5 37.667h-25a2.083 2.083 0 0 1-2.083-2.084V6.417A2.083 2.083 0 0 1 6.5 4.333H19v8.334a6.25 6.25 0 0 0 6.25 6.25h8.333v16.666a2.083 2.083 0 0 1-2.083 2.084Z"
      />
    </svg>
  );
};