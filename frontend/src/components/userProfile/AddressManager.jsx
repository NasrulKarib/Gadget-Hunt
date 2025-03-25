import React, { useState } from 'react';
import { Plus, Pencil, Trash, Check } from 'lucide-react';

const initialAddresses = [
  {
    id: 1,
    type: 'Home',
    isDefault: true,
    street: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States'
  },
  {
    id: 2,
    type: 'Office',
    isDefault: false,
    street: '456 Business Ave',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90001',
    country: 'United States'
  }
];

const AddressManager = () => {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    type: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    isDefault: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setAddresses(
        addresses.map((addr) =>
          addr.id === editingId ? { ...formData, id: editingId } : addr
        )
      );
      setEditingId(null);
    } else {
      setAddresses([...addresses, { ...formData, id: Date.now() }]);
      setIsAddingNew(false);
    }
    setFormData({
      type: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      isDefault: false
    });
  };

  const handleEdit = (address) => {
    setFormData(address);
    setEditingId(address.id);
    setIsAddingNew(true);
  };

  const handleDelete = (id) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  const handleSetDefault = (id) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id
      }))
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Manage Addresses</h2>
        {!isAddingNew && (
          <button
            onClick={() => setIsAddingNew(true)}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            <Plus size={20} />
            Add New Address
          </button>
        )}
      </div>

      {isAddingNew && (
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address Type
              </label>
              <input
                type="text"
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                placeholder="Home, Office, etc."
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Street Address
              </label>
              <input
                type="text"
                value={formData.street}
                onChange={(e) =>
                  setFormData({ ...formData, street: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State
              </label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ZIP Code
              </label>
              <input
                type="text"
                value={formData.zipCode}
                onChange={(e) =>
                  setFormData({ ...formData, zipCode: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <input
                type="text"
                value={formData.country}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
          </div>

          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              id="isDefault"
              checked={formData.isDefault}
              onChange={(e) =>
                setFormData({ ...formData, isDefault: e.target.checked })
              }
              className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
            />
            <label htmlFor="isDefault" className="ml-2 text-sm text-gray-700">
              Set as default address
            </label>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => {
                setIsAddingNew(false);
                setEditingId(null);
                setFormData({
                  type: '',
                  street: '',
                  city: '',
                  state: '',
                  zipCode: '',
                  country: '',
                  isDefault: false
                });
              }}
              className="px-6 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              {editingId ? 'Update Address' : 'Add Address'}
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((address) => (
          <div
            key={address.id}
            className="border rounded-lg p-4 relative hover:shadow-md transition"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium">{address.type}</h3>
                {address.isDefault && (
                  <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                    Default
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(address)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <Pencil size={16} className="text-gray-500" />
                </button>
                <button
                  onClick={() => handleDelete(address.id)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <Trash size={16} className="text-red-500" />
                </button>
                {!address.isDefault && (
                  <button
                    onClick={() => handleSetDefault(address.id)}
                    className="p-1 hover:bg-gray-100 rounded"
                    title="Set as default"
                  >
                    <Check size={16} className="text-gray-500" />
                  </button>
                )}
              </div>
            </div>
            <p className="text-gray-600">
              {address.street}
              <br />
              {address.city}, {address.state} {address.zipCode}
              <br />
              {address.country}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddressManager;