import React, { useEffect } from "react";
import { useClothingStore } from "../store/useClothingStore.js";

const Home = () => {
  const { clothing, isClothingLoading, read } = useClothingStore();

  useEffect(() => {
    read();
  }, [read]);

  if (isClothingLoading) return <div>Loading...</div>;

  return (
    <div>
      {clothing.map((item) => {
        return (
          <div key={item.id} className="flex flex-col">
            <h1>{item.name}</h1>
            <h2>{item.brand}</h2>
            <h3>{item.category}</h3>
            <h4>{item.colour}</h4>
            <h5>{item.size}</h5>
            <p>{item.material}</p>
            <img src={item.image_url} alt={item.name} />
          </div>
        );
      })}
    </div>
  );
};

export default Home;
