import React from 'react';
import { Smartphone, Laptop, Headphones, Watch, Battery, Speaker, Cable, Shield } from 'lucide-react';

const categories = [
  { icon: Smartphone, name: 'Phones & Tablets' },
  { icon: Laptop, name: 'MacBook' },
  { icon: Cable, name: 'Hubs & Docks' },
  { icon: Watch, name: 'Smart Watch' },
  { icon: Headphones, name: 'Airpods' },
  { icon: Battery, name: 'Power Bank' },
  { icon: Speaker, name: 'Speakers' },
  { icon: Shield, name: 'Cover & Glass' },
];

const FeaturedCategories = () => {
  return (
    <div className="py-8 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">FEATURED CATEGORIES</h2>
        <p className="text-gray-600 text-center mb-8 md:mb-12">Get your desired product from featured category</p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center text-center p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer"
            >
              <category.icon size={32} className="text-gray-700 mb-3" />
              <span className="text-sm ">{category.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCategories;