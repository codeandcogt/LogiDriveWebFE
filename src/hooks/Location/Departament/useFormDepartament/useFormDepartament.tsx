import { DepartamentCreate, DepartamentRequest } from "@/interface/location/departament/Departament";
import { useDepartamentStore } from "@/store";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { post, put } from "@/services";
import { ShowToast } from "@/lib";

export const useFormDepartament = () => {
  const { department, isEdit } = useDepartamentStore();
  const navigation = useNavigate();

    const initialValues: DepartamentRequest = {
    name: department?.name || "",
    description: department?.description || "",
    status: department?.status || true,
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
        if (isEdit && department?.idDepartment) {
          await updateDepartament(values);
        } else {
          await createDepartament(values);
        }
      } catch (error) {
        throw Error;
      } finally {
        setSubmitting(false);
      }
    },
  });

  const createDepartament = async (values: DepartamentRequest) => {
    try {
      const data: DepartamentCreate = {
        name: values.name,
        description: values.description,
      };
      const response = await post<any>("api/Department", data);
      if (response.code === 200) {
        navigation("/location/departament");
        ShowToast("Departamento creada con exito", "Autorización validada");
      }
    } catch (error) {
      ShowToast("Error al crear departamento","", true);
      throw Error
    }
  };

  const updateDepartament = async (values: DepartamentRequest) => {
    try {
      const response = await put<any>(`api/Department${department?.idDepartment}`, values);
      if (response.code === 200) {
        ShowToast("Departamento editada con exito", "Autorización validada");
        navigation("/location/departament");
      }
    } catch (error) {
      ShowToast("Error al crear areá","", true);
    }
  };


  const handleClick = () => {
    navigation("/location/departament"); 
  };

  return { formik, isEdit, handleClick};
}
