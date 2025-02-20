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
import Create from "./pages/Create";
import WishlistCreate from "./pages/WishlistCreate";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );

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
        <Route path="/create" element={authUser ? <Create /> : <Login />} />
        {/* <Route path="/outfits" element={authUser ? <Outfits /> : <Login />} /> */}
        <Route path="/wishlist" element={authUser ? <Wishlist /> : <Login />} />
        <Route
          path="/wishlist-create"
          element={authUser ? <WishlistCreate /> : <Login />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={authUser ? <Profile /> : <Login />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
