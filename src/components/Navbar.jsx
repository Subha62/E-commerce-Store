import React, { useState } from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const cart = useSelector((state) => state.cart ?? []);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <header className="bg-slate-800">
      <nav className="flex justify-between items-center h-20 max-w-6xl mx-auto px-5">

        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <img
            src="/logo.png"
            alt="Company Logo"
            className="h-14"
          />
        </NavLink>

        {/*  Correct global product search */}
        <form onSubmit={handleSearch} className="flex items-center mx-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-2 rounded-l-md border-none outline-none"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-r-md hover:bg-green-500"
          >
            Search
          </button>
        </form>

        {/* Links */}
        <div className="flex items-center font-medium text-slate-100 space-x-6">
          <NavLink to="/" className="hover:text-green-400 transition">
            Home
          </NavLink>

          <NavLink to="/cart" className="relative hover:text-green-400 transition">
            <FaShoppingCart className="text-2xl" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-green-600 text-xs w-5 h-5 flex justify-center items-center rounded-full text-white animate-bounce">
                {cart.length}
              </span>
            )}
          </NavLink>
        </div>

      </nav>
    </header>
  );
};

export default Navbar;

