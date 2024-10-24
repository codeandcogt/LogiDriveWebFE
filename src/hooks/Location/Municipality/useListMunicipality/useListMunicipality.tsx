import { Municipality } from "@/interface"
import { get } from "@/services"
import { useSession } from "@/store"
import { useQuery } from "@tanstack/react-query"

 
export const useListMunicipality = () => {
    
    const{session}=useSession()
    const fetchMunicipality = async() => {
      try {
        const response = await get<Municipality[]>("api/Town", session?.token)
        return response.data;
      } catch (error) {
        throw Error; 
      }

    };
    const {data, isLoading, error, refetch, isError } = useQuery<Municipality[], Error>({
      queryKey: ["Town-api"],
      queryFn: fetchMunicipality,
      staleTime: 500,

    });

    return {data, isLoading, error, refetch, isError}
    
  
}
