import { Municipality } from "@/interface";
import { ShowToast } from "@/lib";
import { get, remove } from "@/services";
import { useMunicipalityStore, useSession } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useListMunicipality = () => {
  const { setMunicipality, setIsEdit, clear } = useMunicipalityStore();
  const navigation = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [idMunicipality, setIdMunicipality] = useState<number>(0);
  const { session } = useSession();

  const fetchMunicipality = async () => {
    try {
      const response = await get<Municipality[]>("api/Town", session?.token);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const { data, isLoading, error, refetch, isError } = useQuery<
    Municipality[],
    Error
  >({
    queryKey: ["municipality-api"],
    queryFn: fetchMunicipality,
    staleTime: 500,
  });

  const handleClick = () => {
    setIsEdit(false);
    clear();
    navigation("/location/formMunicipality");
  };

  const handleEdit = (data: Municipality) => {
    setIsEdit(true);
    setMunicipality(data);
    navigation("/location/formMunicipality");
  };

  const handleDelete = (data: Municipality) => {
    setIsOpen(true);
    setIdMunicipality(data.idMunicipality);
  };

  const handleConfirm = () => {
    setIsOpen(false);
    deleteMunicipality(idMunicipality);
  };

  const deleteMunicipality = async (id: number) => {
    try {
      const response = await remove<any>(`api/Town/${id}`);
      if (response.code === 200) {
        ShowToast(
          "¡Municipio eliminado con éxito!",
          "Los cambios han sido guardados correctamente"
        );
        refetch();
      }
    } catch (error) {
      ShowToast(
        "No se pudo eliminar el municipio",
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
    error,
    refetch,
    isError,
    handleClick,
    handleDelete,
    handleEdit,
    isOpen,
    setIsOpen,
    handleConfirm,
  };
};