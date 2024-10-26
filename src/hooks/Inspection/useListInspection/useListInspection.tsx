import { Area } from "@/interface";
import { ShowToast } from "@/lib";
import { get, remove } from "@/services";
import { useAreaStore, useSession } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useListInspection = () => {
    const { setArea, setIsEdit, clear } = useAreaStore();
    const { session }= useSession()
    const navigation = useNavigate();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [idArea, setIdArea] = useState<number>(0);
  
    const fetchArea = async () => {
      try {
        const response = await get<Area[]>("api/Area", session?.token);
        return response.data;
      } catch (error) {
        throw error;
      }
    };
  
    const { data, isLoading, error, refetch, isError } = useQuery<Area[], Error>({
      queryKey: ["area-api"],
      queryFn: fetchArea,
      staleTime: 500,
    });
  
    const handleClick = () => {
      setIsEdit(false);
      clear();
      navigation("/areaForm");
    };
  
    const handleEdit = (data: Area) => {
      setIsEdit(true);
      setArea(data);
      navigation("/areaForm");
    };
  
    const handleDelete = (data: Area) => {
      setIsOpen(true);
      setIdArea(data.idArea);
    };
  
    const handleConfirm = () => {
      setIsOpen(false);
      deleteArea(idArea);
    };
  
    const deleteArea = async (id: number) => {
      try {
        const response = await remove<any>(`api/Area/Status/${id}`, session?.token);
        if (response.code === 200) {
          ShowToast(
            "¡Área eliminada con éxito!",
            "Los cambios han sido guardados correctamente"
          );
          refetch();
        }
      } catch (error) {
        ShowToast(
          "No se pudo eliminar el área",
          "Por favor, verifica tu conexión e inténtalo nuevamente",
          true
        );
  
        throw Error;
      }
    };
  
    useEffect(() => {
      refetch();
    }, [refetch]);
  return (
    <div>useListInspection</div>
  )
}
