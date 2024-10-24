import { Departament} from "@/interface";
import { create } from "zustand";

interface DepartamentPropStore {
    department: Departament | null;
    setDepartament: (data: Departament | null) => void;
    clear: () => void;
    isEdit: boolean;
    setIsEdit: (data: boolean)=>void
}

export const useDepartamentStore = create<DepartamentPropStore>((set) => ({
    department: null,
    setDepartament: (data) => set({ department: data }),
    clear: () => set({ department: null }),
    isEdit: false,
    setIsEdit: (item) => set({ isEdit: item })
}));