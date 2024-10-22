import { Toaster } from "sonner";
import { Layout } from "../../themes";
import React from "react";
import { Navbar } from "@/components";

export const Home: React.FC = () => {

  return (
    <Layout>
      <Toaster />
      <Navbar />
      <div>Home</div>
    </Layout>
  );
};
