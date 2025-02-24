import React, { useEffect } from "react";
import { useWishlistStore } from "../store/useWishlistStore.js";
import { Link } from "react-router-dom";
import WishlistClothingCard from "../components/WishlistClothingCard.jsx";

const Wishlist = () => {
  const { wishlist, isWishlistLoading, read } = useWishlistStore();

  useEffect(() => {
    read();
  }, [read]);

  if (isWishlistLoading) {
    return <div>Loading...</div>;
  }

  if (wishlist.length === 0) {
    return (
      <div className="grid grid-cols-1 justify-center items-center gap-4 px-8 py-8">
        <h1 className="text-2xl text-indigo-500 text-center">My Wishlist</h1>
        <Link
          to="/wishlist-create"
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
      <h1 className="text-2xl text-indigo-500 text-center">My Wishlist</h1>
      <div className="flex justify-between items-center">
        {wishlist.length > 1 ? (
          <p>{wishlist.length} Items</p>
        ) : (
          <p>{wishlist.length} Item</p>
        )}
        <Link
          to="/wishlist-create"
          className="block text-white hover:text-black font-semibold py-2 px-4 bg-indigo-500 border-solid border-2 border-indigo-950  rounded-lg transition-colors duration-300 justify-self-end"
        >
          Create
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-4">
        {wishlist.map((item) => (
          <WishlistClothingCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
