import { AssigmentInterface } from "@/interface";
import { get } from "@/services";
import { useAssigmentStore, useSession } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useListAssigment = () => {
  const { session } = useSession();
  const navigation = useNavigate();
  const { setAssigment, setIsEdit } = useAssigmentStore();

  const fetchArea = async () => {
    try {
      const response = await get<AssigmentInterface[]>(
        "api/LogReservation",
        session?.token
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const { data, isLoading, error, refetch, isError } = useQuery<
    AssigmentInterface[],
    Error
  >({
    queryKey: ["area-api"],
    queryFn: fetchArea,
    staleTime: 500,
  });

  const handleEdit = (data: AssigmentInterface) => {
    setIsEdit(true);
    setAssigment(data);
    navigation("/formAssigment");
  };

  

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { handleEdit, data, isError, isLoading, error };
};
