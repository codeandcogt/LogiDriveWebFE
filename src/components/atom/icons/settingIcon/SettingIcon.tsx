import { IconDimension } from "@/interface";
import React from "react";


export const SettingIcon: React.FC<IconDimension> = ({
  width = "40px",
  height = "40px",
  stroke = "#000",
  ...props
}) => {
  return (
    <svg
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
        <path d="M20 25a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
        <path d="m32.704 17.326-1.83-4.418L33.335 10 30 6.667l-2.892 2.471-4.512-1.855-1.037-3.95h-3.257l-1.053 4.002-4.408 1.858L10 6.667 6.667 10l2.422 2.981-1.801 4.43-3.955.922v3.334l4.002 1.092 1.858 4.407L6.667 30 10 33.333l2.985-2.432 4.343 1.786 1.005 3.98h3.334l1.007-3.978 4.418-1.83c.736.526 2.908 2.474 2.908 2.474L33.333 30l-2.473-2.918 1.83-4.419 3.977-1.034v-3.296l-3.963-1.007Z" />
      </g>
    </svg>
  );
};