// useFormInspection.ts
import { useState, useEffect } from "react";
import { CreateInspection, VehiclePart } from "@/interface";
import { ShowToast } from "@/lib";
import { get, post } from "@/services";
import { useInspectionStore, useSession } from "@/store";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

export const useFormInspection = () => {
  const { session } = useSession();
  const navigation = useNavigate();
  const { inspection } = useInspectionStore();

  const [step, setStep] = useState(1);
  const [vehicleParts, setVehicleParts] = useState<VehiclePart[]>([]);
  const [isLoadingParts, setIsLoadingParts] = useState(false);

  const initialValues: CreateInspection = {
    idCollaborator: Number(session?.nameidentifier) || 0,
    idVehicleAssignment: inspection?.idVehicleAssignment || 0,
    comment: "",
    odometer: "",
    fuel: "",
    typeInspection: "",
    image: "",
    status: true,
    partsInspected: [],
    logProcess: {
      idLogReservation: inspection?.idLogReservation || 0,
      action: "Crear",
      idCollaborator: Number(session?.nameidentifier) || 0,
      idVehicleAssignment: inspection?.idVehicleAssignment || 0,
    },
  };

  const validationSchema = yup.object().shape({
    comment: yup
      .string()
      .min(5, "El comentario debe tener al menos 5 caracteres")
      .max(500, "El comentario no puede exceder los 500 caracteres")
      .required("El comentario es requerido"),
    odometer: yup.string().required("El odómetro es requerido"),
    fuel: yup.string().required("El nivel de combustible es requerido"),
    typeInspection: yup.string().required("El tipo de inspección es requerido"),
    partsInspected: yup.array().of(
      yup.object().shape({
        idPartVehicle: yup.number().required(),
        comment: yup.string().required("El comentario es requerido"),
        status: yup.boolean().required("El estado es requerido"),
        image: yup.string().nullable(),
        dateInspection: yup.string().required(),
      })
    ),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      if (step === 1) {
        // Validar el primer paso antes de avanzar
        const errors = await formik.validateForm();
        if (
          !errors.comment &&
          !errors.odometer &&
          !errors.fuel &&
          !errors.typeInspection
        ) {
          setStep(2);
        } else {
          // Marcar todos los campos como tocados para mostrar errores
          formik.setTouched({
            comment: true,
            odometer: true,
            fuel: true,
            typeInspection: true,
          });
        }
        setSubmitting(false);
      } else {
        // Enviar el formulario
        try {
          await createInspection(values);
          ShowToast("Inspección creada con éxito", "success");
          navigation("/inspection");
        } catch (error) {
          ShowToast("Error al crear la inspección", "error");
        } finally {
          setSubmitting(false);
        }
      }
    },
  });

  useEffect(() => {
    if (step === 2 && vehicleParts.length === 0) {
      fetchVehicleParts();
    }
  }, [step]);

  const fetchVehicleParts = async () => {
    if (!inspection?.idVehicleAssignment) return;

    setIsLoadingParts(true);
    try {
      const response = await get<VehiclePart[]>(
        `api/VehicleAssignment/${inspection.idVehicleAssignment}/Parts`,
        session?.token
      );
      setVehicleParts(response.data);

      // Inicializar partsInspected en formik
      formik.setFieldValue(
        "partsInspected",
        response.data.map((part) => ({
          idPartVehicle: part.idPartVehicle,
          comment: "",
          status: true,
          image: "",
          dateInspection: new Date().toISOString(),
        }))
      );
    } catch (error) {
      ShowToast("Error al obtener las partes del vehículo", "error");
    } finally {
      setIsLoadingParts(false);
    }
  };

  const createInspection = async (data: CreateInspection) => {
    try {
      const response = await post<any>(
        "api/LogInspection",
        data,
        session?.token
      );
      if (response.code !== 200) {
        throw new Error("Error en la creación de la inspección");
      }
    } catch (error) {
      throw error;
    }
  };

  const handleClose = () => {
    navigation("/inspection");
  };

  // Opciones para el tipo de inspección
  const Type_Inspection = [
    {
      value: "Entrega",
      label: "Entrega",
    },
    {
      value: "Recepción",
      label: "Recepción",
    },
  ];

  return {
    formik,
    handleClose,
    Type_Inspection,
    step,
    vehicleParts,
    isLoadingParts,
  };
};
