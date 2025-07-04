import  { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, Edit, Trash, X, Upload, AlertCircle } from 'lucide-react';
import { toast } from "react-toastify";
import AddProduct from './AddProduct/AddProduct';


const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'iPhone 15 Pro',
      sku: 'IP15P-128-BLK',
      price: 999.99,
      stock: 50,
      category: 'Phones',
      brand: 'Apple',
      status: 'Active'
    },
    {
      id: 2,
      name: 'MacBook Pro M3',
      sku: 'MBP-M3-512-SG',
      price: 1999.99,
      stock: 25,
      category: 'Laptops',
      brand: 'Apple',
      status: 'Active'
    },
    {
      id: 3,
      name: 'AirPods Pro',
      sku: 'APP-2-WHT',
      price: 249.99,
      stock: 100,
      category: 'Accessories',
      brand: 'Apple',
      status: 'Low Stock'
    },
    {
      id: 4,
      name: 'iPad Air',
      sku: 'IPA-256-SG',
      price: 599.99,
      stock: 0,
      category: 'Tablets',
      brand: 'Apple',
      status: 'Out of Stock'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'low stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'out of stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(products.map(product => product.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleAddProduct = (productData) => {
    const newProduct = {
      ...productData,
      sku: `${productData.brand.substring(0, 3).toUpperCase()}-${Date.now()}`,
      status: productData.stock > 15 ? 'Active' : productData.stock > 5 ? 'Low Stock' : 'Out of Stock'
    };
    
    setProducts(prev => [newProduct, ...prev]);
  };

  const handleDeleteProduct = (id) => {
    setProducts(prev => prev.filter(product => product.id !== id));
    setSelectedItems(prev => prev.filter(item => item !== id));
    toast.success('Product deleted successfully!');
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-orange-600 transition-colors"
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Filter size={20} />
            Filters
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="py-4 px-4">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === filteredProducts.length && filteredProducts.length > 0}
                    onChange={handleSelectAll}
                    className="rounded text-orange-500 focus:ring-orange-500"
                  />
                </th>
                <th className="text-left py-4 px-4">Product</th>
                <th className="text-left py-4 px-4">SKU</th>
                <th className="text-left py-4 px-4">Price</th>
                <th className="text-left py-4 px-4">Stock</th>
                <th className="text-left py-4 px-4">Category</th>
                <th className="text-left py-4 px-4">Brand</th>
                <th className="text-left py-4 px-4">Status</th>
                <th className="text-left py-4 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b last:border-b-0 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(product.id)}
                      onChange={() => handleSelectItem(product.id)}
                      className="rounded text-orange-500 focus:ring-orange-500"
                    />
                  </td>
                  <td className="py-4 px-4 font-medium">{product.name}</td>
                  <td className="py-4 px-4">{product.sku}</td>
                  <td className="py-4 px-4">${product.price}</td>
                  <td className="py-4 px-4">{product.stock}</td>
                  <td className="py-4 px-4">{product.category}</td>
                  <td className="py-4 px-4">{product.brand}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(product.status)}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Edit size={18} className="text-gray-500" />
                      </button>
                      <button 
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Trash size={18} className="text-red-500" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <MoreVertical size={18} className="text-gray-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found</p>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      <AddProduct
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddProduct}
      />
    </div>
  );
};

export default Products;