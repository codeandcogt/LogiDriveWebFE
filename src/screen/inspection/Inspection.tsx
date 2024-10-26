import { ListInspection, Navbar } from "@/components"
import { Layout } from "../../themes"
import { Toaster } from "sonner"

export const Inspection = () => {
  return (
    <Layout>
    <Toaster />
      <Navbar />
    <ListInspection/>
    </Layout>
  )
}
