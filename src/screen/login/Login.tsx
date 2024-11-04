import { useLogin } from "@/hooks";
import { BrandContainer, FormLogin } from "../../components";
import React from "react";
import { Toaster } from "sonner";

export const Login: React.FC = () => {
  const { formik } = useLogin();

  return (
    <div className="flex justify-between items-center h-screen py-8 px-8">
      <Toaster />
      <div className="flex-1">
        <FormLogin formik={formik} />
      </div>
      <BrandContainer />
    </div>
  );
};
