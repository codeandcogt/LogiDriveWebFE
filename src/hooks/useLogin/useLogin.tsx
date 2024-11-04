import * as yup from "yup";
import { useFormik } from "formik";
import { post } from "@/services";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { ShowToast } from "@/lib";
import { jwtData, LoginData, LoginSessionData } from "@/interface";
import { useSession } from "@/store";
import { useEffect, useCallback, useRef } from "react";

export const useLogin = () => {
  const navigate = useNavigate();
  const { setSession, clearSession } = useSession();
  const clearSessionCalledRef = useRef(false);

  useEffect(() => {
    if (!clearSessionCalledRef.current) {
      clearSession();
      clearSessionCalledRef.current = true;
    }
  }, [clearSession]);

  const initialValues: LoginData = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Ingrese un email válido")
      .required("El email es requerido"),
    password: yup.string().required("La contraseña es requerida"),
  });

  const handleSession = useCallback(async (data: LoginData) => {
    try {
      const response = await post<string>("/api/Auth/login", data);

      if (response.code === 200) {
        const decoded = jwtDecode<jwtData>(response.data);
        const sessionData: LoginSessionData = {
          nameidentifier: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
          name: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
          emailaddress: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
          role: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
          token: response.data
        };
        setSession(sessionData);

        await ShowToast("Inicio de sesión exitoso", "Autorización validada");
        setTimeout(() => navigate("/home"), 200);
      } else {
        throw new Error("Credenciales inválidas");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error. Por favor, intente nuevamente.";
      await ShowToast("Error de inicio de sesión", errorMessage, true);
    }
  }, [navigate, setSession]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        await handleSession(values);
      } finally {
        setSubmitting(false);
      }
    },
    validateOnChange: true,
    validateOnBlur: true,
  });

  return { formik };
};