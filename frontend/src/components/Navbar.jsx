import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    logout();
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  if (!authUser) {
    return (
      <header>
        <nav className="flex justify-between items-center py-4 px-8">
          <Link to="/" className="text-4xl font-bold text-indigo-500">
            Closet.io
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex justify-center items-center gap-4">
            <li className="transition-all">
              <Link
                to="/"
                className="hover:text-indigo-500 font-semibold transition-colors duration-300"
              >
                Home
              </Link>
            </li>
            <li className="transition-all">
              <Link
                to="/outfits"
                className="hover:text-indigo-500 font-semibold transition-colors duration-300"
              >
                Outfits
              </Link>
            </li>
            <li className="transition-all">
              <Link
                to="/wishlist"
                className="hover:text-indigo-500 font-semibold transition-colors duration-300"
              >
                Wishlist
              </Link>
            </li>
            <li className="transition-all">
              <Link
                to="/about"
                className="hover:text-indigo-500 font-semibold transition-colors duration-300"
              >
                About
              </Link>
            </li>
            <li className="transition-all">
              <Link
                to="/contact"
                className="hover:text-indigo-500 font-semibold transition-colors duration-300"
              >
                Contact
              </Link>
            </li>
            <li className="transition-all">
              <Link
                to="/login"
                className="block text-black hover:text-indigo-500 font-semibold py-2 px-4 rounded-lg border-solid border-2 border-indigo-500 transition-colors duration-300"
              >
                Login
              </Link>
            </li>
            <li className="transition-all">
              <Link
                to="/register"
                className="block text-white hover:text-black font-semibold py-2 px-4 bg-indigo-500 rounded-lg transition-colors duration-300"
              >
                Register
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button (Hamburger) */}
          <button className="lg:hidden" onClick={toggleMobileMenu}>
            <FaBars />
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-0 left-0 size-full bg-white py-4 px-8 z-10 flex justify-center items-center">
            {/* Close Button */}
            <button
              className="absolute top-7 right-7 text-xl text-gray-600"
              onClick={toggleMobileMenu}
            >
              <FaTimes />
            </button>

            <ul className="flex flex-col justify-center items-center gap-4">
              <li>
                <Link
                  to="/"
                  className="font-semibold hover:text-indigo-500 transition-colors duration-300"
                  onClick={closeMobileMenu}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/outfits"
                  className="font-semibold hover:text-indigo-500 transition-colors duration-300"
                  onClick={closeMobileMenu}
                >
                  Outfits
                </Link>
              </li>
              <li>
                <Link
                  to="/wishlist"
                  className="font-semibold hover:text-indigo-500 transition-colors duration-300"
                  onClick={closeMobileMenu}
                >
                  Wishlist
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="font-semibold hover:text-indigo-500 transition-colors duration-300"
                  onClick={closeMobileMenu}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="font-semibold hover:text-indigo-500 transition-colors duration-300"
                  onClick={closeMobileMenu}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="block text-black hover:text-indigo-500 font-semibold py-2 px-4 rounded-lg border-solid border-2 border-indigo-500 transition-colors duration-300"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="block text-white hover:text-black font-semibold py-2 px-4 bg-indigo-500 rounded-lg transition-colors duration-300"
                  onClick={closeMobileMenu}
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>
        )}
      </header>
    );
  }

  return (
    <header>
      <nav className="flex justify-between items-center py-4 px-8">
        <Link to="/" className="text-4xl font-bold text-indigo-500">
          Closet.io
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex justify-center items-center gap-4">
          <li className="transition-all">
            <Link
              to="/"
              className="hover:text-indigo-500 font-semibold transition-colors duration-300"
            >
              Home
            </Link>
          </li>
          <li className="transition-all">
            <Link
              to="/outfits"
              className="hover:text-indigo-500 font-semibold transition-colors duration-300"
            >
              Outfits
            </Link>
          </li>
          <li className="transition-all">
            <Link
              to="/wishlist"
              className="hover:text-indigo-500 font-semibold transition-colors duration-300"
            >
              Wishlist
            </Link>
          </li>
          <li className="transition-all">
            <Link
              to="/about"
              className="hover:text-indigo-500 font-semibold transition-colors duration-300"
            >
              About
            </Link>
          </li>
          <li className="transition-all">
            <Link
              to="/contact"
              className="hover:text-indigo-500 font-semibold transition-colors duration-300"
            >
              Contact
            </Link>
          </li>
          <li className="transition-all">
            <Link
              to="/profile"
              className="block text-white hover:text-black font-semibold py-2 px-4 bg-indigo-500 rounded-lg transition-colors duration-300"
            >
              Profile
            </Link>
          </li>
          <li className="transition-all" onClick={handleLogout}>
            <Link
              to="/"
              className="block text-black hover:text-indigo-500 font-semibold py-2 px-4 rounded-lg border-solid border-2 border-indigo-500 transition-colors duration-300"
            >
              Logout
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button (Hamburger) */}
        <button className="lg:hidden" onClick={toggleMobileMenu}>
          <FaBars />
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-0 left-0 size-full bg-white py-4 px-8 z-10 flex justify-center items-center">
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-xl text-gray-600"
            onClick={toggleMobileMenu}
          >
            <FaTimes />
          </button>

          <ul className="flex flex-col justify-center items-center gap-4">
            <li>
              <Link
                to="/"
                className="font-semibold hover:text-indigo-500 transition-colors duration-300"
                onClick={closeMobileMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/outfits"
                className="font-semibold hover:text-indigo-500 transition-colors duration-300"
                onClick={closeMobileMenu}
              >
                Outfits
              </Link>
            </li>
            <li>
              <Link
                to="/wishlist"
                className="font-semibold hover:text-indigo-500 transition-colors duration-300"
                onClick={closeMobileMenu}
              >
                Wishlist
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="font-semibold hover:text-indigo-500 transition-colors duration-300"
                onClick={closeMobileMenu}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="font-semibold hover:text-indigo-500 transition-colors duration-300"
                onClick={closeMobileMenu}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="block text-white hover:text-black font-semibold py-2 px-4 bg-indigo-500 rounded-lg transition-colors duration-300"
                onClick={closeMobileMenu}
              >
                Profile
              </Link>
            </li>
            <li onClick={handleLogout}>
              <Link
                to="/"
                className="block text-black hover:text-indigo-500 font-semibold py-2 px-4 rounded-lg border-solid border-2 border-indigo-500 transition-colors duration-300"
                onClick={closeMobileMenu}
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
