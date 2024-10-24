import { useNavigate } from "react-router-dom"

export const useFormMunicipality = () => {

  const navigation = useNavigate();

  const handleClick = () => {
    navigation("/location/municipality");
  };

  return {handleClick};
}
