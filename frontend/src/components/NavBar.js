import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';

function Navbar() {
  return (
    <nav className="bg-white shadow-md fixed w-full z-10 top-0">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-xl font-bold text-gray-800">
            <Link to="/">Signal in The Haystack</Link>
          </div>
          <div className="ml-6">
            <Link
              to="/about"
              className="text-gray-800 hover:text-gray-600 transition duration-200"
            >
              About
            </Link>
            <a
              href="https://www.paypal.com/donate/?business=43DUFCTWDUF2A&amount=3&no_recurring=0&currency_code=USD"
              className="text-gray-800 hover:text-gray-600 transition duration-200 ml-4"
            >
              Donate
            </a>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <a href="https://www.linkedin.com/in/zakaria-hijaouy-115183172/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-gray-800 text-2xl transform transition-transform duration-200 hover:scale-110" />
          </a>
          <a href="https://twitter.com/zakking_" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-gray-800 text-2xl transform transition-transform duration-200 hover:scale-110" />
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
