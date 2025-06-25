import React, { useState, useEffect } from 'react';
import { Star, ChevronDown, ChevronUp, Loader2, Filter } from 'lucide-react';
import ProductCard from './ProductCard';
import FilterSidebar from './FilterSideBar';

const products = [
  {
    id: 1,
    name: "Galaxy A36 5G",
    price: 36200,
    originalPrice: 48000,
    image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=500",
    rating: 4.5,
    category: "Smartphones",
    brand: "Samsung",
    color: "Purple",
    inStock: true
  },
  {
    id: 2,
    name: "Galaxy A56 5G",
    price: 43300,
    originalPrice: 55000,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&q=80&w=500",
    rating: 4.8,
    category: "Smartphones",
    brand: "Samsung",
    color: "Green",
    inStock: true
  },
  {
    id: 3,
    name: "Redmi Note 14 5G",
    price: 24500,
    originalPrice: 28000,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=500",
    rating: 4.2,
    category: "Smartphones",
    brand: "Xiaomi",
    color: "Blue",
    inStock: true
  },
  {
    id: 4,
    name: "Redmi Note 13 4G",
    price: 19800,
    originalPrice: 20300,
    image: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&q=80&w=500",
    rating: 4.3,
    category: "Smartphones",
    brand: "Xiaomi",
    color: "Gray",
    inStock: true
  },
  {
    id: 5,
    name: "Oppo Reno6",
    price: 30800,
    originalPrice: 35000,
    image: "https://images.unsplash.com/photo-1533228876829-65c94e7b5025?auto=format&fit=crop&q=80&w=500",
    rating: 4.4,
    category: "Smartphones",
    brand: "Oppo",
    color: "Blue",
    inStock: false
  },
  {
    id: 6,
    name: "Infinix Note 11 Pro",
    price: 21490,
    originalPrice: 25000,
    image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&q=80&w=500",
    rating: 4.1,
    category: "Smartphones",
    brand: "Infinix",
    color: "Green",
    inStock: true
  }
];

const ProductListing = () => {
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState('default');
  const [filters, setFilters] = useState({
    priceRange: [0, 100000],
    categories: [],
    brands: [],
    rating: 0,
    colors: [],
    inStock: false
  });

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const getSortedProducts = () => {
    let sortedProducts = [...products];
    switch (sortOption) {
      case 'price-asc':
        return sortedProducts.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sortedProducts.sort((a, b) => b.price - a.price);
      default:
        return sortedProducts;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Mobile Filter Toggle */}
      <button
        className="md:hidden flex items-center gap-2 mb-4 text-gray-600"
        onClick={toggleFilters}
      >
        <Filter size={20} />
        {showFilters ? 'Hide Filters' : 'Show Filters'}
        {showFilters ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div
          className={`md:w-1/4 ${
            showFilters ? 'block' : 'hidden md:block'
          } transition-all duration-300 ease-in-out`}
        >
          <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
        </div>

        {/* Product Grid */}
        <div className="md:w-3/4">
          {/* Sort Dropdown */}
          <div className="flex justify-end mb-6">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-96">
              <Loader2 className="animate-spin" size={40} />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {getSortedProducts().map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center gap-2">
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                Previous
              </button>
              <button className="px-4 py-2 bg-orange-500 text-white rounded-lg">
                1
              </button>
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                2
              </button>
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                3
              </button>
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;