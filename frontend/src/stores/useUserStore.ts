import axios from "@/lib/axios";
import { create } from "zustand";
import { toast } from "react-hot-toast"
import { User } from "@/types";

interface userStore {
    user: User | null;
    loading: boolean;
    checkingAuth: boolean;

    signup: (data: { username: string; email: string; password: string; confirmPassword: string }) => Promise<void>;
    login: (data: { email: string; password: string }) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    resetPassword: (data: { resetToken: string, password: string }) => Promise<void>;
}

export const useUserStore = create<userStore>((set) => ({
    user: null,
    loading: false,
    checkingAuth: true,

    signup: async ({ username, email, password, confirmPassword }) => {
        set({ loading: true })
        if (password !== confirmPassword) {
            set({ loading: false })
            toast.error("Passwords do not match");
            return;
        }
        try {
            await axios.post("/users/signup", { name: username, email, password })
            toast.success("Signup successful!");

        } catch (error: any) {
            console.log(error.response?.data?.message)
            toast.error(error.response?.data?.message || "An error occurred, please try again later");
        } finally {
            set({ loading: false })
        }
    },


    login: async ({ email, password }) => {
        set({ loading: true })
        try {
            const response = await axios.post("/users/login", { email, password })
            set({ user: response.data.user })
            toast.success("Login successful!")
        } catch (error: any) {
            console.log(error.response?.data?.message)
            toast.error(error.response?.data?.message || "An error occurred, please try again later");
        } finally {
            set({ loading: false })
        }
    },
    logout: async () => {
        set({ loading: true })
        try {
            await axios.post("/users/logout", {})
            set({ user: null })
            toast.success("logout Successful")
        } catch (error: any) {
            console.log(error.response?.data?.message)
            toast.error(error.response?.data?.message || "An error occurred, please try again later");
        } finally {
            set({ loading: false })
        }
    },

    checkAuth: async () => {
        set({ loading: true, checkingAuth: true })
        try {
            const response = await axios.get("/users/profile");
            set({ user: response.data.user })
        } catch (error: any) {
            set({ user: null })
        } finally {
            set({ loading: false, checkingAuth: false })
        }
    },

    forgotPassword: async (email) => {
        set({ loading: true })
        try {
            await axios.post("/users/forgot-password", { email })
            toast.success("Reset Email sent successfully")
        } catch (error: any) {
            console.log(error.response?.data?.message)
            toast.error(error.response?.data?.message || "An error occurred, please try again later");
        } finally {
            set({ loading: false })
        }
    },

    resetPassword: async ({ resetToken, password }) => {
        set({ loading: true })
        try {
            await axios.post(`/users/reset-password/${resetToken}`, {password})
            toast.success("password reset successfully")
        } catch (error: any) {
            console.log(error.response?.data?.message)
            toast.error(error.response?.data?.message || "An error occurred, please try again later");
        } finally {
            set({ loading: false })
        }
    }
}))
