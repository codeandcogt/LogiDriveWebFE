import { useSession } from "@/store";
import { Rol } from "@/types";
import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ValidateProps {
  children: ReactNode;
  permission: Rol[];
}

export const ValidateGuard: React.FC<ValidateProps> = ({
  children,
  permission,
}) => {
  const { session } = useSession();

  if (session?.role && permission.includes(session.role as Rol)) {
    return children;
  }
  return (<Navigate replace to={"/unautorized"}/>);
};
