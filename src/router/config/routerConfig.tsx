/* eslint-disable react-refresh/only-export-components */
import { Route } from "@/lib";
import { lazy } from "react";

const Home = lazy(() => import("../../screen").then(module => ({ default: module.Home })));
const Login = lazy(() => import("../../screen").then(module => ({ default: module.Login })));
const Area = lazy(() => import("../../screen").then(module => ({ default: module.Area })));
const Assignment = lazy(() => import("../../screen").then(module => ({ default: module.Assignment })));
const Inspection = lazy(() => import("../../screen").then(module => ({ default: module.Inspection })));
const Location = lazy(() => import("../../screen").then(module => ({ default: module.Location })));
const Maintenance = lazy(() => import("../../screen").then(module => ({ default: module.Maintenance })));
const Request = lazy(() => import("../../screen").then(module => ({ default: module.Request })));
const Tracking = lazy(() => import("../../screen").then(module => ({ default: module.Tracking })));
const User = lazy(() => import("../../screen").then(module => ({ default: module.User })));
const Vehicle = lazy(() => import("../../screen").then(module => ({ default: module.Vehicle })));
const Report = lazy(() => import("../../screen").then(module => ({ default: module.Report })));


export const routes: Route[] = [
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/home",
        element: <Home />
    },
    {
        path: "/area",
        element: <Area />
    },
    {
        path: "/assignment",
        element: <Assignment />
    },
    {
        path: "/inspection",
        element: <Inspection />
    },
    {
        path: "/location",
        element: <Location />
    },
    {
        path: "/maintenance",
        element: <Maintenance />
    },
    {
        path: "/request",
        element: <Request />
    },
    {
        path: "/tracking",
        element: <Tracking />
    },
    {
        path: "/user",
        element: <User />
    },
    {
        path: "/vehicle",
        element: <Vehicle />
    },
    {
        path: "/report",
        element: <Report />
    }
];