import { Route, Routes } from "react-router-dom";
import { routes } from "./routerConfig";
import { Login, Page404 } from "@/screen";
import { AuthGuard } from "../guards";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/unautorized" element={<Page404 />} />
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={<AuthGuard>{route.element}</AuthGuard>}
        />
      ))}
    </Routes>
  );
};