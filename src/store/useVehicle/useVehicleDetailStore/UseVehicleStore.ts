import { VehicleDetail } from "@/interface";
import { create } from "zustand";

interface VehicleDetailStore {
    vehicleDetail: VehicleDetail | null;
    setVehicleDetailStore: (data: VehicleDetail | null) => void;
    clear: () => void;
    isEdit: boolean;
    setIsEdit: (data: boolean)=>void
}

export const useVehicleDetailStore = create<VehicleDetailStore>((set) => ({
    vehicleDetail: null,
    setVehicleDetailStore: (data) => set({ vehicleDetail: data }),
    clear: () => set({ vehicleDetail: null }),
    isEdit: false,
    setIsEdit: (item) => set({ isEdit: item })
}));