import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWishlistStore } from "../store/useWishlistStore.js";

const WishlistCreate = () => {
  const { create } = useWishlistStore();
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    colour: "",
    price: "",
    size: "",
    material: "",
    image_url: "",
    link: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await create(formData);
    setFormData({
      name: "",
      brand: "",
      category: "",
      colour: "",
      price: "",
      size: "",
      material: "",
      image_url: "",
      link: "",
    });
    navigate("/wishlist");
  };

  return (
    <div className="grid grid-cols-1 justify-center items-center gap-4 px-8 py-8">
      <h1 className="text-2xl text-indigo-500 text-center">Create</h1>
      <form
        className="flex flex-col justify-center items-center gap-2"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          className="border-2 border-solid border-indigo-500 rounded-full py-4 px-8"
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          className="border-2 border-solid border-indigo-500 rounded-full py-4 px-8"
          type="text"
          placeholder="Brand"
          value={formData.brand}
          onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
        />
        <input
          className="border-2 border-solid border-indigo-500 rounded-full py-4 px-8"
          type="text"
          placeholder="Category"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
        />
        <input
          className="border-2 border-solid border-indigo-500 rounded-full py-4 px-8"
          type="text"
          placeholder="Colour"
          value={formData.colour}
          onChange={(e) => setFormData({ ...formData, colour: e.target.value })}
        />
        <input
          className="border-2 border-solid border-indigo-500 rounded-full py-4 px-8"
          type="text"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />
        <input
          className="border-2 border-solid border-indigo-500 rounded-full py-4 px-8"
          type="text"
          placeholder="Size"
          value={formData.size}
          onChange={(e) => setFormData({ ...formData, size: e.target.value })}
        />
        <input
          className="border-2 border-solid border-indigo-500 rounded-full py-4 px-8"
          type="text"
          placeholder="Material"
          value={formData.material}
          onChange={(e) =>
            setFormData({ ...formData, material: e.target.value })
          }
        />
        <input
          className="border-2 border-solid border-indigo-500 rounded-full py-4 px-8"
          type="text"
          placeholder="Image URL"
          value={formData.image_url}
          onChange={(e) =>
            setFormData({ ...formData, image_url: e.target.value })
          }
        />
        <input
          className="border-2 border-solid border-indigo-500 rounded-full py-4 px-8"
          type="text"
          placeholder="Link"
          value={formData.link}
          onChange={(e) => setFormData({ ...formData, link: e.target.value })}
        />
        <button
          className="block text-white hover:text-black font-semibold py-2 px-4 bg-indigo-500 rounded-lg transition-colors duration-300"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default WishlistCreate;
