import { InspectionInterface} from "@/interface";
import { create } from "zustand";

interface InspectionProps {
    inspection: InspectionInterface | null;
    setInspection: (data: InspectionInterface | null) => void;
    clear: () => void;
    isEdit: boolean;
    setIsEdit: (data: boolean)=>void
}

export const useInspectionStore = create<InspectionProps>((set) => ({
    inspection: null,
    setInspection: (data) => set({ inspection: data }),
    clear: () => set({ inspection: null }),
    isEdit: false,
    setIsEdit: (item) => set({ isEdit: item })
}));