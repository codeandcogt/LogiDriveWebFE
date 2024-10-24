import { useListMunicipality } from "@/hooks/Location/Municipality"
import { Layout } from "@/themes"

export const Municipality = () => {
    const{data} = useListMunicipality()
    console.log("data ",data)
  return (
    <Layout>  
      <div>Municipality</div>
    </Layout>
  )
}
