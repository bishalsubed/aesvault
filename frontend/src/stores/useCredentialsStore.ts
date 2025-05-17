import { create } from "zustand";
import axios from "@/lib/axios";
import toast from "react-hot-toast";
import { Credential } from "@/types";

interface updateData {
    account: string,
    password: string;
    websiteUrl: string;
}

interface credentialStore {
    credentials: Credential[];
    credential: Credential;
    loading: boolean;
    setCredential: (credentials: Credential[]) => void;

    createCredential: (data: { account: string, password: string, websiteUrl: string }) => Promise<void>;
    getAllCredentials: () => Promise<void>;
    getCredentialById: (credentialId: string) => Promise<void>;
    updateCredential: (credentialId: string, updateData: updateData) => Promise<void>;
    deleteCredential: (credentialId: string) => Promise<void>;
    getCredentialByWebsiteUrl: (websiteUrl: string) => Promise<void>;
}

export const useCredentialStore = create<credentialStore>((set) => ({
    credentials: [],
    credential: {
        _id: "",
        account: "",
        password: "",
        websiteUrl: "",
        owner: "",
        createdAt: "",
        updatedAt: "",
    },
    loading: false,

    setCredential: (credentials) => set({ credentials }),


    getAllCredentials: async () => {
        set({ loading: true })
        try {
            const response = await axios.get("/credentials/getCredentials")
            set({ credentials: response.data.credentials })
        } catch (error: any) {
            console.log("Error while getting credential", error);
            toast.error(error.response?.data?.message || "An error occurred, please try again later");
        } finally {
            set({ loading: false })
        }
    },

    createCredential: async ({ account, password, websiteUrl }) => {
        set({ loading: true });
        try {
            const response = await axios.post("/credentials/create", { account, password, websiteUrl })
            set((prevProduct) => ({ credentials: [...prevProduct.credentials, response.data.credential] }))
            toast.success("Credential created successfully!");
        } catch (error: any) {
            console.log("Error while creating credential", error);
            toast.error(error.response?.data?.message || "An error occurred, please try again later");
        } finally {
            set({ loading: false })
        }
    },

    getCredentialById: async (credentialId) => {
        set({ loading: true })
        try {
            const response = await axios.get(`credentials/getCredential/${credentialId}`);
            set({ credential: response.data.credential })
        } catch (error: any) {
            console.log("Error while getting credential via id", error);
            toast.error(error.response?.data?.message || "An error occurred, please try again later");
        } finally {
            set({ loading: false })
        }
    },

    updateCredential: async (credentialId, updateData) => {
        set({ loading: true })
        try {
            await axios.put(`credentials/updateCredentials/${credentialId}`, updateData);
            toast.success("Credential Updated Successfully")
        } catch (error: any) {
            console.log("Error while getting credential via id", error);
            toast.error(error.response?.data?.message || "An error occurred, please try again later");
        } finally {
            set({ loading: false })
        }
    },

    deleteCredential: async (credentialId) => {
        set({ loading: true })
        try {
            await axios.delete(`credentials/deleteCredentials/${credentialId}`);
            set((prevData) => ({
                credentials: prevData.credentials.filter((credential) => {
                    return credential._id !== credentialId
                })
            }))
            toast.success("Credential deleted successfully!");
        } catch (error: any) {
            console.log("Error while getting credential via id", error);
            toast.error(error.response?.data?.message || "An error occurred, please try again later");
        } finally {
            set({ loading: false })
        }
    },

    getCredentialByWebsiteUrl: async (websiteUrl) => {
        set({ loading: true })
        try {
            const response = await axios.get(`/credentials/searchCredential?search=${websiteUrl}`);
            set({ credentials: response.data.credentials })
        } catch (error: any) {
            console.log("Error while getting credential via query", error);
            toast.error(error.response?.data?.message || "An error occurred, please try again later");
        } finally {
            set({ loading: false })
        }
    }

}))