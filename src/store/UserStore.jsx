import { create } from "zustand";
import { persist } from "zustand/middleware";
import { allUsers, getUsersById } from "../services/UserAPI";

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: async (admin) => {
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

export const useAllUsersStore = create(
  persist(
    (set) => ({
      users: [],
      fetchAllUsers: async () => {
        const data = await allUsers();
        console.log(data);
        set({ users: data });
      },
    }),
    {
      name: "all-user",
    }
  )
);
