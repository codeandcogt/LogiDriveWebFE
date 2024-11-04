import { RequestVehiclePart, SelectOption, VehicleDetail } from "@/interface";
import { ShowToast } from "@/lib";
import { get, post, put } from "@/services";
import { useSession, useVehiclePartStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export const useFormVehicleParts = () => {
  const navigation = useNavigate();
  const { isEdit, vehiclePart } = useVehiclePartStore();
  const { session } = useSession();

  const initialValues: RequestVehiclePart = {
    name: vehiclePart?.name || "",
    description: vehiclePart?.description || "",
    statusPart: vehiclePart?.statusPart || "",
    idVehicle: vehiclePart?.idVehicle || 0,
    status: vehiclePart?.status || true,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("El nombre de la parte es requerido")
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .max(50, "El nombre no puede exceder los 50 caracteres")
      .matches(
        /^[a-zA-Z0-9\s]+$/,
        "El nombre solo puede contener letras, números y espacios"
      ),

    description: Yup.string()
      .required("La descripción es requerida")
      .min(10, "La descripción debe tener al menos 10 caracteres")
      .max(200, "La descripción no puede exceder los 200 caracteres"),

    statusPart: Yup.string()
      .required("El estado de la parte es requerido"),

    idVehicle: Yup.number()
      .required("El ID del vehículo es requerido")
      .positive("El ID del vehículo debe ser un número positivo")
      .integer("El ID del vehículo debe ser un número entero"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);

        const data: RequestVehiclePart = {
          name: values.name,
          description: values.description,
          statusPart: values.statusPart,
          idVehicle: values.idVehicle,
          status: values.status,
        };

        if (isEdit && vehiclePart?.idPartVehicle) {
          await updateVehiclePart(data);
        } else {
          await createVehiclePart(data);
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

  const createVehiclePart = async (values: RequestVehiclePart) => {
    try {
      const response = await post<any>(
        "api/PartVehicle",
        values,
        session?.token
      );
      if (response.code === 200) {
        navigation("/vehiclePart");
        ShowToast("Vehiculo creada con exito", "Autorización validada");
      }
    } catch (error) {
      ShowToast("Error al crear areá", "", true);
      throw Error;
    }
  };

  const updateVehiclePart = async (values: RequestVehiclePart) => {
    try {
      const response = await put<any>(
        `api/PartVehicle/${vehiclePart?.idPartVehicle}`,
        values,
        session?.token
      );
      if (response.code === 200) {
        ShowToast("Vehiculo editada con exito", "Autorización validada");
        navigation("/vehiclePart");
      }
    } catch (error) {
      ShowToast("Error al crear areá", "", true);
    }
  };

  const VEHICLE_PART_STATUSES = [
    {
      value: "Nuevo",
      label: "Nuevo",
    },
    {
      value: "Usado",
      label: "Usado",
    },
    {
      value: "Desgastado",
      label: "Desgastado",
    },
    {
      value: "Roto",
      label: "Roto/Dañado",
    },
    {
      value: "Oxidado",
      label: "Oxidado",
    },
    {
      value: "Reparado",
      label: "Reparado",
    },
    {
      value: "Reacondicionado",
      label: "Reacondicionado",
    },
    {
      value: "Fuera_Servicio",
      label: "Fuera de servicio",
    },
  ];

  const fetchVehicle = async () => {
    try {
      const response = await get<VehicleDetail[]>(
        "api/Vehicle",
        session?.token
      );
      return response.data;
    } catch (error) {
      throw Error;
    }
  };

  const { data: vehiclesData, isLoading } = useQuery<
    VehicleDetail[],
    Error,
    SelectOption[]
  >({
    queryKey: ["api-Vehicle"],
    queryFn: fetchVehicle,
    staleTime: 5000,
    select: (vehicles) =>
      vehicles.map((vehicle) => ({
        value: vehicle.idVehicle.toString(),
        label: `${vehicle.brand} - ${vehicle.plate}`,
      })),
  });

  return {
    handleClose,
    vehiclesData,
    isLoading,
    formik,
    isEdit,
    VEHICLE_PART_STATUSES,
  };
};
