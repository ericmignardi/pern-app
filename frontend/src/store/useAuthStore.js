import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isRegistering: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/verify");
      set({ authUser: response.data });
    } catch (error) {
      console.log("Error in checkAuth: ", error.message);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  register: async (formData) => {
    set({ isRegistering: true });
    try {
      const response = await axiosInstance.post("/auth/register", formData);
      set({ authUser: response.data.data });
      toast.success("Registration Successful");
    } catch (error) {
      console.log("Error in register: ", error.message);
      toast.error(error.response.data.message);
    } finally {
      set({ isRegistering: false });
    }
  },
  login: async (formData) => {
    set({ isLoggingIn: true });
    try {
      const response = await axiosInstance.post("/auth/login", formData);
      set({ authUser: response.data.data });
      toast.success("Login Successful");
    } catch (error) {
      console.log("Error in login: ", error.message);
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged Out Successfully");
    } catch (error) {
      console.log("Error in logout: ", error.message);
      toast.error(error.response.data.message);
    }
  },
  updateProfile: async (formData) => {
    set({ isUpdatingProfile: true });
    try {
      const response = await axiosInstance.put("/auth/update", formData);
      set({ authUser: response.data.data });
      toast.success("Updated Profile Successfully");
    } catch (error) {
      console.log("Error in updateProfile: ", error.message);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
