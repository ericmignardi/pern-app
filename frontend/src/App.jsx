import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Outfits from "./pages/Outfits";
import Wishlist from "./pages/Wishlist";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";

const App = () => {
  const { authUser, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/register" element={authUser ? <Home /> : <Register />} />
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={authUser ? <Home /> : <Login />} />
        {/* Todo: Outfits, Wishlist, About, Contact */}
        <Route path="/outfits" element={authUser ? <Outfits /> : <Login />} />
        <Route path="/wishlist" element={authUser ? <Wishlist /> : <Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={authUser ? <Profile /> : <Login />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
