import * as Yup from "yup";
import { Area, RequestUser, Role, SelectOption } from "@/interface";
import { useSession, useUserStore } from "@/store";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { get, post, put } from "@/services";
import { ShowToast } from "@/lib";
import { useQuery } from "@tanstack/react-query";

export const useFormUsers = () => {
  const { session } = useSession();
  const navigation = useNavigate();
  const { user, isEdit } = useUserStore();

  const initialValues: RequestUser = {
    name: user?.name || "",
    email: user?.email || "",
    password: user?.password || "",
    collaboratorName: user?.collaboratorName || "",
    collaboratorLastName: user?.collaboratorLastName || "",
    position: user?.position || "",
    phone: user?.phone || "",
    idRole: user?.idRole || 0,
    idArea: user?.idArea || 0,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .max(50, "El nombre no puede tener más de 50 caracteres")
      .required("El nombre es requerido"),

    email: Yup.string()
      .email("Correo electrónico inválido")
      .required("El correo electrónico es requerido"),

    password: Yup.string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial"
      )
      .required("La contraseña es requerida"),

    collaboratorName: Yup.string()
      .min(3, "El nombre del colaborador debe tener al menos 3 caracteres")
      .max(50, "El nombre del colaborador no puede tener más de 50 caracteres")
      .required("El nombre del colaborador es requerido"),

    collaboratorLastName: Yup.string()
      .min(3, "El apellido del colaborador debe tener al menos 3 caracteres")
      .max(
        50,
        "El apellido del colaborador no puede tener más de 50 caracteres"
      )
      .required("El apellido del colaborador es requerido"),

    position: Yup.string()
      .min(3, "El cargo debe tener al menos 3 caracteres")
      .max(50, "El cargo no puede tener más de 50 caracteres")
      .required("El cargo es requerido"),

    phone: Yup.string()
      .min(8, "El número de teléfono debe tener al menos 8 caracteres")
      .matches(
        /^[0-9+()-\s]{8,}$/,
        "Formato de teléfono inválido. Debe contener solo números, +, (), - o espacios"
      )
      .required("El número de teléfono es requerido"),
      
    idRole: Yup.number()
      .min(1, "Debe seleccionar un rol")
      .required("El rol es requerido"),

    idArea: Yup.number()
      .min(1, "Debe seleccionar un área")
      .required("El área es requerida"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);

        if (isEdit && user?.appUserId) {
          await updateUser(values);
        } else {
          await createUser(values);
        }
      } catch (error) {
        throw Error;
      } finally {
        setSubmitting(false);
      }
    },
  });

  const createUser = async (values: RequestUser) => {
    try {
      const response = await post<any>("api/AppUser", values, session?.token);

      console.log(response, "response data");

      if (response.code === 200) {
        navigation("/user");
        ShowToast("Area creada con exito", "Autorización validada");
      }
    } catch (error) {
      ShowToast("Error al crear areá", "", true);
      throw Error;
    }
  };

  const updateUser = async (values: RequestUser) => {
    try {
      const response = await put<any>(
        `api/AppUser/updateUserCollaborator/${user?.appUserId}`,
        values,
        session?.token
      );

      console.log(response, "response update");

      if (response.code === 200) {
        ShowToast("Area editada con exito", "Autorización validada");
        navigation("/area");
      }
    } catch (error) {
      ShowToast("Error al crear areá", "", true);
    }
  };

  const handleClose = () => {
    navigation(-1);
  };

  const fetchRole = async () => {
    try {
      const response = await get<Role[]>("api/Role", session?.token);
      return response.data;
    } catch (error) {
      throw Error;
    }
  };

  const { data: roleData, isLoading } = useQuery<Role[], Error, SelectOption[]>(
    {
      queryKey: ["api-Role"],
      queryFn: fetchRole,
      staleTime: 500,
      select: (data) =>
        data.map((item) => ({
          value: item.idRole.toString(),
          label: `${item.name}`,
        })),
    }
  );

  const fetchArea = async () => {
    try {
      const response = await get<Area[]>("api/Area", session?.token);
      return response.data;
    } catch (error) {
      throw Error;
    }
  };

  const { data: areaData, isLoading: areaLoading } = useQuery<
    Area[],
    Error,
    SelectOption[]
  >({
    queryKey: ["api-Area-data"],
    queryFn: fetchArea,
    staleTime: 500,
    select: (data) =>
      data.map((item) => ({
        value: item.idArea.toString(),
        label: `${item.name}`,
      })),
  });

  return {
    formik,
    handleClose,
    isEdit,
    roleData,
    isLoading,
    areaData,
    areaLoading,
  };
};
