/* eslint-disable react-refresh/only-export-components */
import { Route } from "@/lib";
import { lazy } from "react";
import { ValidateGuard } from "../guards";
import { Rol } from "@/types";

const Home = lazy(() => import("../../screen").then(module => ({ default: module.Home })));
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
const FormArea = lazy(() => import("../../screen").then(module => ({ default: module.AreaForm })));


export const routes: Route[] = [
    {
        path: "/home",
        element:(
            <ValidateGuard  permission={[Rol.ADMIN, Rol.ADMINLOGISTICA, Rol.COLABORADOR, Rol.GARITA, Rol.RRHH, Rol.SUPERADMIN]}>
                <Home />
            </ValidateGuard>
        ) 
    },
    {
        path: "/area",
        element:(
            <ValidateGuard permission={[Rol.SUPERADMIN]}>
                <Area />
            </ValidateGuard>
        ) 
    },
    {
        path: "/areaForm",
        element: <FormArea />
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