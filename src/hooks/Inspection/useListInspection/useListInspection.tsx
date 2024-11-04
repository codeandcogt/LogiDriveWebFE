import { InspectionInterface } from "@/interface";
import { get } from "@/services";
import { useInspectionStore, useSession } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useListInspection = () => {
  const { session } = useSession();
  const navigation = useNavigate();
  const { setInspection, setIsEdit } = useInspectionStore();

  const fetchInspection = async () => {
    try {
      const response = await get<InspectionInterface[]>(
        "api/VehicleAssignment",
        session?.token
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const { data, isLoading, error, refetch, isError } = useQuery<
    InspectionInterface[],
    Error
  >({
    queryKey: ["inspection-api"],
    queryFn: fetchInspection,
    staleTime: 500,
  });

  const handleEdit = (data: InspectionInterface) => {
    setIsEdit(true);
    setInspection(data);
    navigation("/formInspection");
  };

  

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { handleEdit, data, isError, isLoading, error };
};

