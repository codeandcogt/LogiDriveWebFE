import { MunicipalityCreate, MunicipalityRequest } from "@/interface/location/municipality/Municipality";
import { Departament } from "@/interface/location/departament/Departament";
import { useMunicipalityStore, useSession } from "@/store";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { post, put, get } from "@/services";
import { ShowToast } from "@/lib";
import { useQuery } from "@tanstack/react-query";
import { SelectOption } from "@/interface";

export const useFormMunicipality = () => {
  const { municipality, isEdit } = useMunicipalityStore();
  const { session } = useSession();
  const navigation = useNavigate();

  const initialValues: MunicipalityRequest = {
    idTown: municipality?.idTown || 0,
    name: municipality?.name || "",
    status: municipality?.status ?? true,
    idDepartment: municipality?.idDepartment || 0,
  };

  const fetchDepartments = async () => {
    try {
      const response = await get<Departament[]>( "api/Department",session?.token);
      return response.data;
    } catch (error) {
      throw Error;
    }
  };

  const { data: departmentsData, isLoading } = useQuery<
    Departament[],
    Error,
    SelectOption[]
  >({
    queryKey: ["api-Department"],
    queryFn: fetchDepartments,
    staleTime: 5000,
    select: (departments) =>
      departments.map((department) => ({
        value: department.idDepartment.toString(),
        label: department.name,
      })),
  });

 

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("El nombre es requerido")
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .max(50, "El nombre no puede tener más de 50 caracteres")
      .matches(
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ][a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/,
        "El nombre debe comenzar con una letra y solo puede contener letras y espacios"
      ),
    idDepartment: Yup.string()
      .required("El departamento es requerido"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      console.log(isEdit)
      console.log(municipality?.idTown)

      try {
        if (isEdit && municipality?.idTown) {
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
    console.log("create")
    try {
      const data: MunicipalityCreate = {
        name: values.name,
        status: true,
        idDepartment: Number(values.idDepartment),
      };
      const response = await post<any>("api/Town", data, session?.token);
      console.log(response, "response create")
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
    console.log("update")
    try {
      const data: MunicipalityRequest = {
        idTown: municipality?.idTown || 0,
        name: values.name,
        status: values.status,
        idDepartment: Number(values.idDepartment),
      };
      
      const response = await put<any>(`api/Town/${municipality?.idTown}`,data,session?.token);
      console.log(response, "response update")
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

  return { 
    formik, 
    isEdit, 
    handleClick, 
    departmentsData, 
    isLoading 
  };
};