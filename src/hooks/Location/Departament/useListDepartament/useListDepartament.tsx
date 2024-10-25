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
  const [idDepartament, setIdDepartament] = useState<number>(0);
  const {session} = useSession();

  const fetchDepartament = async () => {
    try {
      const response = await get<Departament[]>("api/Department",session?.token );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const { data, isLoading, error, refetch, isError } = useQuery<Departament[], Error>({
    queryKey: ["department-api"],
    queryFn: fetchDepartament,
    staleTime: 500,
  });

  const handleClick = () => {
    setIsEdit(false);
    clear();
    navigation("/location/DepartamentForm");
  };

  const handleEdit = (data: Departament) => {
    setIsEdit(true);
    setDepartament(data);
    navigation("/location/DepartamentForm");
  };

  const handleDelete = (data: Departament) => {
    setIsOpen(true);
    setIdDepartament(data.idDepartment);
  };

  const handleConfirm = () => {
    setIsOpen(false);
    deleteDepartament(idDepartament);
  };

  const deleteDepartament = async (id: number) => {
    try {
      const response = await remove<any>(`api/Department/Status/${id}`);
      if (response.code === 200) {
        ShowToast(
          "¡Departamento eliminada con éxito!",
          "Los cambios han sido guardados correctamente"
        );
        refetch();
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
  };
};
