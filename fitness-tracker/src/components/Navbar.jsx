import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold">FitTrack</h1>

        {/* Hamburger Menu Icon for Mobile */}
        <button
          className="text-white md:hidden block focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>

        {/* Links for Desktop */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:underline">
            Logout
          </Link>
          <Link to="/home" className="hover:underline">
            Home
          </Link>
          <Link to="/dashboard" className="hover:underline">
            Dashboard
          </Link>
          <Link to="/workouts" className="hover:underline">
            Workouts
          </Link>
          <Link to="/log" className="hover:underline">
            Activity Log
          </Link>
          <Link to="/profile" className="hover:underline">
            Profile
          </Link>
        </div>
      </div>

      {/* Links for Mobile */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <Link
            to="/"
            className="block text-center hover:bg-gray-800 p-2 rounded"
            onClick={toggleMenu}
          >
            Logout
          </Link>
          <Link
            to="/home"
            className="block text-center hover:bg-gray-800 p-2 rounded"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className="block text-center hover:bg-gray-800 p-2 rounded"
            onClick={toggleMenu}
          >
            Dashboard
          </Link>
          <Link
            to="/workouts"
            className="block text-center hover:bg-gray-800 p-2 rounded"
            onClick={toggleMenu}
          >
            Workouts
          </Link>
          <Link
            to="/log"
            className="block text-center hover:bg-gray-800 p-2 rounded"
            onClick={toggleMenu}
          >
            Activity Log
          </Link>
          <Link
            to="/profile"
            className="block text-center hover:bg-gray-800 p-2 rounded"
            onClick={toggleMenu}
          >
            Profile
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
