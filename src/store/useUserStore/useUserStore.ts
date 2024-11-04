import { UserInterface } from "@/interface";
import { create } from "zustand";

interface UserStoreProps {
    user: UserInterface | null;
    setUser: (data: UserInterface | null) => void;
    clear: () => void;
    isEdit: boolean;
    setIsEdit: (data: boolean)=>void
}

export const useUserStore = create<UserStoreProps>((set) => ({
    user: null,
    setUser: (data) => set({ user: data }),
    clear: () => set({ user: null }),
    isEdit: false,
    setIsEdit: (item) => set({ isEdit: item })
}));