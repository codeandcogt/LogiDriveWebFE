import { useSession } from "@/store";
import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface AuthProps {
  children: ReactNode;
}

export const AuthGuard: React.FC<AuthProps> = ({ children }) => {
  const { session } = useSession();

  if (
    session?.token === "" ||
    session?.token === undefined ||
    session.token === null ||
    !session
  ) {
    return <Navigate replace to={"/"} />;
  }

  return <>{children}</>;
};
