import React, { useState } from 'react';
import { Camera } from 'lucide-react';

const PersonalInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 890'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Personal Information</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-orange-500 hover:text-orange-600"
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Picture */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
            {isEditing && (
              <label className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg cursor-pointer">
                <Camera size={20} className="text-gray-600" />
                <input type="file" className="hidden" accept="image/*" />
              </label>
            )}
          </div>
          {isEditing && (
            <div className="text-sm text-gray-500">
              <p>Upload a new photo</p>
              <p>JPG, GIF or PNG. 1MB max.</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              disabled={!isEditing}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              disabled={!isEditing}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              disabled={!isEditing}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              disabled={!isEditing}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100"
            />
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-6 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default PersonalInfo;