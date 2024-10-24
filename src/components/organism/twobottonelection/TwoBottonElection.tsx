import { Button } from "@/components/ui/button"
import { useFormDepartament } from "@/hooks/Location/Departament"
import { useFormMunicipality } from "@/hooks/Location/Municipality"


export const TwoBottonElection = () => {
  const { handleClick: handleDepartamentClick } = useFormDepartament();
  const { handleClick: handleMunicipalityClick } = useFormMunicipality();

  return (
    <div>
      <Button
        onClick={handleDepartamentClick}
        >Departamentos</Button>

      <Button
        onClick={handleMunicipalityClick}
        >Munipios</Button>
    </div>

  )
}
