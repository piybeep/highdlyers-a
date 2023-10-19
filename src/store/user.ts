import { create } from "zustand";
type User = {
    id: string,
    first_name: string,
    second_name: string,
    email: string,
    isAdmin: boolean
}

interface useUserProps {
    isAuth: boolean
    user: User | null
    setIsAuth: (value: boolean) => void
    setUser: (value: User | null) => void
}

export const useUser = create<useUserProps>()(
    (set) => ({
        isAuth: false,
        user: null,
        setIsAuth: (flag: boolean) => set({ isAuth: flag }),
        setUser: (user: any) => set({ user })
    })
)