import { UserInterface } from "@/interface";
import { ShowToast } from "@/lib";
import { get, remove } from "@/services";
import { useSession, useUserStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useListUsers = () => {
  const { session } = useSession();
  const navigation = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [idUser, setIdUser] = useState<number>(0);
  const { setIsEdit, setUser, clear } = useUserStore();

  const fetchUser = async () => {
    try {
      const response = await get<UserInterface[]>(
        "api/AppUser/userCollaborator",
        session?.token
      );
      return response.data;
    } catch (error) {
      throw Error;
    }
  };

  const { data, isError, error, refetch, isLoading } = useQuery<
    UserInterface[],
    Error
  >({
    queryKey: ["api-AppUser-userCollaborator"],
    queryFn: fetchUser,
    staleTime: 5000,
  });

  const handleClick = () => {
    setIsEdit(false);
    clear();
    navigation("/formUser");
  };

  const handleEdit = (data: UserInterface) => {
    setIsEdit(true);
    setUser(data);
    navigation("/formUser");
  };

  const handleDelete = (data: UserInterface) => {
    setIsOpen(true);
    setIdUser(data.appUserId);
  };

  const handleConfirm = () => {
    setIsOpen(false);
    deleteArea(idUser);
  };

  const deleteArea = async (id: number) => {
    try {
      const response = await remove<any>(
        `api/AppUser/deleteUserCollaborator/${id}`,
        session?.token
      );

      console.log(response, "values delete");

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
