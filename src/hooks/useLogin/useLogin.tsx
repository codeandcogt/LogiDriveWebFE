import * as yup from "yup";
import { useFormik } from "formik";
import { post } from "@/services";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import { ShowToast } from "@/lib";

interface LoginData {
  email: string;
  password: string;
}

export const useLogin = () => {
  const navigate = useNavigate();

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

  const handleSession = async (data: LoginData) => {
    try {
      const response = await post<string>("/api/Auth/login", data);

      if (response.code === 200 ) {
        const decoded = jwtDecode<string>(response.data);
        console.log(decoded, "decode");
        await ShowToast("Inicio de sesión exitoso", "Autorización validada");
        setTimeout(() => navigate("/home"), 200);
      } else {
        await ShowToast(
          "Error de inicio de sesión",
          "Credenciales inválidas",
          true
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      await ShowToast(
        "Error de inicio de sesión",
        "Ocurrió un error. Por favor, intente nuevamente.",
        true
      );
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      await handleSession(values);
    },
    validateOnChange: true,
    validateOnBlur: true,
  });

  return { formik };
};