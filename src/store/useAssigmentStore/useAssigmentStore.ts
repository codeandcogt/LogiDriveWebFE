import { AssigmentInterface} from "@/interface";
import { create } from "zustand";

interface AssigmentProps {
    assigment: AssigmentInterface | null;
    setAssigment: (data: AssigmentInterface | null) => void;
    clear: () => void;
    isEdit: boolean;
    setIsEdit: (data: boolean)=>void
}

export const useAssigmentStore = create<AssigmentProps>((set) => ({
    assigment: null,
    setAssigment: (data) => set({ assigment: data }),
    clear: () => set({ assigment: null }),
    isEdit: false,
    setIsEdit: (item) => set({ isEdit: item })
}));