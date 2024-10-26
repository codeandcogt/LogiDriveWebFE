import { Toaster } from "sonner";
import { Layout } from "../../themes";
import React from "react";
import { HomeComponent, Navbar } from "@/components";

export const Home: React.FC = () => {

  return (
    <Layout>
      <Toaster />
      <Navbar />
      <HomeComponent/>
    </Layout>
  );
};
