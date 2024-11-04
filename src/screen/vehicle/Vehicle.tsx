import { ButtonNav, Navbar } from "@/components";
import { Layout } from "../../themes";
import { useNavigate } from "react-router-dom";

export const Vehicle = () => {
  const navigation = useNavigate();

  return (
    <Layout>
      <Navbar/>
      <div className="h-[calc(90vh-6rem)] px-4">
        <div className="grid grid-cols-2 gap-4 h-full mx-12">
          <div className="mr-2">
            <ButtonNav
              imageUrl={
                "https://i.pinimg.com/564x/95/be/c8/95bec838a563bf357c775c19cf531d97.jpg"
              }
              alt={""}
              title={"Vehiculos"}
              onClick={()=> navigation("/vehicleDetail")}
              fill="#a5c589"
            />
          </div>
          <div className="ml-2">
            <ButtonNav
              imageUrl={
                "https://i.pinimg.com/564x/03/71/68/037168ce9d663d7b78a547a267e3e20a.jpg"
              }
              alt={""}
              title={"Partes"}
              onClick={()=> navigation("/vehiclePart")}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};
