import { RequestAssigment } from "@/interface";
import { ShowToast } from "@/lib";
import { patch } from "@/services";
import { useAssigmentStore, useSession } from "@/store";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useFormAssigment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { assigment } = useAssigmentStore();
  const { session } = useSession();
  const navigation = useNavigate();

  const initialValues: RequestAssigment = {
    statusReservation: "",
    justify: "",
  };

  const updateAssigment = async (data: RequestAssigment) => {
    try {
      console.log(data, "data")
      const response = await patch<any>(
        `api/LogReservation/${assigment?.idLogReservation}/status`,
        data,
        session?.token
      );
      if (response.code === 200) {
        ShowToast(
          "¡Operación exitosa!",
          `La solicitud ha sido ${data.statusReservation.toLowerCase()} correctamente`
        );
        if (data.statusReservation === "Rechazado") {
        } else {
        }
      } else {
        ShowToast(
          "Error en la operación",
          "Por favor, verifica tu conexión e inténtalo nuevamente",
          true
        );
      }
    } catch (error) {
      throw Error;
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const data: RequestAssigment = {
          statusReservation: isModalOpen ? "Rechazado" : "Aceptado",
          justify: values.justify || "Solicitud aceptada",
        };
        await updateAssigment(data);
      } catch (error) {
        console.error(error);
      } finally {
        setSubmitting(false);
        setIsModalOpen(false);
      }
    },
  });

  const handleModalSave = (justification: string) => {
    formik.setFieldValue('justify', justification);
    formik.handleSubmit();
    navigation("/assignment");
  };

  const handleAccept = () => {
    formik.setFieldValue('justify', 'Solicitud aceptada');
    setIsModalOpen(false)
    formik.handleSubmit();
    navigation("/formBooking");

  };

  return {
    formik,
    isModalOpen,
    setIsModalOpen,
    assigment,
    handleAccept,
    handleModalSave,
  };
};