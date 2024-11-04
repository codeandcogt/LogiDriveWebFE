import { DepartamentCreate, DepartamentRequest } from "@/interface/location/departament/Departament";
import { useDepartamentStore, useSession } from "@/store";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { post, put } from "@/services";
import { ShowToast } from "@/lib";

export const useFormDepartament = () => {
  const { department, isEdit } = useDepartamentStore();
  const { session } = useSession();
  const navigation = useNavigate();

  const initialValues: DepartamentRequest = {
    idDepartment:department?.idDepartment || 0,
    name: department?.name || "",
    status: department?.status ?? true,
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
        status: true,
      };
      const response = await post<any>("api/Department", data, session?.token);
      if (response.code === 200) {
        navigation("/location/departament");
        ShowToast("Departamento creado con éxito", "Autorización validada");
      }
    } catch (error) {
      ShowToast("Error al crear departamento", "", true);
      throw Error;
    }
  };

  const updateDepartament = async (values: DepartamentRequest) => {
    try {
      const data: DepartamentRequest = {
        idDepartment:department?.idDepartment || 0, 
        name: values.name,
        status: values.status,
      }
      console.log(department?.idDepartment, "Deparmentid")
      const response = await put<any>(`api/Department/${department?.idDepartment}`, data, session?.token);
      console.log(response)
      if (response.code === 200) {
        ShowToast("Departamento editado con éxito", "Autorización validada");
        navigation("/location/departament");
      }
    } catch (error) {
      ShowToast("Error al editar departamento", "", true);
    }
  };

  const handleClick = () => {
    navigation("/location/departament");
  };

  return { formik, isEdit, handleClick };
};