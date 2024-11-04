import { IconDimension } from "@/interface";
import React from "react";

export const LocationIcon: React.FC<IconDimension> = ({
  width = "16px",
  height = "21px",
  fill = "#222221",
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 16 21"
      fill="none"
      {...props}
    >
      <path
        fill={fill}
        d="M8 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm0 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0-9a8 8 0 0 0-8 8c0 6 5.37 10.51 7.31 12.36a1 1 0 0 0 1.38 0C10.63 18.51 16 14 16 8a8 8 0 0 0-8-8Zm0 18.26C6 16.34 2 12.54 2 8a6 6 0 1 1 12 0c0 4.54-3.95 8.34-6 10.26Z"
      />
    </svg>
  );
};      