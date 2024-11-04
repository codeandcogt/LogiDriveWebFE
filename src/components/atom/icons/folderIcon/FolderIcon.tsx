import { IconDimension } from "@/interface";
import React from "react";

export const FolderIcon: React.FC<IconDimension> = ({
  height = "1rem",
  width = "1rem",
  fill = "#011C26",
}) => {
  return (
    <svg width={width} height={height} viewBox="0 0 50 50" fill="none">
      <path
        fill={fill}
        fillRule="evenodd"
        d="M20.667 8.333a6.25 6.25 0 0 1 5.226 2.821l1.698 2.588c.385.587 1.04.94 1.742.94h10.25a6.25 6.25 0 0 1 6.25 6.25v14.485a6.25 6.25 0 0 1-6.25 6.25H10.417a6.25 6.25 0 0 1-6.25-6.25V14.583a6.25 6.25 0 0 1 6.25-6.25h10.25Zm1.742 5.107a2.083 2.083 0 0 0-1.742-.94h-10.25c-1.15 0-2.084.933-2.084 2.083v20.834c0 1.15.933 2.083 2.084 2.083h29.166c1.151 0 2.084-.933 2.084-2.083V20.932c0-1.15-.933-2.083-2.084-2.083h-10.25a6.25 6.25 0 0 1-5.225-2.82l-1.699-2.589Z"
        clipRule="evenodd"
      />
    </svg>
  );
};