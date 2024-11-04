import { IconDimension } from "@/interface";
import React from "react";

export const CompassIcon: React.FC<IconDimension> = ({
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
        <path d="M25 27.083a2.083 2.083 0 1 0 0-4.166 2.083 2.083 0 0 0 0 4.166Z" />
        <path
          fillRule="evenodd"
          d="M35.312 14.688c.493.493.706 1.199.57 1.882L32.935 31.3a2.083 2.083 0 0 1-1.634 1.634L16.57 35.882a2.084 2.084 0 0 1-2.452-2.452L17.065 18.7c.165-.825.81-1.47 1.634-1.635l14.731-2.946a2.084 2.084 0 0 1 1.882.57Zm-14.434 6.19-2.061 10.305 10.305-2.061 2.061-10.305-10.305 2.06Z"
          clipRule="evenodd"
        />
        <path
          fillRule="evenodd"
          d="M4.167 25C4.167 13.494 13.494 4.167 25 4.167c11.506 0 20.833 9.327 20.833 20.833 0 11.506-9.327 20.833-20.833 20.833-11.506 0-20.833-9.327-20.833-20.833ZM25 8.333C15.795 8.333 8.333 15.795 8.333 25c0 9.205 7.462 16.667 16.667 16.667 9.205 0 16.667-7.462 16.667-16.667 0-9.205-7.462-16.667-16.667-16.667Z"
          clipRule="evenodd"
        />
      </g>
    </svg>
  );
};