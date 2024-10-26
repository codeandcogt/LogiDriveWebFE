import { Area} from "@/interface";
import { create } from "zustand";

interface AreaPropStore {
    area: Area | null;
    setArea: (data: Area | null) => void;
    clear: () => void;
    isEdit: boolean;
    setIsEdit: (data: boolean)=>void
}

export const useAreaStore = create<AreaPropStore>((set) => ({
    area: null,
    setArea: (data) => set({ area: data }),
    clear: () => set({ area: null }),
    isEdit: false,
    setIsEdit: (item) => set({ isEdit: item })
}));