import { MunicipalityCreate, MunicipalityRequest } from "@/interface/location/municipality/Municipality";
import { useMunicipalityStore } from "@/store";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { post, put } from "@/services";
import { ShowToast } from "@/lib";

export const useFormMunicipality = () => {
  const { municipality, isEdit } = useMunicipalityStore();
  const navigation = useNavigate();

  const initialValues: MunicipalityRequest = {
    name: municipality?.name || "",
    status: municipality?.status ?? true,
    description: ""
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
        if (isEdit && municipality?.idMunicipality) {
          await updateMunicipality(values);
        } else {
          await createMunicipality(values);
        }
      } catch (error) {
        throw Error;
      } finally {
        setSubmitting(false);
      }
    },
  });

  const createMunicipality = async (values: MunicipalityRequest) => {
    try {
      const data: MunicipalityCreate = {
        name: values.name,
        description: ""
      };
      const response = await post<any>("api/Town", data);
      if (response.code === 200) {
        navigation("/location/municipality");
        ShowToast("Municipio creado con éxito", "Autorización validada");
      }
    } catch (error) {
      ShowToast("Error al crear municipio", "", true);
      throw Error;
    }
  };

  const updateMunicipality = async (values: MunicipalityRequest) => {
    try {
      const response = await put<any>(
        `api/Town/${municipality?.idMunicipality}`,
        values
      );
      if (response.code === 200) {
        ShowToast("Municipio editado con éxito", "Autorización validada");
        navigation("/location/municipality");
      }
    } catch (error) {
      ShowToast("Error al editar municipio", "", true);
    }
  };

  const handleClick = () => {
    navigation("/location/municipality");
  };

  return { formik, isEdit, handleClick };
};