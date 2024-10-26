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
const Departament = lazy(() => import("../../screen").then(module => ({ default: module.Departament })));
const Municipality = lazy(() => import("../../screen").then(module => ({ default: module.Municipality })));
const VehicleDetail = lazy(() => import("../../screen").then(module => ({ default: module.VehicleDetail })));
const VehiclePart = lazy(() => import("../../screen").then(module => ({ default: module.VehiclePart })));
const FormVehicleDetail = lazy(() => import("../../screen").then(module => ({ default: module.FormVehicleDetail })));
const FormVehiclePart = lazy(() => import("../../screen").then(module => ({ default: module.FormVehiclePart })));
const FormDepartment = lazy(() => import("../../screen").then(module => ({ default: module.FormDepartment })));
const FormMunicipality = lazy(() => import("../../screen").then(module => ({ default: module.FormMunicipality })));
const FormAssigment = lazy(() => import("../../screen").then(module => ({ default: module.FormAssigment })));
const FormBooking = lazy(() => import("../../screen").then(module => ({ default: module.FormBooking })));


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
        path: "/vehicleDetail",
        element: <VehicleDetail />
    },
    {
        path: "/formVehicleDetail",
        element: <FormVehicleDetail />
    },
    {
        path: "/vehiclePart",
        element: <VehiclePart />
    },
    {
        path: "/formVehiclePart",
        element: <FormVehiclePart />
    },
    {
        path: "/report",
        element: <Report />
    },
    {
        path: "/location/departament",
        element: <Departament />
    },
    {
        path: "/location/municipality",
        element: <Municipality />
    },
    {
        path: "/location/formDepartment",
        element: <FormDepartment />
    },
    {
        path: "/location/formMunicipality",
        element: <FormMunicipality />
    },
    {
        path: "/formAssigment",
        element: <FormAssigment />
    },
    {
        path: "/formBooking",
        element: <FormBooking />
    }
];