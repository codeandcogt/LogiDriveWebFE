import { CreateBooking, RequestBooking, VehicleDetail } from "@/interface";
import { ShowToast } from "@/lib";
import { get, post } from "@/services";
import { useAssigmentStore, useSession } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

interface SelectOption {
  value: string;
  label: string;
}

export const useFormBooking = () => {
  const { session } = useSession();
  const navigation = useNavigate();
  const { assigment } = useAssigmentStore();

  const initialValues: RequestBooking = {
    idVehicleAssignment: 0,
    comment: "",
    tripType: "",
    startDate: "",
    endDate: "",
    idVehicle: 0,
    idLogReservation: assigment?.idLogReservation || 0,
    status: true,
    creationDate: "",
    statusTrip: false,
    dayQuantity: 0,
  };

  const bookingValidationSchema = yup.object().shape({
    comment: yup
      .string()
      .min(5, "El comentario debe tener al menos 5 caracteres")
      .max(500, "El comentario no puede exceder los 500 caracteres")
      .required("El comentario es requerido"),

    dayQuantity: yup
      .number()
      .positive("Solo valores positivos")
      .required("El comentario es requerido"),

    tripType: yup.string().required("El tipo de viaje es requerido"),

    startDate: yup
      .string()
      .matches(
        /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2})?$/,
        "Formato de fecha inválido"
      )
      .test(
        "future-date",
        "La fecha de inicio debe ser futura",
        function (value) {
          if (!value) return false;
          return new Date(value) > new Date();
        }
      )
      .required("La fecha de inicio es requerida"),

    endDate: yup
      .string()
      .matches(
        /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2})?$/,
        "Formato de fecha inválido"
      )
      .test(
        "after-start-date",
        "La fecha final debe ser posterior a la fecha de inicio",
        function (value) {
          const { startDate } = this.parent;
          if (!value || !startDate) return false;
          return new Date(value) > new Date(startDate);
        }
      )
      .required("La fecha final es requerida"),

    idVehicle: yup
      .number()
      .min(1, "Debe seleccionar un vehículo")
      .required("El vehículo es requerido"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: bookingValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const data: CreateBooking = {
          comment: values.comment,
          tripType: values.tripType,
          startDate: values.startDate,
          endDate: values.endDate,
          idVehicle: values.idVehicle,
          idLogReservation: initialValues.idLogReservation,
          status: true,
          statusTrip: false,
          dayQuantity: values.dayQuantity
        };

        await createAssignment(data);
      } catch (error) {
        ShowToast("Error al crear la asignación", "error");
      } finally {
        setSubmitting(false);
      }
    },
  });

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

  const handleClose = () => {
    navigation("/assignment");
  };

  const Type_Trip = [
    {
      value: "Personal",
      label: "Personal",
    },
    {
      value: "Grupal",
      label: "Grupal",
    },
  ];

  const createAssignment = async (data: CreateBooking) => {
    try {
      const response = await post<any>(
        "api/VehicleAssignment",
        data,
        session?.token
      );
      if (response.code === 200) {
        navigation("/assignment");
        ShowToast("Vehiculo creada con exito", "Autorización validada");
      }
    } catch (error) {
      throw Error;
    }
  };

  return { formik, vehiclesData, isLoading, handleClose, Type_Trip };
};
