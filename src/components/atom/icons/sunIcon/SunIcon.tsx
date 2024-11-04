import { IconDimension } from "@/interface";
import React from "react";

interface SunIconProps extends IconDimension {
  stroke?: string;
}

export const SunIcon: React.FC<SunIconProps> = ({
  width = "40px",
  height = "40px",
  stroke = "#011C26",
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
        clipPath="url(#sun-clip)"
      >
        <path d="M20 30c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10ZM36.667 20h1.666M20 3.333V1.667M20 38.333v-1.666M33.333 33.333l-1.666-1.666M33.333 6.667l-1.666 1.666M6.667 33.333l1.666-1.666M6.667 6.667l1.666 1.666M1.667 20h1.666" />
      </g>
      <defs>
        <clipPath id="sun-clip">
          <path fill="#fff" d="M0 0h40v40H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};