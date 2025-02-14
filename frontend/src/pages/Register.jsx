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
    <div>
      <div>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name: </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={(e) => {
              setFormData((prevState) => ({
                ...prevState,
                firstName: e.target.value,
              }));
            }}
            required
          />

          <label htmlFor="lastName">Last Name: </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={(e) => {
              setFormData((prevState) => ({
                ...prevState,
                lastName: e.target.value,
              }));
            }}
            required
          />

          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) => {
              setFormData((prevState) => ({
                ...prevState,
                email: e.target.value,
              }));
            }}
            required
          />

          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={(e) => {
              setFormData((prevState) => ({
                ...prevState,
                username: e.target.value,
              }));
            }}
            required
          />

          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={(e) => {
              setFormData((prevState) => ({
                ...prevState,
                password: e.target.value,
              }));
            }}
            required
          />
          <button type="submit" disabled={isRegistering}>
            {isRegistering ? "Registering..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
