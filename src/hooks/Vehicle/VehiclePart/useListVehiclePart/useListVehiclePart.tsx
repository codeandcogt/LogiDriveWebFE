import { VehiclePart } from "@/interface";
import { ShowToast } from "@/lib";
import { get, remove } from "@/services";
import { useSession, useVehiclePartStore } from "@/store";
import { useQuery} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useListVehiclePart = () => {
  const { session } = useSession();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [idPart, setIdPart] = useState<number>(0);
  const navigation = useNavigate();
  const { setIsEdit, setVehiclePartStore } = useVehiclePartStore();

  const fetchVehiclePart = async () => {
    try {
      const response = await get<VehiclePart[]>(
        "api/PartVehicle",
        session?.token
      );

      return response.data;
    } catch (error) {
      throw Error;
    }
  };

  const { data, isError, isLoading, error, refetch } = useQuery<
    VehiclePart[],
    Error
  >({
    queryKey: ["api-PartVehicle"],
    queryFn: fetchVehiclePart,
    staleTime: 5000,
  });

  const handleClick = () => {
    setIsEdit(false);
    setVehiclePartStore(null);
    navigation("/formVehiclePart");
  };

  const handleEdit = (data: VehiclePart) => {
    navigation("/formVehiclePart");
    setIsEdit(true);
    setVehiclePartStore(data);
  };

  const handleDelete = (data: VehiclePart) => {
    setIsOpen(true);
    setIdPart(data.idPartVehicle);
  };

  const handleConfirm = () => {
    deleteArea(idPart);
    setIsOpen(false);
  };

  const deleteArea = async (id: number) => {
    try {
      const response = await remove<any>(
        `api/PartVehicle/Status/${id}`,
        session?.token
      );

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
    isError,
    isLoading,
    error,
    refetch,
    handleClick,
    handleConfirm,
    handleDelete,
    handleEdit,
    isOpen,
    setIsOpen,
  };
};
