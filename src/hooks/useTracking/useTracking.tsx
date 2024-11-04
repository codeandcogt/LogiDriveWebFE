import { Tracking } from "@/interface";
import { get } from "@/services";
import { useSession } from "@/store";
import { useQuery } from "@tanstack/react-query";

export const useTracking = () => {
  const { session } = useSession();

  const fetchTrip = async () => {
    try {
      const response = await get<Tracking[]>("api/LogTracking", session?.token);
      return response.data;
    } catch (error) {
      throw Error;
    }
  };

  const { data } = useQuery<Tracking[], Error>({
    queryKey: ["api-LogTrip"],
    queryFn: fetchTrip,
    staleTime: 200,
  });
  return { fetchTrip, data };
};
