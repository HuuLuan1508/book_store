import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getUsersById } from "../services/UserAPI";

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: async (admin) => {
        console.log("Updating user:", admin);
        set({ user: admin });
      },
      fetchUser: async (id) => {
        const data = await getUsersById(id);
        set({ user: data });
      },
    }),
    {
      name: "user",
    }
  )
);
