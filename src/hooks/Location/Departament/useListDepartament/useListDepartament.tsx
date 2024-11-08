import { Departament } from "@/interface";
import { ShowToast } from "@/lib";
import { get, remove } from "@/services";
import { useDepartamentStore, useSession } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useListDepartament = () => {
  const { setDepartament, setIsEdit, clear } = useDepartamentStore();
  const navigation = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [idDepartment, setIdDepartment] = useState<number>(0);
  const { session } = useSession();
  const [open, setOpen] = useState<boolean>(false)

  const fetchDepartament = async () => {
    try {
      const response = await get<Departament[]>("api/Department", session?.token);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const { data, isLoading, error, refetch, isError } = useQuery<
    Departament[],
    Error
  >({
    queryKey: ["department-api"],
    queryFn: fetchDepartament,
    staleTime: 500,
  });

  const handleClick = () => {
    setIsEdit(false);
    clear();
    navigation("/location/formDepartment");
  };

  const handleEdit = (data: Departament) => {
    setIsEdit(true);
    setDepartament(data);
    navigation("/location/formDepartment");
  };

  const handleDelete = (data: Departament) => {
    setIsOpen(true);
    setIdDepartment(data.idDepartment);
  };

  const handleConfirm = () => {
    setIsOpen(false);
    deleteDepartament(idDepartment);
  };

  const deleteDepartament = async (id: number) => {
    try {
      const response = await remove<any>(`api/Department/${id}`, session?.token);
      console.log("response", response)
      if (response.code === 200) {
        ShowToast(
          "¡Departamento eliminado con éxito!",
          "Los cambios han sido guardados correctamente"
        );
        refetch();
      }else if(response.code === 500) {
        ShowToast(
          "No se puede eliminar",
          "El departamento esta enlazado con municipio"
        );
        setOpen(true)
      }
    } catch (error) {
      ShowToast(
        "No se pudo eliminar el departamento",
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
    open,
    setOpen,
  };
};