import React, { useState } from 'react';
import { Search, ShoppingCart, Package, User, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleAccountClick = () => {
    navigate('/login');
    setIsMenuOpen(false); // Close mobile menu if open
  };

  return (
    <>
      <header className="bg-black text-white">
        <div className="container mx-auto px-4">
          {/* Top Header */}
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-2">
              <Link to="/" className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-orange-500">Gadget</span>
                <span className="text-2xl font-bold">Hunt</span>
              </Link>
            </div>
            
            {/* Search Bar - Hidden on mobile, shown on tablet and up */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full px-4 py-2 rounded-full bg-white text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <Search className="absolute right-4 top-2.5 text-gray-400" size={20} />
              </div>
            </div>
            
            {/* Right Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-2 cursor-pointer">
                <Package size={24} />
                <div className="hidden sm:block">
                  <div className="text-sm">Offers</div>
                  <div className="text-xs text-gray-300">Latest Offers</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 cursor-pointer">
                <ShoppingCart size={24} />
                <div className="hidden sm:block">
                  <div className="text-sm">Cart(0)</div>
                  <div className="text-xs text-gray-300">Add items</div>
                </div>
              </div>
              
              <div 
                className="flex items-center space-x-2 cursor-pointer"
                onClick={handleAccountClick}
              >
                <User size={24} />
                <div className="hidden sm:block">
                  <div className="text-sm">Account</div>
                  <div className="text-xs text-gray-300">Register or Login</div>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Search - Only visible on mobile */}
          <div className="md:hidden mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full px-4 py-2 rounded-full bg-white text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <Search className="absolute right-4 top-2.5 text-gray-400" size={20} />
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} py-4 space-y-4`}>
            <div className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-800">
              <Package size={24} />
              <span>Offers</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-800">
              <ShoppingCart size={24} />
              <span>Cart (0)</span>
            </div>
            <div 
              className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-800 cursor-pointer"
              onClick={handleAccountClick}
            >
              <User size={24} />
              <span>Account</span>
            </div>
          </div>
        </div>
      </header>
      
      {/* Navigation Menu - Fixed with white background and shadow */}
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto">
          <div className="overflow-x-auto">
            <ul className="flex justify-center space-x-8 min-w-max px-4 py-3">
              <li className="text-gray-700 hover:text-orange-500 cursor-pointer whitespace-nowrap">Phones & Tablets</li>
              <li className="text-gray-700 hover:text-orange-500 cursor-pointer whitespace-nowrap">Laptop & Desktop</li>
              <li className="text-gray-700 hover:text-orange-500 cursor-pointer whitespace-nowrap">Sound Equipment</li>
              <li className="text-gray-700 hover:text-orange-500 cursor-pointer whitespace-nowrap">Power & Accessories</li>
              <li className="text-gray-700 hover:text-orange-500 cursor-pointer whitespace-nowrap">Fitness & Wearable</li>
              <li className="text-gray-700 hover:text-orange-500 cursor-pointer whitespace-nowrap">Cover & Glass</li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;