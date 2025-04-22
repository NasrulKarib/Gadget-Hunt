import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Camera } from 'lucide-react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PersonalInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  useEffect(()=>{
    function extractNames(name) {
      const parts = name.trim().split(/\s+/);
    
      if (parts.length === 1) {
        return { firstName: parts[0], lastName: '' };
      }
    
      let rawLastName = parts[parts.length - 1];
      const lastName = rawLastName.replace(/^\(|\)$/g, ''); 

      const firstName = parts.slice(0, -1).join(' ');
    
      return { firstName, lastName };
    }
    

    const fetchProfile = async()=>{
      try{
        const response = await axios.get('http://localhost:8000/api/users/profile/', 
          {withCredentials: true}
        );
        const userData = response.data.user;
        const { firstName, lastName } = extractNames(userData.name);
        setFormData({
          firstName: firstName || '',
          lastName: lastName || '',
          phone: userData.phone || '',
          email: userData.email || '',
        });
        
      }catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load profile');
      }
    }
    fetchProfile();
    
  },[])

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