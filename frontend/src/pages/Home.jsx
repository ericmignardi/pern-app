import React, { useEffect } from "react";
import { useClothingStore } from "../store/useClothingStore.js";
import ClothingCard from "../components/ClothingCard.jsx";
import { Link } from "react-router-dom";

const Home = () => {
  const { clothing, isClothingLoading, read } = useClothingStore();

  useEffect(() => {
    read();
  }, [read]);

  if (isClothingLoading) {
    return <div>Loading...</div>;
  }

  if (clothing.length === 0) {
    return (
      <div className="grid grid-cols-1 justify-center items-center gap-4 px-8 py-8">
        <h1 className="text-2xl text-indigo-500 text-center">My Closet</h1>
        <Link
          to="/create"
          className="block text-white hover:text-black font-semibold py-2 px-4 bg-indigo-500 border-solid border-2 border-indigo-950  rounded-lg transition-colors duration-300 justify-self-end"
        >
          Create
        </Link>
        <div>No items available...</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 justify-center items-center gap-4 px-8 py-8">
      <h1 className="text-2xl text-indigo-500 text-center">My Closet</h1>
      <div className="flex justify-between items-center">
        {clothing.length > 1 ? (
          <p>{clothing.length} Items</p>
        ) : (
          <p>{clothing.length} Item</p>
        )}
        <Link
          to="/create"
          className="block text-white hover:text-black font-semibold py-2 px-4 bg-indigo-500 border-solid border-2 border-indigo-950  rounded-lg transition-colors duration-300 justify-self-end"
        >
          Create
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-4">
        {clothing.map((item) => (
          <ClothingCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Home;
