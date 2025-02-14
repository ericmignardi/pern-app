import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
  const { authUser } = useAuthStore();

  if (!authUser) {
    return (
      <header>
        <nav className="flex justify-between items-center py-4 px-8">
          <Link to="/" className="text-4xl font-bold text-blue-600">
            Closet.io
          </Link>
          <ul className="hidden lg:flex justify-center items-center gap-4">
            <li className="transition-all">
              <Link to="/" className="hover:text-blue-600 font-semibold">
                Home
              </Link>
            </li>
            <li className="transition-all">
              <Link to="/outfits" className="hover:text-blue-600 font-semibold">
                Outfits
              </Link>
            </li>
            <li className="transition-all">
              <Link
                to="/wishlist"
                className="hover:text-blue-600 font-semibold"
              >
                Wishlist
              </Link>
            </li>
            <li className="transition-all">
              <Link to="/about" className="hover:text-blue-600 font-semibold">
                About
              </Link>
            </li>
            <li className="transition-all">
              <Link to="/contact" className="hover:text-blue-600 font-semibold">
                Contact
              </Link>
            </li>
            <li className="transition-all">
              <Link
                to="/login"
                className="block text-white hover:text-black font-semibold py-2 px-4 bg-blue-600 rounded-lg"
              >
                Login
              </Link>
            </li>
          </ul>
          <button>
            <FaBars className="lg:hidden" />
          </button>
        </nav>
      </header>
    );
  }

  return (
    <header>
      <nav className="flex justify-between align-middle py-4 px-8">
        <Link to="/" className="text-4xl font-bold text-blue-600">
          Closet.io
        </Link>
        <ul className="flex justify-center align-middle items-center gap-4">
          <li className="transition-all">
            <Link to="/" className="hover:text-blue-600 font-semibold">
              Home
            </Link>
          </li>
          <li className="transition-all">
            <Link to="/outfits" className="hover:text-blue-600 font-semibold">
              Outfits
            </Link>
          </li>
          <li className="transition-all">
            <Link to="/wishlist" className="hover:text-blue-600 font-semibold">
              Wishlist
            </Link>
          </li>
          <li className="transition-all">
            <Link to="/about" className="hover:text-blue-600 font-semibold">
              About
            </Link>
          </li>
          <li className="transition-all">
            <Link to="/contact" className="hover:text-blue-600 font-semibold">
              Contact
            </Link>
          </li>
          <li className="transition-all">
            <Link
              to="/profile"
              className="block text-white hover:text-black font-semibold py-2 px-4 bg-blue-600 rounded-lg"
            >
              Profile
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
