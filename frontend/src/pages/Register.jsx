import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });

  const { register, isRegistering } = useAuthStore();

  const validateForm = () => {
    if (!formData.firstName.trim())
      return toast.error("First Name Is Required");
    if (!formData.lastName.trim()) return toast.error("Last Name Is Required");
    if (!formData.email.trim()) return toast.error("Email Is Required");
    if (!formData.username.trim()) return toast.error("Username Is Required");
    if (!formData.password.trim()) return toast.error("Password Is Required");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const status = validateForm();
    if (status) {
      register(formData);
    }
  };

  return (
    <div className="grid grid-cols-1 justify-center items-center gap-4">
      <img
        src="/src/assets/images/login.png"
        alt="Man walking out of a closet holding a coffee and a bag"
        className="size-80 aspect-square my-0 mx-auto"
      />
      <h1 className="text-center font-semibold text-lg">Register</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-2"
      >
        <label htmlFor="firstName" className="hidden">
          First Name:{" "}
        </label>
        <input
          className="border-2 border-solid border-indigo-500 rounded-full py-4 px-8"
          type="text"
          id="firstName"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={(e) => {
            setFormData((prevState) => ({
              ...prevState,
              firstName: e.target.value,
            }));
          }}
          required
        />

        <label htmlFor="lastName" className="hidden">
          Last Name:{" "}
        </label>
        <input
          className="border-2 border-solid border-indigo-500 rounded-full py-4 px-8"
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={(e) => {
            setFormData((prevState) => ({
              ...prevState,
              lastName: e.target.value,
            }));
          }}
          required
        />

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

        <label htmlFor="username" className="hidden">
          Username:{" "}
        </label>
        <input
          className="border-2 border-solid border-indigo-500 rounded-full py-4 px-8"
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => {
            setFormData((prevState) => ({
              ...prevState,
              username: e.target.value,
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
          placeholder="Password"
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
          disabled={isRegistering}
        >
          {isRegistering ? "Registering..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Register;
