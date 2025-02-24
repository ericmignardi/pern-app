import React from "react";

const About = () => {
  return (
    <div className="h-screen grid lg:grid-cols-2 justify-center items-center py-8 px-8">
      <img
        className=""
        src="/login.png"
        alt="Man walking out of a closet holding a coffee and a bag"
      />
      <div className="flex flex-col justify-center items-center gap-4">
        <h1 className="text-2xl text-indigo-500">About Us</h1>
        <p>
          Closet.io is an innovative website designed to revolutionize the way
          people manage their wardrobes, offering an all-in-one solution for
          organizing, curating, and planning outfits. In a world where closet
          clutter and the frustration of "I have nothing to wear" are common
          challenges, Closet.io provides a powerful tool to streamline personal
          style management. By helping users catalog the items they already own,
          Closet.io encourages mindful shopping and reduces unnecessary
          purchases, promoting a more sustainable approach to fashion.
        </p>
      </div>
    </div>
  );
};

export default About;
