import React from 'react';

const featuredProducts = [
  {
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=500",
    name: "Samsung Galaxy S25 Ultra",
    price: 1199,
    originalPrice: 1299
  },
  {
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&q=80&w=500",
    name: "Apple Watch Series 10",
    price: 399,
    originalPrice: 449
  },
  {
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&q=80&w=500",
    name: "AirPods Pro 2",
    price: 249,
    originalPrice: 279
  },
  {
    image: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&q=80&w=500",
    name: "MacBook Pro M3",
    price: 1999,
    originalPrice: 2199
  }
];

const ProductCard = () => {
  return (
    <div className="py-8 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Featured Products</h2>
        <div className="flex justify-center space-x-4 mb-8">
          <button className="text-orange-500 border-b-2 border-orange-500 pb-1">
            BEST DEALS
          </button>
          <button className="text-gray-600 hover:text-orange-500">
            BEST SELLERS
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition">
              <div className="relative pb-[100%] mb-4">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </div>
              <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-lg font-bold">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <button className="flex-1 bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 text-sm">
                  Buy Now
                </button>
                <button className="flex-1 border border-orange-500 text-orange-500 py-2 px-4 rounded hover:bg-orange-50 text-sm">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;