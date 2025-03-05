import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import samsung from '../../assets/s25.jpg';
import iphone from '../../assets/iphone.avif';
import pixel from '../../assets/pixel.webp';

const HeroSection = () => {
  return (
    <div className="relative bg-gray-100 h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={samsung}
          alt="Latest gadgets"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent">
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="max-w-xl text-white">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4">Galaxy S25 Ultra</h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-4 md:mb-8">Experience the future with Galaxy AI</p>
            <button className="bg-orange-500 text-white px-6 md:px-8 py-2 cursor-pointer md:py-3 rounded-full hover:bg-orange-600 transition">
              Shop Now
            </button>
          </div>
        </div>
      </div>
      
      {/* Navigation Arrows - Hidden on mobile */}
      <div className="hidden md:block">
        <button className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 p-2 rounded-full hover:bg-white/30">
          <ChevronLeft size={24} className="text-white" />
        </button>
        <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 p-2 rounded-full hover:bg-white/30">
          <ChevronRight size={24} className="text-white" />
        </button>
      </div>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
        <div className="w-2 h-2 rounded-full bg-white/50"></div>
        <div className="w-2 h-2 rounded-full bg-white/50"></div>
      </div>
    </div>
  );
};

export default HeroSection;