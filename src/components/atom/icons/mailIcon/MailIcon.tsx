import { IconDimension } from "@/interface";
import React from "react";

export const MailIcon: React.FC<IconDimension> = ({
  width = "1rem",
  height = "1rem",
  fill = "#011C26",
  ...props
}) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg"
      width={width} 
      height={height} 
      viewBox="0 0 50 50" 
      fill="none"
      {...props}
    >
      <g fill={fill}>
        <path d="M13.973 15.194a2.083 2.083 0 1 0-2.946 2.946l9.554 9.553a6.25 6.25 0 0 0 8.838 0l9.554-9.553a2.083 2.083 0 1 0-2.946-2.947l-9.554 9.554a2.083 2.083 0 0 1-2.946 0l-9.554-9.553Z" />
        <path
          fillRule="evenodd"
          d="M10.417 8.333a6.25 6.25 0 0 0-6.25 6.25v20.834a6.25 6.25 0 0 0 6.25 6.25h29.166a6.25 6.25 0 0 0 6.25-6.25V14.583a6.25 6.25 0 0 0-6.25-6.25H10.417Zm-2.084 6.25c0-1.15.933-2.083 2.084-2.083h29.166c1.151 0 2.084.933 2.084 2.083v20.834c0 1.15-.933 2.083-2.084 2.083H10.417a2.083 2.083 0 0 1-2.084-2.083V14.583Z"
          clipRule="evenodd"
        />
      </g>
    </svg>
  );
};