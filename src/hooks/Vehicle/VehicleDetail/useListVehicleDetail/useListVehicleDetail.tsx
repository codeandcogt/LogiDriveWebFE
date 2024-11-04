import { VehicleDetail } from "@/interface";
import { ShowToast } from "@/lib";
import { get, remove } from "@/services";
import { useSession, useVehicleDetailStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useListVehicleDetail = () => {
  const { session } = useSession();
  const navigation = useNavigate();
  const {setIsEdit, setVehicleDetailStore, } = useVehicleDetailStore()
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [idVehicle, setIdVehicle] = useState<number>(0);

  const fetchDetails = async () => {
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

  const { data, isLoading, isError, error, refetch } = useQuery<
    VehicleDetail[], Error>({
    queryKey: ["api-Vehicle"],
    queryFn: fetchDetails,
    staleTime: 5000,
  });

  const handleClick = () => {
    setIsEdit(false)
    setVehicleDetailStore(null)
    navigation("/formVehicleDetail");
  };

  const handleEdit = (data: VehicleDetail) => {
    navigation("/formVehicleDetail");
    setIsEdit(true)
    setVehicleDetailStore(data)
  };

  const handleDelete = (data: VehicleDetail) => {
    setIsOpen(true);
    setIdVehicle(data.idVehicle)
  };

  const handleConfirm = () => {
    deleteArea(idVehicle)
    setIsOpen(false);

  };

  const deleteArea = async (id: number) => {
    try {
      const response = await remove<any>(`api/Vehicle/Status/${id}`, session?.token);
      if (response.code === 200) {
        ShowToast(
          "Vehiculo eliminada con éxito!",
          "Los cambios han sido guardados correctamente"
        );
        refetch();
      }
    } catch (error) {
      ShowToast(
        "No se pudo eliminar el Vehiculo",
        "Por favor, verifica tu conexión e inténtalo nuevamente",
        true
      );

      throw Error;
    }
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
    handleClick,
    handleEdit,
    handleDelete,
    handleConfirm,
    isOpen,
    setIsOpen,
  };
};
