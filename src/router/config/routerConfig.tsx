/* eslint-disable react-refresh/only-export-components */
import { Route } from "@/lib";
import { lazy } from "react";

const Home = lazy(() => import("../../screen").then(module => ({ default: module.Home })));
const Login = lazy(() => import("../../screen").then(module => ({ default: module.Login })));

export const routes: Route[] = [
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/home",
        element: <Home />
    }
];