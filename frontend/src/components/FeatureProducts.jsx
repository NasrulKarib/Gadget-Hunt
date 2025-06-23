import React, { useState } from 'react';

const bestDealsProducts = [
  {
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=500",
    name: "Samsung Galaxy S25 Ultra",
    price: 1199,
    originalPrice: 1299,
    discount: "8% OFF"
  },
  {
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&q=80&w=500",
    name: "Apple Watch Series 10",
    price: 399,
    originalPrice: 449,
    discount: "11% OFF"
  },
  {
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&q=80&w=500",
    name: "AirPods Pro 2",
    price: 249,
    originalPrice: 279,
    discount: "11% OFF"
  },
  {
    image: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&q=80&w=500",
    name: "MacBook Pro M3",
    price: 1999,
    originalPrice: 2199,
    discount: "9% OFF"
  }
];

const bestSellersProducts = [
  {
    image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&q=80&w=500",
    name: "Samsung Galaxy Tab S9",
    price: 899,
    originalPrice: null,
    bestseller: true
  },
  {
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&q=80&w=500",
    name: "Dell XPS 13",
    price: 1199,
    originalPrice: null,
    bestseller: true
  },
  {
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=500",
    name: "Nintendo Switch OLED",
    price: 349,
    originalPrice: null,
    bestseller: true
  },
  {
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=500",
    name: "JBL Charge 5",
    price: 179,
    originalPrice: null,
    bestseller: true
  }
];

const FeatureProducts = () => {
  const [activeTab, setActiveTab] = useState('deals');

  const currentProducts = activeTab === 'deals' ? bestDealsProducts : bestSellersProducts;

  return (
    <div className="py-8 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Featured Products</h2>
        
        {/* Tab Navigation */}
        <div className="flex justify-center space-x-8 mb-8">
          <button 
            onClick={() => setActiveTab('deals')}
            className={`pb-2 px-4 text-sm md:text-base font-medium transition-all duration-300 ${
              activeTab === 'deals'
                ? 'text-orange-500 border-b-2 border-orange-500'
                : 'text-gray-600 hover:text-orange-500'
            }`}
          >
            BEST DEALS
          </button>
          <button 
            onClick={() => setActiveTab('sellers')}
            className={`pb-2 px-4 text-sm md:text-base font-medium transition-all duration-300 ${
              activeTab === 'sellers'
                ? 'text-orange-500 border-b-2 border-orange-500'
                : 'text-gray-600 hover:text-orange-500'
            }`}
          >
            BEST SELLERS
          </button>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {currentProducts.map((product, index) => (
            <div 
              key={`${activeTab}-${index}`} 
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer"
            >
              {/* Product Image */}
              <div className="relative pb-[100%] mb-4 overflow-hidden rounded-lg">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Badges */}
                {product.discount && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    {product.discount}
                  </span>
                )}
                {product.bestseller && (
                  <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    BESTSELLER
                  </span>
                )}
              </div>
              
              {/* Product Info */}
              <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-500 transition-colors">
                {product.name}
              </h3>
              
              {/* Price */}
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-lg font-bold text-gray-900">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                )}
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2">
                <button className="flex-1 bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 text-sm font-medium transition-colors">
                  Buy Now
                </button>
                <button className="flex-1 border border-orange-500 text-orange-500 py-2 px-4 rounded hover:bg-orange-50 text-sm font-medium transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* View All Button */}
        <div className="text-center mt-8">
          <button className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium">
            View All {activeTab === 'deals' ? 'Deals' : 'Best Sellers'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeatureProducts;