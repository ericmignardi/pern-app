import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";

export const useClothingStore = create((set, get) => ({
  clothing: [],
  isClothingLoading: false,
  read: async () => {
    set({ isClothingLoading: true });
    try {
      const response = await axiosInstance.get("/clothing/");
      set({ clothing: response.data.data });
      toast.success("Successfully Loaded Clothing Items");
    } catch (error) {
      console.log("Error in read: ", error.message);
      toast.error("Unable To Read Clothing Items");
    } finally {
      set({ isClothingLoading: false });
    }
  },
  readById: async (id) => {
    set({ isClothingLoading: true });
    try {
      const response = await axiosInstance.get(`/clothing/${id}`);
      set((state) => ({
        clothing: [...state.clothing, response.data.data],
      }));
      toast.success("Successfully Loaded Clothing Item");
    } catch (error) {
      console.log("Error in readById: ", error.message);
      toast.error("Unable To Read Clothing Item");
    } finally {
      set({ isClothingLoading: false });
    }
  },
  create: async (formData) => {
    set({ isClothingLoading: true });
    try {
      const response = await axiosInstance.post("/clothing/", formData);
      set({ clothing: [...get().clothing, response.data.data] });
      toast.success("Successfully Created Clothing Item");
    } catch (error) {
      console.log("Error in create: ", error.message);
      toast.error("Unable To Create Clothing Item");
    } finally {
      set({ isClothingLoading: false });
    }
  },
  update: async (id, formData) => {
    set({ isClothingLoading: true });
    try {
      const response = await axiosInstance.put(`/clothing/${id}`, formData);
      set((state) => ({
        clothing: state.clothing.map((item) =>
          item.id === id ? response.data.data : item
        ),
      }));
      toast.success("Successfully Updated Clothing Item");
    } catch (error) {
      console.log("Error in update: ", error.message);
      toast.error("Unable To Update Clothing Item");
    } finally {
      set({ isClothingLoading: false });
    }
  },
  deleteById: async (id) => {
    set({ isClothingLoading: true });
    try {
      await axiosInstance.delete(`/clothing/${id}`);
      set((state) => ({
        clothing: state.clothing.filter((item) => item.id !== id),
      }));
      toast.success("Successfully Deleted Clothing Item");
    } catch (error) {
      console.log("Error in delete: ", error.message);
      toast.error("Unable To Delete Clothing Item");
    } finally {
      set({ isClothingLoading: false });
    }
  },
}));
