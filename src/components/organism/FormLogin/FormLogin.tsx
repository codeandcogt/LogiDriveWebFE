import React from "react";
import { FormInput } from "@/components/atom";
import { Button } from "@/components/ui/button";
import { FormikProps } from "formik";

interface LoginValues {
  email: string;
  password: string;
}

interface FormLoginProps {
  formik: FormikProps<LoginValues>;
}

export const FormLogin: React.FC<FormLoginProps> = ({ formik }) => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-xl p-8 sm:p-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Welcome back!
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-8">
          <FormInput
            label="Email"
            name="email"
            placeholder="Ingrese su email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.errors.email}
          />

          <FormInput
            label="Password"
            name="password"
            placeholder="Ingrese su contraseña"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.errors.password}
          />
          <div className={`w-full h-px bg-gray-300 my-4 `}></div>
          <Button type="submit" className="w-full py-3 text-lg">
            Ingresar
          </Button>
        </form>
      </div>
    </div>
  );
};
