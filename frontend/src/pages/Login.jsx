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
    <div>
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" disabled={isLoggingIn}>
            {isLoggingIn ? "Logging In..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
