import { RequestVehicleDetail } from "@/interface";
import { ShowToast } from "@/lib";
import { post, put } from "@/services";
import { useSession, useVehicleDetailStore } from "@/store";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const currentYear = new Date().getFullYear();

export const useFormVehicleDetail = () => {
  const navigation = useNavigate();
  const { vehicleDetail, isEdit } = useVehicleDetailStore();
  const { session } = useSession();

  const initialValues: RequestVehicleDetail = {
    brand: vehicleDetail?.brand || "",
    plate: vehicleDetail?.plate || "",
    tyoe: vehicleDetail?.tyoe || "",
    year: vehicleDetail?.year || "",
    mileage: vehicleDetail?.mileage || "",
    capacity: vehicleDetail?.capacity || 0,
    statusVehicle: vehicleDetail?.statusVehicle || "",
    status: vehicleDetail?.status || true,
  };

  const validationSchema = Yup.object().shape({
    brand: Yup.string()
      .required("La marca es requerida")
      .min(2, "La marca debe tener al menos 2 caracteres")
      .max(50, "La marca no puede tener más de 50 caracteres"),

    plate: Yup.string()
      .required("La placa es requerida")
      .matches(
        /^[A-Z0-9]{6,7}$/,
        "La placa debe tener formato válido (ej: ABC1234)"
      )
      .min(6, "La placa debe tener al menos 6 caracteres")
      .max(7, "La placa no puede tener más de 7 caracteres"),

    tyoe: Yup.string()
      .required("El tipo de vehículo es requerido")
      .min(2, "El tipo debe tener al menos 2 caracteres")
      .max(50, "El tipo no puede tener más de 50 caracteres"),

    year: Yup.string()
      .required("El año es requerido")
      .matches(/^\d{4}$/, "El año debe tener 4 dígitos")
      .test("year", "El año debe estar entre 1900 y el año actual", (value) => {
        if (!value) return false;
        const year = parseInt(value);
        return year >= 1900 && year <= currentYear;
      }),

    mileage: Yup.string()
      .required("El kilometraje es requerido")
      .matches(/^\d+$/, "El kilometraje debe ser un número válido")
      .test(
        "mileage",
        "El kilometraje debe ser un valor razonable",
        (value) => {
          if (!value) return false;
          const mileage = parseInt(value);
          return mileage >= 0 && mileage <= 1000000;
        }
      ),

    capacity: Yup.number()
      .required("La capacidad es requerida")
      .min(1, "La capacidad debe ser al menos 1")
      .max(100, "La capacidad no puede ser mayor a 100")
      .integer("La capacidad debe ser un número entero"),

    statusVehicle: Yup.string()
      .required("El estado del vehículo es requerido")
      .oneOf(
        ["Disponible", "En mantenimiento", "En uso", "Fuera de servicio"],
        "Estado de vehículo no válido"
      ),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);

        const data: RequestVehicleDetail={
            brand: values.brand,
            plate: values.plate,
            tyoe: values.tyoe,
            year: values.year.toString(),
            mileage: values.mileage.toString(),
            capacity: values.capacity,
            statusVehicle: values.statusVehicle,
            status: values.status
        }

        if (isEdit && vehicleDetail?.idVehicle) {
          await updateVehicleDetail(data);
        } else {
          await createVehicleDetail(data);
        }
      } catch (error) {
        throw Error;
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleClose = () => {
    navigation(-1);
  };

  const createVehicleDetail = async (values: RequestVehicleDetail) => {
    try {
        
      const response = await post<any>("api/Vehicle", values, session?.token);
      console.log(response, "create")
      if (response.code === 200) {
        navigation("/vehicleDetail");
        ShowToast("Vehiculo creada con exito", "Autorización validada");
      }
    } catch (error) {
      ShowToast("Error al crear areá", "", true);
      throw Error;
    }
  };

  const updateVehicleDetail = async (values: RequestVehicleDetail) => {
    try {
        console.log(values, "update")
      const response = await put<any>(
        `api/Vehicle/${vehicleDetail?.idVehicle}`,
        values,
        session?.token
      );
      console.log(response, "update")
      if (response.code === 200) {
        ShowToast("Vehiculo editada con exito", "Autorización validada");
        navigation("/vehicleDetail");
      }
    } catch (error) {
      ShowToast("Error al crear areá", "", true);
    }
  };

  const VEHICLE_TYPES = [
    { value: "Bus", label: "Bus" },
    { value: "Pick Up", label: "Pick Up" },
    { value: "Vehiculo Particular", label: "Vehiculo Particular" },
  ];

  const VEHICLE_STATUS = [
    { value: "Disponible", label: "Disponible" },
    { value: "En mantenimiento", label: "En mantenimiento" },
    { value: "En uso", label: "En uso" },
    { value: "Fuera de servicio", label: "Fuera de servicio" },
  ];

  return { formik, handleClose, VEHICLE_STATUS, VEHICLE_TYPES, isEdit };
};
