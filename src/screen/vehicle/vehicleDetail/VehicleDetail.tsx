import { Navbar } from "@/components"
import { ListVehicleDetail } from "@/components/template/vehicle/vehicleDetail/ListVehicleDetail/ListVehicleDetail"
import { Layout } from "@/themes"

export const VehicleDetail = () => {
  return (
    <Layout>
      <Navbar/>
      <ListVehicleDetail/>
    </Layout>
  )
}
