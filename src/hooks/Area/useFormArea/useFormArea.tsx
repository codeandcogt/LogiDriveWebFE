import { AreaCreate, AreaRequest } from "@/interface";
import { ShowToast } from "@/lib";
import { post, put } from "@/services";
import { useAreaStore, useSession } from "@/store";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export const useFormArea = () => {
  const { area, isEdit } = useAreaStore();
  const { session } = useSession()
  const navigation = useNavigate();

  const initialValues: AreaRequest = {
    name: area?.name || "",
    description: area?.description || "",
    status: area?.status || true,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("El nombre es requerido")
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .max(50, "El nombre no puede tener más de 50 caracteres")
      .matches(
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ][a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/,
        "El nombre debe comenzar con una letra y solo puede contener letras y espacios"
      ),
    description: Yup.string()
      .required("La descripción es requerida")
      .min(5, "La descripción debe tener al menos 10 caracteres")
      .max(200, "La descripción no puede tener más de 200 caracteres"),

    status: Yup.boolean().required("El estado es requerido"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        if (isEdit && area?.idArea) {
          await updateArea(values);
        } else {
          await createArea(values);
        }
      } catch (error) {
        throw Error;
      } finally {
        setSubmitting(false);
      }
    },
  });

  const createArea = async (values: AreaRequest) => {
    try {
      const data: AreaCreate = {
        name: values.name,
        description: values.description,
      };
      const response = await post<any>("api/Area", data, session?.token);
      if (response.code === 200) {
        navigation("/area");
        ShowToast("Area creada con exito", "Autorización validada");
      }
    } catch (error) {
      ShowToast("Error al crear areá","", true);
      throw Error
    }
  };

  const updateArea = async (values: AreaRequest) => {
    try {
      const response = await put<any>(`api/Area/${area?.idArea}`, values, session?.token);
      if (response.code === 200) {
        ShowToast("Area editada con exito", "Autorización validada");
        navigation("/area");
      }
    } catch (error) {
      ShowToast("Error al crear areá","", true);
    }
  };

  const handleClose = () => {
    navigation(-1); 
  };

  return { formik, isEdit , handleClose};
};
