import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Share2, Heart, ChevronRight, ZoomIn } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedStorage, setSelectedStorage] = useState('12/256GB');
  const [activeTab, setActiveTab] = useState('specification');

  // Mock product data - in a real app this would come from an API
  const product = {
    id: 1,
    name: 'Galaxy S25 Ultra 5G',
    brand: 'SAMSUNG',
    originalPrice: 140000,
    discountedPrice: 116500,
    discount: '17% OFF',
    status: 'In Stock',
    productCode: 'AGL28742',
    rating: 4.5,
    reviewCount: 128,
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=500',
      'https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3?auto=format&fit=crop&q=80&w=500',
      'https://images.unsplash.com/photo-1610945261940-fe87f763120e?auto=format&fit=crop&q=80&w=500',
      'https://images.unsplash.com/photo-1610945267322-b6cd0b048e09?auto=format&fit=crop&q=80&w=500',
    ],
    colors: ['Black', 'Silver', 'Green', 'Gray', 'Rose', 'Blue', 'White'],
    storage: ['12/1TB', '12/256GB', '12/512GB'],
    specifications: {
      brand: 'Samsung',
      model: 'Galaxy S25 Ultra',
      network: 'GSM / CDMA / HSPA / EVDO / LTE / 5G',
      dimensions: '162.8 x 77.6 x 8.2 mm',
      weight: '218 g',
      sim: 'Nano-SIM + eSIM | Dual Nano-SIM',
      displayType: 'Dynamic LTPO AMOLED 2X',
      displaySize: '6.9 inches',
      resolution: '1440 x 3120 pixels',
      os: 'Android 15, One UI 7',
      chipset: 'Qualcomm Snapdragon 8 Elite'
    }
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm mb-8">
        <a href="/" className="text-gray-500 hover:text-orange-500">Home</a>
        <ChevronRight size={16} className="mx-2 text-gray-400" />
        <a href="/shop" className="text-gray-500 hover:text-orange-500">Shop</a>
        <ChevronRight size={16} className="mx-2 text-gray-400" />
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
              <ZoomIn className="text-white" size={32} />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square rounded-lg overflow-hidden border-2 ${
                  selectedImage === index
                    ? 'border-orange-500'
                    : 'border-transparent'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <span className="bg-orange-100 text-orange-800 text-sm px-3 py-1 rounded-full">
                {product.discount}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                {renderStars(product.rating)}
                <span className="ml-1">({product.reviewCount} reviews)</span>
              </div>
              <span>|</span>
              <span>Product Code: {product.productCode}</span>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-baseline gap-4 mb-2">
              <span className="text-3xl font-bold">৳{product.discountedPrice}</span>
              <span className="text-xl text-gray-500 line-through">
                ৳{product.originalPrice}
              </span>
            </div>
            <span className="text-green-600">{product.status}</span>
          </div>

          {/* Color Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color:
            </label>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color, index) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(index)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === index
                      ? 'border-orange-500'
                      : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Storage Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Storage:
            </label>
            <div className="flex flex-wrap gap-2">
              {product.storage.map((option) => (
                <button
                  key={option}
                  onClick={() => setSelectedStorage(option)}
                  className={`px-4 py-2 rounded-lg border ${
                    selectedStorage === option
                      ? 'border-orange-500 bg-orange-50 text-orange-500'
                      : 'border-gray-200 hover:border-orange-500'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity:
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="w-10 h-10 border rounded-lg flex items-center justify-center hover:bg-gray-50"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 h-10 border rounded-lg text-center"
              />
              <button
                onClick={() => handleQuantityChange(1)}
                className="w-10 h-10 border rounded-lg flex items-center justify-center hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button className="flex-1 bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 transition">
              Buy Now
            </button>
            <button className="flex-1 border border-orange-500 text-orange-500 py-3 px-6 rounded-lg hover:bg-orange-50 transition">
              Add to Cart
            </button>
            <button className="w-12 h-12 border rounded-lg flex items-center justify-center hover:bg-gray-50">
              <Heart className="text-gray-500" />
            </button>
            <button className="w-12 h-12 border rounded-lg flex items-center justify-center hover:bg-gray-50">
              <Share2 className="text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b">
          <div className="flex">
            {['specification', 'description', 'warranty', 'video'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-medium capitalize ${
                  activeTab === tab
                    ? 'border-b-2 border-orange-500 text-orange-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'specification' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="border-b pb-4">
                  <dt className="text-sm font-medium text-gray-500 mb-1 capitalize">
                    {key}
                  </dt>
                  <dd className="text-sm text-gray-900">{value}</dd>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <p>
                Experience the future of mobile technology with the Galaxy S25 Ultra.
                This flagship device combines cutting-edge features with elegant design,
                delivering unprecedented performance and capability.
              </p>
              {/* Add more description content as needed */}
            </div>
          )}
          {activeTab === 'warranty' && (
            <div className="prose max-w-none">
              <p>
                This product comes with a 1-year manufacturer warranty covering
                manufacturing defects and hardware malfunctions.
              </p>
              {/* Add more warranty content as needed */}
            </div>
          )}
          {activeTab === 'video' && (
            <div className="prose max-w-none">
              <p>Product demonstration videos coming soon.</p>
              {/* Add video content as needed */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;