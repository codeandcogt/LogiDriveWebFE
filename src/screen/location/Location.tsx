import { ButtonNav, Navbar } from "@/components"
import { Layout } from "../../themes"
import { useFormMunicipality } from "@/hooks/Location/Municipality";
import { useNavigate } from "react-router-dom";

export const Location = () => {
  const navigation = useNavigate();
  const { handleClick: handleMunicipalityClick } = useFormMunicipality();
  const handleClose = () => {
    navigation("/location/departament"); 
  };
  return (
    <Layout>
        <Navbar/>
        <div className="h-[calc(90vh-6rem)] px-4">
        <div className="grid grid-cols-2 gap-4 h-full mx-12">
          <div className="mr-2">
            <ButtonNav
              imageUrl={
                "https://i.pinimg.com/736x/2f/4f/c9/2f4fc9c4e051a306024239fa5c1f1047.jpg"
              }
              alt={""}
              title={"Departamentos"}
              onClick={handleClose}
              fill="#a5c589"
            />
          </div>
          <div className="ml-2">
            <ButtonNav
              imageUrl={
                "https://i.pinimg.com/564x/a9/5e/1d/a95e1dc7f0b29234ead4944c3a9d50ea.jpg"
              }
              alt={""}
              title={"Municipalidad"}
              onClick={handleMunicipalityClick}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}
