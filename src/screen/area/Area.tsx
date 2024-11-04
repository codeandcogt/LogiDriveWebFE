import { ListArea, Navbar } from "@/components";
import { Layout } from "../../themes";
import { Toaster } from "sonner";

export const Area = () => {
  return (
    <Layout>
      <Toaster />
      <Navbar />
      <ListArea/>
    </Layout>
  );
};
