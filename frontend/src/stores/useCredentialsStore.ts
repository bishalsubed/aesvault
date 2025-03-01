import { create} from "zustand";
import axios from "@/lib/axios";
import toast from "react-hot-toast";

const useCredentialStore = create((set)=> ({
    credentials: [],
    loading:false,
    

}))