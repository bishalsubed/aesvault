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
    changePassword: (data: { oldPassword: string, newPassword: string }) => Promise<void>;
    refreshToken: () => Promise<{ accessToken: string, refreshToken: string } | undefined>;
}

export const useUserStore = create<userStore>((set, get) => ({
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
            await axios.post(`/users/reset-password/${resetToken}`, { password })
            toast.success("password reset successfully")
        } catch (error: any) {
            console.log(error.response?.data?.message)
            toast.error(error.response?.data?.message || "An error occurred, please try again later");
        } finally {
            set({ loading: false })
        }
    },
    changePassword: async ({ oldPassword, newPassword }) => {
        set({ loading: true })
        try {
            await axios.post(`/users/change-password`, { oldPassword, newPassword })
            toast.success("password changed successfully")
        } catch (error: any) {
            console.log(error.response?.data?.message)
            toast.error(error.response?.data?.message || "An error occurred, please try again later");
        } finally {
            set({ loading: false })
        }
    },


    refreshToken: async (): Promise<{ accessToken: string, refreshToken: string } | undefined> => {

        if (get().checkingAuth) return;

        set({ checkingAuth: true })
        set({ loading: true })
        try {
            const response = await axios.post("/users/refresh-token")
            set({ checkingAuth: false })
            return response.data
        } catch (error: any) {
            console.log(error.response?.data?.message)
            toast.error(error.response?.data?.message || "An error occurred, please try again later");
        } finally {
            set({ loading: false })
        }
    }
}))


let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};


axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                }).then((token) => {
                    originalRequest.headers["Authorization"] = `Bearer ${token}`;
                    return axios(originalRequest);
                })
                    .catch((err) => Promise.reject(err));
            }
            originalRequest._retry = true;
            isRefreshing = true;
            try {
                const data = await useUserStore.getState().refreshToken();
                const newAccessToken = data?.accessToken;
                processQueue(null, newAccessToken);
                originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                return axios(originalRequest);
            } catch (error) {
                processQueue(error, null);
                useUserStore.getState().logout();
                return Promise.reject(error);
            } finally {
                isRefreshing = false;
            }
        }
        return Promise.reject(error);
    }
)
