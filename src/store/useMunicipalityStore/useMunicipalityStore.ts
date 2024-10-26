import { Municipality } from "@/interface";
import { create } from "zustand";

interface MunicipalityPropStore {
    municipality: Municipality | null;
    setMunicipality: (data: Municipality | null) => void;
    clear: () => void;
    isEdit: boolean;
    setIsEdit: (data: boolean) => void;
}

export const useMunicipalityStore = create<MunicipalityPropStore>((set) => ({
    municipality: null,
    setMunicipality: (data) => set({ municipality: data }),
    clear: () => set({ municipality: null }),
    isEdit: false,
    setIsEdit: (item) => set({ isEdit: item })
}));