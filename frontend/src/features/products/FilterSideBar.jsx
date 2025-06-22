import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Star } from 'lucide-react';

const FilterSection = ({ title, children, defaultExpanded = true }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="border-b pb-4 mb-4">
      <button
        className="flex items-center justify-between w-full py-2"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-lg font-medium">{title}</h3>
        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isExpanded && <div className="mt-2">{children}</div>}
    </div>
  );
};

const FilterSidebar = ({ filters, onFilterChange }) => {
  const handlePriceChange = (min, max) => {
    onFilterChange({ ...filters, priceRange: [min, max] });
  };

  const handleCheckboxChange = (category, value) => {
    const updatedCategories = filters[category].includes(value)
      ? filters[category].filter((item) => item !== value)
      : [...filters[category], value];
    onFilterChange({ ...filters, [category]: updatedCategories });
  };

  const handleRatingChange = (rating) => {
    onFilterChange({ ...filters, rating });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      {/* Price Range */}
      <FilterSection title="Price Range">
        <div className="space-y-4">
          <input
            type="range"
            min="0"
            max="100000"
            value={filters.priceRange[1]}
            onChange={(e) =>
              handlePriceChange(filters.priceRange[0], parseInt(e.target.value))
            }
            className="w-full"
          />
          <div className="flex gap-4">
            <input
              type="number"
              value={filters.priceRange[0]}
              onChange={(e) =>
                handlePriceChange(parseInt(e.target.value), filters.priceRange[1])
              }
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Min"
            />
            <input
              type="number"
              value={filters.priceRange[1]}
              onChange={(e) =>
                handlePriceChange(filters.priceRange[0], parseInt(e.target.value))
              }
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Max"
            />
          </div>
        </div>
      </FilterSection>

      {/* Categories */}
      <FilterSection title="Categories">
        {['Smartphones', 'Laptops', 'Tablets', 'Accessories'].map((category) => (
          <label key={category} className="flex items-center gap-2 py-1">
            <input
              type="checkbox"
              checked={filters.categories.includes(category)}
              onChange={() => handleCheckboxChange('categories', category)}
              className="rounded text-orange-500 focus:ring-orange-500"
            />
            {category}
          </label>
        ))}
      </FilterSection>

      {/* Brands */}
      <FilterSection title="Brands">
        {['Samsung', 'Apple', 'Xiaomi', 'Oppo', 'Infinix'].map((brand) => (
          <label key={brand} className="flex items-center gap-2 py-1">
            <input
              type="checkbox"
              checked={filters.brands.includes(brand)}
              onChange={() => handleCheckboxChange('brands', brand)}
              className="rounded text-orange-500 focus:ring-orange-500"
            />
            {brand}
          </label>
        ))}
      </FilterSection>

      {/* Rating */}
      <FilterSection title="Rating">
        {[5, 4, 3, 2, 1].map((rating) => (
          <button
            key={rating}
            className={`flex items-center gap-1 py-1 ${
              filters.rating === rating ? 'text-orange-500' : 'text-gray-600'
            }`}
            onClick={() => handleRatingChange(rating)}
          >
            {[...Array(rating)].map((_, index) => (
              <Star
                key={index}
                size={16}
                className={filters.rating === rating ? 'fill-orange-500' : ''}
              />
            ))}
            <span>& Up</span>
          </button>
        ))}
      </FilterSection>

      {/* Colors */}
      <FilterSection title="Colors">
        <div className="flex flex-wrap gap-2">
          {['Black', 'White', 'Blue', 'Red', 'Green'].map((color) => (
            <button
              key={color}
              className={`w-8 h-8 rounded-full border-2 ${
                filters.colors.includes(color)
                  ? 'border-orange-500'
                  : 'border-transparent'
              }`}
              style={{ backgroundColor: color.toLowerCase() }}
              onClick={() => handleCheckboxChange('colors', color)}
            />
          ))}
        </div>
      </FilterSection>

      {/* Availability */}
      <FilterSection title="Availability">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={(e) =>
              onFilterChange({ ...filters, inStock: e.target.checked })
            }
            className="rounded text-orange-500 focus:ring-orange-500"
          />
          In Stock Only
        </label>
      </FilterSection>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={() =>
            onFilterChange({
              priceRange: [0, 100000],
              categories: [],
              brands: [],
              rating: 0,
              colors: [],
              inStock: false
            })
          }
          className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
        >
          Clear All
        </button>
        <button className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;