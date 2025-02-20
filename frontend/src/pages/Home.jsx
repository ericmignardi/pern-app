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
          className="bg-green-500 border-none rounded-lg px-2 py-2 text-white justify-self-end"
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
      <Link
        to="/create"
        className="bg-green-500 border-none rounded-lg px-2 py-2 text-white justify-self-end"
      >
        Create
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-4">
        {clothing.map((item) => (
          <ClothingCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Home;
