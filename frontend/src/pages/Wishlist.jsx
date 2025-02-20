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
      <h1 className="text-2xl text-indigo-500 text-center">My Wishlist</h1>
      <Link
        to="/wishlist-create"
        className="bg-green-500 border-none rounded-lg px-2 py-2 text-white justify-self-end"
      >
        Create
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-4">
        {wishlist.map((item) => (
          <WishlistClothingCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
