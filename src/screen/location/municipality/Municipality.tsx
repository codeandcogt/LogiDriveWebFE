import { Navbar } from "@/components"
import { ListMunicipality } from "@/components/template/location"
import { useListMunicipality } from "@/hooks/Location/Municipality"
import { Layout } from "@/themes"
import { Toaster } from "sonner"

export const Municipality = () => {
    const {data} = useListMunicipality()
    console.log("data ", data)
    return (
        <Layout>
            <Toaster />
            <Navbar />
            <ListMunicipality />
        </Layout>
    )
}