import { Button } from "@/components/ui/button"

import { useFormMunicipality } from "@/hooks/Location/Municipality"
import { useNavigate } from "react-router-dom";


export const TwoBottonElection = () => {
  
  const { handleClick: handleMunicipalityClick } = useFormMunicipality();
  const navigation = useNavigate();

  const handleClose = () => {
    navigation("/location/departament"); 
  };

  return (

    <div>
      <Button
        onClick={handleClose}
        >Departamentos</Button>

      <Button
        onClick={handleMunicipalityClick}
        >Munipios</Button>
    </div>

  )
}
