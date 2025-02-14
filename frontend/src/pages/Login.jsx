import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email Is Required");
    if (!formData.password.trim()) return toast.error("Password Is Required");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const status = validateForm();
    if (status) {
      login(formData);
    }
  };

  return (
    <div className="grid grid-cols-1 justify-center items-center gap-4">
      <img
        className="size-80 aspect-square my-0 mx-auto"
        src="src/assets/images/login.png"
        alt="Man walking out of a closet holding a coffee and a bag"
      />
      <h1 className="text-center font-semibold text-lg">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-2"
      >
        <label htmlFor="email" className="hidden">
          Email:{" "}
        </label>
        <input
          className="border-2 border-solid border-indigo-500 rounded-full py-4 px-8"
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => {
            setFormData((prevState) => ({
              ...prevState,
              email: e.target.value,
            }));
          }}
          required
        />

        <label htmlFor="password" className="hidden">
          Password:{" "}
        </label>
        <input
          className="border-2 border-solid border-indigo-500 rounded-full py-4 px-8"
          type="password"
          id="password"
          name="password"
          placeholder="password"
          value={formData.password}
          onChange={(e) => {
            setFormData((prevState) => ({
              ...prevState,
              password: e.target.value,
            }));
          }}
          required
        />
        <button
          className="block text-white hover:text-black font-semibold py-2 px-4 bg-indigo-500 rounded-lg transition-colors duration-300"
          type="submit"
          disabled={isLoggingIn}
        >
          {isLoggingIn ? "Logging In..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Login;
