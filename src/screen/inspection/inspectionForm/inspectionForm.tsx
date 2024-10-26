import { Toaster } from "sonner"
import { Layout } from "@/themes";
import { FormInspection } from "@/components";

export const inspectionForm = () => {
  return (
    <Layout>
      <Toaster  />
      <FormInspection />
    </Layout>
  )
}
