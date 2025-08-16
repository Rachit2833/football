'use client'
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react'; // install lucide-react for icons: npm i lucide-react

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo / Site Name */}
        <h1 className="text-2xl font-bold tracking-wide">
          FootBallInfo
        </h1>

        {/* Desktop Nav */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8 text-lg">
            <li><a href="/" className="hover:text-blue-400 transition-colors duration-200">Home</a></li>
            <li><a href="/" className="hover:text-blue-400 transition-colors duration-200">About</a></li>
            <li><a href="/" className="hover:text-blue-400 transition-colors duration-200">Services</a></li>
            <li><a href="/" className="hover:text-blue-400 transition-colors duration-200">Contact</a></li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-gray-800 border-t border-gray-700">
          <ul className="flex flex-col space-y-4 py-4 px-6 text-lg">
            <li><a href="/" className="hover:text-blue-400 transition-colors duration-200" onClick={() => setMenuOpen(false)}>XHome</a></li>
            <li><a href="/about" className="hover:text-blue-400 transition-colors duration-200" onClick={() => setMenuOpen(false)}>XAbout</a></li>
            <li><a href="/services" className="hover:text-blue-400 transition-colors duration-200" onClick={() => setMenuOpen(false)}>XServices</a></li>
            <li><a href="/contact" className="hover:text-blue-400 transition-colors duration-200" onClick={() => setMenuOpen(false)}>XContact</a></li>
          </ul>
        </nav>
      )}
   
    </header>
  );
};

export default Header;
