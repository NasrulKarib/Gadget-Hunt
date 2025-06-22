import React from 'react';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={16}
        className={`${
          index < Math.floor(rating)
            ? 'text-yellow-400 fill-yellow-400'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
      onClick={handleProductClick}
    >
      {/* Quick View Button */}
      <div className="relative group cursor-pointer">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover rounded-t-lg"
        />
        <button 
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={(e) => {
            e.stopPropagation();
            // Handle quick view logic here
          }}
        >
          <Eye size={20} className="text-gray-600" />
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-2">{product.name}</h3>
        
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl font-bold">৳{product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ৳{product.originalPrice}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 mb-4">
          {renderStars(product.rating)}
          <span className="text-sm text-gray-500 ml-2">{product.rating}</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <button 
            className="flex-1 bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition-colors duration-300"
            onClick={(e) => {
              e.stopPropagation();
              // Handle buy now logic here
            }}
          >
            Buy Now
          </button>
          <button 
            className="flex-1 border border-orange-500 text-orange-500 py-2 px-4 rounded hover:bg-orange-50 transition-colors duration-300 flex items-center justify-center gap-2"
            onClick={(e) => {
              e.stopPropagation();
              // Handle add to cart logic here
            }}
          >
            <ShoppingCart size={20} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;