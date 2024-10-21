import { LoginSessionData } from "@/interface";
import { create } from "zustand";
import { persist, createJSONStorage, PersistOptions } from "zustand/middleware";
import CryptoJS from 'crypto-js';
import { SECRET_KEY_STORAGE } from "@/services";

interface SessionStore {
  session: LoginSessionData | null;
  setSession: (data: LoginSessionData | null) => void;
  clearSession: () => void;
}

type SessionPersist = Pick<SessionStore, 'session'>;

const customStorage = {
  getItem: (name: string): string | null => {
    const encryptedData = sessionStorage.getItem(name);
    if (encryptedData) {
      const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY_STORAGE);
      return bytes.toString(CryptoJS.enc.Utf8);
    }
    return null;
  },
  setItem: (name: string, value: string): void => {
    const encryptedData = CryptoJS.AES.encrypt(value, SECRET_KEY_STORAGE).toString();
    sessionStorage.setItem(name, encryptedData);
  },
  removeItem: (name: string): void => {
    sessionStorage.removeItem(name);
  },
};

const persistOptions: PersistOptions<SessionStore, SessionPersist> = {
  name: 'encrypted-session-storage',
  storage: createJSONStorage(() => customStorage),
  partialize: (state) => ({ session: state.session }),
};

export const useSession = create<SessionStore>()(
  persist(
    (set) => ({
      session: null,
      setSession: (data) => set({ session: data }),
      clearSession: () => {
        set({ session: null });
        sessionStorage.removeItem('encrypted-session-storage');
      },
    }),
    persistOptions
  )
);