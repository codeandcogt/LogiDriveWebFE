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
                "https://i.pinimg.com/564x/ca/f6/ae/caf6ae72543eaee2599552d00704983c.jpg"
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
                "https://i.pinimg.com/564x/ca/f6/ae/caf6ae72543eaee2599552d00704983c.jpg"
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
