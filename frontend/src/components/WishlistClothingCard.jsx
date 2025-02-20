import React, { useState } from "react";
import { useWishlistStore } from "../store/useWishlistStore.js";

const WishlistClothingCard = ({ item }) => {
  const { deleteById, update } = useWishlistStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ ...item });

  const deleteClothing = () => {
    deleteById(item.id);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    update(item.id, formData);
    closeModal();
  };

  return (
    <div className="grid grid-cols-1 justify-center items-center rounded-lg bg-indigo-200 py-4 px-4 gap-4">
      <h2 className="text-center text-indigo-950 font-bold">
        <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          {item.brand}
        </span>{" "}
        {item.name}
      </h2>
      <div className="grid grid-cols-2 justify-center items-center">
        <ul>
          <li>
            <span className="text-indigo-950 font-bold">Category: </span>
            {item.category}
          </li>
          <li>
            <span className="text-indigo-950 font-bold">Colour: </span>
            {item.colour}
          </li>
          <li>
            <span className="text-indigo-950 font-bold">Price: </span>
            {item.price}
          </li>
          <li>
            <span className="text-indigo-950 font-bold">Size: </span>
            {item.size}
          </li>
          <li>
            <span className="text-indigo-950 font-bold">Material: </span>
            {item.material}
          </li>
          {/* <li>
            <span className="text-indigo-950 font-bold">Image URL: </span>
            {item.image_url}
          </li> */}
          {/* <li>
            <span className="text-indigo-950 font-bold">Link: </span>
            {item.link}
          </li> */}
          <li>
            <span className="text-indigo-950 font-bold">Created At: </span>
            {new Date(item.created_at).toLocaleDateString()}
          </li>
        </ul>
        <img
          className="w-24 aspect-square mx-auto mb-4 rounded-lg"
          src={item.image_url}
          alt={item.name}
        />
      </div>
      <div className="grid grid-cols-2 justify-center items-center gap-2">
        <button
          onClick={openModal}
          className="bg-indigo-500 border-none rounded-lg px-2 py-2 text-white"
        >
          Update
        </button>
        <button
          onClick={deleteClothing}
          className="bg-indigo-950 border-none rounded-lg px-2 py-2 text-white"
        >
          Delete
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-1/2">
            <h3 className="text-xl mb-4 text-indigo-500 text-center">Update</h3>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-indigo-500">Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="border rounded-lg w-full p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-indigo-500">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border rounded-lg w-full p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-indigo-500">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="border rounded-lg w-full p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-indigo-500">Colour</label>
                <input
                  type="text"
                  name="colour"
                  value={formData.colour}
                  onChange={handleChange}
                  className="border rounded-lg w-full p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-indigo-500">Price</label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="border rounded-lg w-full p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-indigo-500">Size</label>
                <input
                  type="text"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  className="border rounded-lg w-full p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-indigo-500">Material</label>
                <input
                  type="text"
                  name="material"
                  value={formData.material}
                  onChange={handleChange}
                  className="border rounded-lg w-full p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-indigo-500">Image URL</label>
                <input
                  type="text"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleChange}
                  className="border rounded-lg w-full p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-indigo-500">Link</label>
                <input
                  type="text"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  className="border rounded-lg w-full p-2"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 border-none rounded-lg px-2 py-2 text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-500 border-none rounded-lg px-2 py-2 text-white"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistClothingCard;
