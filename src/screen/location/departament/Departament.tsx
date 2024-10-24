import { Navbar } from "@/components"
import { ListDepartament } from "@/components/template/location"
import { useListDepartament } from "@/hooks/Location/Departament"
import { Layout } from "@/themes"
import { Toaster } from "sonner"

export const Departament = () => {
    const{data} = useListDepartament()
    console.log("data ",data)
  return (

    <Layout>
        <Toaster />
        <Navbar />
        <ListDepartament />
    </Layout>
  )
}
