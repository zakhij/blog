import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaTwitter } from 'react-icons/fa';

//Logic for website's navigation bar present at the top of every page, linking to other pages.

function Navbar() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 500);

  useEffect(() => {
    // Check the dimensions of the window when the component mounts. 
    // If the window is small, we use abbreviated version of website name.
    const handleResize = () => setIsMobile(window.innerWidth < 500);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav className="bg-white shadow-md fixed w-full z-10 top-0">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-xl font-bold text-gray-800">
            <Link to="/">{isMobile ? 'SITH' : 'Signal in The Haystack'}</Link>
          </div>
          <div className="ml-6 flex space-x-4">
            <Link
              to="/about"
              className="text-gray-800 hover:text-gray-600 transition duration-200"
            >
              About
            </Link>
            <Link
              to="/subscribe"
              className="text-gray-800 hover:text-gray-600 transition duration-200"
            >
              Subscribe
            </Link>
            <a
              href="https://www.paypal.com/donate/?business=43DUFCTWDUF2A&amount=3&no_recurring=0&currency_code=USD"
              className="text-gray-800 hover:text-gray-600 transition duration-200 ml-4"
            >
              Donate
            </a>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <a href="https://github.com/zakhij" target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-gray-800 text-2xl transform transition-transform duration-200 hover:scale-110" />
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