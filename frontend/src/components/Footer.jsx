import React from 'react';
import { Mail, MapPin, Phone, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-8 md:pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Newsletter */}
        <div className="mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4">
            <Mail size={32} className="text-orange-500 mb-2 md:mb-0" />
            <div>
              <h3 className="text-xl md:text-2xl font-bold">Subscribe To Our Newsletter</h3>
              <p className="text-gray-400">Get all the latest information on Events, Sales and Offers.</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row max-w-2xl gap-2">
            <input
              type="email"
              placeholder="Email Address"
              className="flex-1 px-4 py-3 rounded sm:rounded-l bg-white text-black"
            />
            <button className="bg-orange-500 px-6 py-3 cursor-pointer rounded sm:rounded-r hover:bg-orange-600">
              Subscribe
            </button>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 md:mb-12">
          <div>
            <h4 className="text-lg font-bold mb-4">ABOUT US</h4>
            <ul className="space-y-2">
              <li className="hover:text-orange-500 cursor-pointer">Regarding Us</li>
              <li className="hover:text-orange-500 cursor-pointer">Terms and Conditions</li>
              <li className="hover:text-orange-500 cursor-pointer">Track My Order</li>
              <li className="hover:text-orange-500 cursor-pointer">Career</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">POLICY</h4>
            <ul className="space-y-2">
              <li className="hover:text-orange-500 cursor-pointer">Delivery Policy</li>
              <li className="hover:text-orange-500 cursor-pointer">Return Policy</li>
              <li className="hover:text-orange-500 cursor-pointer">Warranty Policy</li>
              <li className="hover:text-orange-500 cursor-pointer">Privacy Policy</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">HELP</h4>
            <ul className="space-y-2">
              <li className="hover:text-orange-500 cursor-pointer">Contact Us</li>
              <li className="hover:text-orange-500 cursor-pointer">Exchange</li>
              <li className="hover:text-orange-500 cursor-pointer">FAQ</li>
              <li className="hover:text-orange-500 cursor-pointer">Blog</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">CONTACT</h4>
            <ul className="space-y-4">
              <li className="flex items-center space-x-2">
                <MapPin size={20} className="text-orange-500 flex-shrink-0" />
                <span>Raozan, CUET</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={20} className="text-orange-500 flex-shrink-0" />
                <span>+88017676-02377</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={20} className="text-orange-500 flex-shrink-0" />
                <span className="break-all">karibarian12@gmail.com</span>
              </li>
            </ul>
            
            <div className="flex space-x-4 mt-6">
              <Facebook className="cursor-pointer hover:text-orange-500" />
              <Instagram className="cursor-pointer hover:text-orange-500" />
              <Linkedin className="cursor-pointer hover:text-orange-500" />
              <Youtube className="cursor-pointer hover:text-orange-500" />
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>© 2025 Nasrul Karib Arian. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;