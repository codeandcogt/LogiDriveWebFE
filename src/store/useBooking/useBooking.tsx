import { create } from "zustand";

interface BookingPropStore {
    booking: number | null;
    setBooking: (data: number | null) => void;
    clear: () => void;
}

export const useBooking = create<BookingPropStore>((set) => ({
    booking: null,
    setBooking: (data) => set({ booking: data }),
    clear: () => set({ booking: null }),
}));