import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash, MoreVertical, AlertCircle, Check, X } from 'lucide-react';
import { toast } from 'react-toastify';

const Categories = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'Smartphones',
      description: 'Latest mobile devices and accessories',
      status: 'Active',
      productsCount: 45,
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'Laptops',
      description: 'High-performance computing devices',
      status: 'Active',
      productsCount: 32,
      createdAt: '2024-01-20'
    },
    {
      id: 3,
      name: 'Tablets',
      description: 'Portable touchscreen devices',
      status: 'Active',
      productsCount: 18,
      createdAt: '2024-02-01'
    },
    {
      id: 4,
      name: 'Accessories',
      description: 'Tech accessories and peripherals',
      status: 'Inactive',
      productsCount: 67,
      createdAt: '2024-02-05'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'Active'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Category name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Category name must be at least 2 characters';
    } else if (formData.name.length > 50) {
      newErrors.name = 'Category name must be less than 50 characters';
    }

    if (formData.description && formData.description.length > 200) {
      newErrors.description = 'Description must be less than 200 characters';
    }

    if (!formData.status) {
      newErrors.status = 'Status is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (editingCategory) {
        setCategories(prev => 
          prev.map(cat => 
            cat.id === editingCategory.id 
              ? { ...cat, ...formData, updatedAt: new Date().toISOString().split('T')[0] }
              : cat
          )
        );
        toast.success('Category updated successfully!');
      } else {
        const newCategory = {
          id: Date.now(),
          ...formData,
          productsCount: 0,
          createdAt: new Date().toISOString().split('T')[0]
        };
        setCategories(prev => [newCategory, ...prev]);
        toast.success('Category added successfully!');
      }

      handleCloseModal();
    } catch (error) {
      toast.error('Failed to save category. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      status: category.status
    });
    setIsAddModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setCategories(prev => prev.filter(cat => cat.id !== id));
        setSelectedItems(prev => prev.filter(item => item !== id));
        toast.success('Category deleted successfully!');
      } catch (error) {
        toast.error('Failed to delete category. Please try again.');
      }
    }
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setEditingCategory(null);
    setFormData({
      name: '',
      description: '',
      status: 'Active'
    });
    setErrors({});
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(filteredCategories.map(cat => cat.id));
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

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Categories</h1>
          <p className="text-gray-500">Manage product categories and their settings</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-orange-600 transition-colors"
        >
          <Plus size={20} />
          Add New Category
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Categories</p>
              <h3 className="text-2xl font-bold">{categories.length}</h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Filter className="text-blue-600" size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Categories</p>
              <h3 className="text-2xl font-bold">{categories.filter(cat => cat.status === 'Active').length}</h3>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Check className="text-green-600" size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Products</p>
              <h3 className="text-2xl font-bold">{categories.reduce((sum, cat) => sum + cat.productsCount, 0)}</h3>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <Plus className="text-orange-600" size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Inactive Categories</p>
              <h3 className="text-2xl font-bold">{categories.filter(cat => cat.status === 'Inactive').length}</h3>
            </div>
            <div className="p-3 bg-gray-100 rounded-full">
              <X className="text-gray-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search categories..."
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

      {/* Categories Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="py-4 px-4">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === filteredCategories.length && filteredCategories.length > 0}
                    onChange={handleSelectAll}
                    className="rounded text-orange-500 focus:ring-orange-500"
                  />
                </th>
                <th className="text-left py-4 px-4">Category Name</th>
                <th className="text-left py-4 px-4">Description</th>
                <th className="text-left py-4 px-4">Products</th>
                <th className="text-left py-4 px-4">Status</th>
                <th className="text-left py-4 px-4">Created</th>
                <th className="text-left py-4 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((category) => (
                <tr key={category.id} className="border-b last:border-b-0 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(category.id)}
                      onChange={() => handleSelectItem(category.id)}
                      className="rounded text-orange-500 focus:ring-orange-500"
                    />
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-medium">{category.name}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-gray-600 max-w-xs truncate">{category.description}</div>
                  </td>
                  <td className="py-4 px-4">{category.productsCount}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(category.status)}`}>
                      {category.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">{category.createdAt}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleEdit(category)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Edit size={18} className="text-gray-500" />
                      </button>
                      <button 
                        onClick={() => handleDelete(category.id)}
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

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No categories found</p>
          </div>
        )}
      </div>

      {/* Add/Edit Category Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Category Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 transition-colors ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter category name"
                  maxLength={50}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errors.name}
                  </p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  {formData.name.length}/50 characters
                </p>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 transition-colors resize-none ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter category description (optional)"
                  rows={3}
                  maxLength={200}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errors.description}
                  </p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  {formData.description.length}/200 characters
                </p>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status *
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 transition-colors ${
                    errors.status ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                {errors.status && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errors.status}
                  </p>
                )}
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-4 pt-6 border-t">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {editingCategory ? 'Updating...' : 'Adding...'}
                    </>
                  ) : (
                    editingCategory ? 'Update Category' : 'Add Category'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;