import { VehiclePart } from "@/interface";
import { create } from "zustand";

interface VehiclePartStore {
    vehiclePart: VehiclePart | null;
    setVehiclePartStore: (data: VehiclePart | null) => void;
    clear: () => void;
    isEdit: boolean;
    setIsEdit: (data: boolean)=>void
}

export const useVehiclePartStore = create<VehiclePartStore>((set) => ({
    vehiclePart: null,
    setVehiclePartStore: (data) => set({ vehiclePart: data }),
    clear: () => set({ vehiclePart: null }),
    isEdit: false,
    setIsEdit: (item) => set({ isEdit: item })
}));