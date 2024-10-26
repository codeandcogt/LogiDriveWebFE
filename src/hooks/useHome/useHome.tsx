import { VehicleDetail } from "@/interface";
import { get } from "@/services";
import { useSession } from "@/store";
import { useQuery } from "@tanstack/react-query";

interface ReservationData {
  idLogReservation: number;
  idCollaborator: number;
  name: string;
  lastName: string;
  comment: string;
  idTown: number;
  numberPeople: number;
  statusReservation: string;
  justify: string;
  addres: string;
  status: boolean;
  creationDate: string;
}

export const useHome = () => {
  const { session } = useSession();
  const fetchData = async () => {
    try {
      const response = await get<ReservationData[]>(
        "api/LogReservation",
        session?.token
      );
      return response.data;
    } catch (error) {
      throw Error;
    }
  };

  const { data, isLoading, isError, refetch } = useQuery<
    ReservationData[],
    Error
  >({
    queryKey: ["resetvation-get"],
    queryFn: fetchData,
    staleTime: 5000,
  });

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

  const {
    data: vehicle,
    isLoading: vehicleLoading,
    isError: vehicleisError,
    error: vehicleEror,
    refetch: refetchVehicle,
  } = useQuery<VehicleDetail[], Error>({
    queryKey: ["api-Vehicle"],
    queryFn: fetchDetails,
    staleTime: 5000,
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
    vehicle,
    vehicleLoading,
    vehicleEror,
    vehicleisError,
    refetchVehicle,
  };
};
