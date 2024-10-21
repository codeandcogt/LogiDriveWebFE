import { IconDimension } from "@/interface";
import React from "react";

export const EditIcon: React.FC<IconDimension> = ({
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
        <path
          fillRule="evenodd"
          d="M33.268 7.723a6.25 6.25 0 1 1 8.839 8.839l-10.791 10.79a2.083 2.083 0 0 1-1.415.61l-6.063.17a2.083 2.083 0 0 1-2.14-2.143l.178-6.072a2.083 2.083 0 0 1 .61-1.411L33.267 7.723Zm5.892 2.946a2.083 2.083 0 0 0-2.946 0l-.39.391 2.946 2.947.39-.391a2.083 2.083 0 0 0 0-2.947Zm-3.337 6.284-2.946-2.946-6.86 6.86-.09 3.038 3.029-.085 6.867-6.867Z"
          clipRule="evenodd"
        />
        <path d="M12.5 10.417c-1.15 0-2.083.932-2.083 2.083v25c0 1.15.932 2.083 2.083 2.083h25c1.15 0 2.083-.932 2.083-2.083V25a2.083 2.083 0 0 1 4.167 0v12.5a6.25 6.25 0 0 1-6.25 6.25h-25a6.25 6.25 0 0 1-6.25-6.25v-25a6.25 6.25 0 0 1 6.25-6.25H25a2.083 2.083 0 1 1 0 4.167H12.5Z" />
      </g>
    </svg>
  );
};