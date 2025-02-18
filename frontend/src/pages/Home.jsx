import React, { useEffect } from "react";
import { useClothingStore } from "../store/useClothingStore.js";

const Home = () => {
  const { clothing, isClothingLoading, read } = useClothingStore();

  useEffect(() => {
    const fetchClothing = async () => {
      if (clothing.length === 0 && !isClothingLoading) {
        console.log("Clothing state is empty, calling read()...");
        await read();
      }
    };

    fetchClothing();
  }, [clothing, isClothingLoading, read]);

  useEffect(() => {
    console.log("Clothing array updated:", clothing);
  }, [clothing]);

  useEffect(() => {
    console.log("isClothingLoading:", isClothingLoading);
  }, [isClothingLoading]);

  if (isClothingLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div key={clothing.length}>
      <h1>Clothing Items</h1>
      {clothing.length > 0 ? (
        <ul>
          {clothing.map((item) => (
            <li key={item.id}>
              <h2>{item.name}</h2>
              <p>Brand: {item.brand}</p>
              <p>Category: {item.category}</p>
              <p>Colour: {item.colour}</p>
              <p>Size: {item.size}</p>
              <p>Material: {item.material}</p>
              <p>Image URL: {item.image_url}</p>
              <p>Created At: {item.created_at}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No clothing items available.</p>
      )}
    </div>
  );
};

export default Home;
