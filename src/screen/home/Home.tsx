import { Toaster } from "sonner";
import { Layout } from "../../themes";
import React from "react";
import { useSession } from "@/store";

export const Home: React.FC = () => {
  const {session} = useSession();
  console.log(session)
  return (
    <Layout>
      <Toaster />
      <div>Home</div>
    </Layout>
  );
};
