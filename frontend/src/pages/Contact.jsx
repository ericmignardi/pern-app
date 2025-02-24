import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullFormData = {
      ...formData,
      access_key: import.meta.env.VITE_ACCESS_KEY,
    };

    try {
      await axios.post("https://api.web3forms.com/submit", fullFormData);
      toast.success("Email Sent Successfully");
    } catch (error) {
      console.error(error);
      toast.error("There was an error sending the email");
    }
  };

  return (
    <div className="h-screen grid lg:grid-cols-2 justify-center items-center py-8 px-8">
      <img
        className=""
        src="/login.png"
        alt="Man walking out of a closet holding a coffee and a bag"
      />
      <div className="flex flex-col justify-center items-center gap-4">
        <h1 className="text-2xl text-indigo-500">Contact Us</h1>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 justify-center items-center gap-4"
        >
          <label htmlFor="name" hidden>
            Full Name:{" "}
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Full Name"
            id="name"
            name="name"
            className="border-2 border-solid border-indigo-500 rounded-full py-4 px-8"
          />
          <label htmlFor="email" hidden>
            Email:{" "}
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="Email"
            id="email"
            name="email"
            className="border-2 border-solid border-indigo-500 rounded-full py-4 px-8"
          />
          <label htmlFor="message" hidden>
            Message:{" "}
          </label>
          <textarea
            name="message"
            id="message"
            placeholder="Message"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            className="border-2 border-solid border-indigo-500 rounded-full py-4 px-8 resize-none"
          ></textarea>
          <button
            type="submit"
            className="block text-white hover:text-black font-semibold py-2 px-4 bg-indigo-500 rounded-lg transition-colors duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
