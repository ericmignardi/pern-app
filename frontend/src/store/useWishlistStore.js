import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";

export const useWishlistStore = create((set, get) => ({
  wishlist: [],
  isWishListLoading: false,
  read: async () => {
    set({ isWishListLoading: true });
    try {
      const response = await axiosInstance.get("/wishlist/");
      set({ wishlist: response.data.data });
      toast.success("Successfully Loaded Wishlist Items");
    } catch (error) {
      console.log("Error in read: ", error.message);
      toast.error("Unable To Read Wishlist Items");
    } finally {
      set({ isWishListLoading: false });
    }
  },
  readById: async (id) => {
    set({ isWishListLoading: true });
    try {
      const response = await axiosInstance.get(`/wishlist/${id}`);
      set((state) => ({
        wishlist: [...state.wishlist, response.data.data],
      }));
      toast.success("Successfully Loaded Wishlist Items");
    } catch (error) {
      console.log("Error in readById: ", error.message);
      toast.error("Unable To Read Wishlist Item");
    } finally {
      set({ isWishListLoading: false });
    }
  },
  create: async (formData) => {
    set({ isWishListLoading: true });
    try {
      const response = await axiosInstance.post("/wishlist/", formData);
      set({ wishlist: [...get().wishlist, response.data.data] });
      toast.success("Successfully Created Wishlist Item");
    } catch (error) {
      console.log("Error in create: ", error.message);
      toast.error("Unable To Create Wishlist Item");
    } finally {
      set({ isWishListLoading: false });
    }
  },
  update: async (id, formData) => {
    set({ isWishListLoading: true });
    try {
      const response = await axiosInstance.put(`/wishlist/${id}`, formData);
      set((state) => ({
        wishlist: state.wishlist.map((item) =>
          item.id === id ? response.data.data : item
        ),
      }));
      toast.success("Successfully Updated Wishlist Item");
    } catch (error) {
      console.log("Error in update: ", error.message);
      toast.error("Unable To Update Wishlist Item");
    } finally {
      set({ isWishListLoading: false });
    }
  },
  deleteById: async (id) => {
    set({ isWishListLoading: true });
    try {
      const response = await axiosInstance.delete(`/wishlist/${id}`);
      set((state) => ({
        wishlist: state.wishlist.filter((item) => item.id !== id),
      }));
      toast.success("Successfully Deleted Wishlist Item");
    } catch (error) {
      console.log("Error in delete: ", error.message);
      toast.error("Unable To Delete Wishlist Item");
    } finally {
      set({ isWishListLoading: false });
    }
  },
}));
