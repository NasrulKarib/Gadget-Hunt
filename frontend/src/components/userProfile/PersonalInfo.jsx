import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/authSlices';

const PersonalInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
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
      } finally{
        setLoading(false);
      }
    }
    fetchProfile();
    
  },[])

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);

    // Validate inputs
    if (!formData.firstName.trim()) {
      toast.error('First name is required');
      setLoading(false);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('Invalid email address');
      setLoading(false);
      return;
    }
    if (formData.phone && !/^\+?\d{10,15}$/.test(formData.phone)) {
      toast.error('Invalid phone number');
      setLoading(false);
      return;
    }

    try {
      const name = `${formData.firstName} ${formData.lastName}`.trim();
      const response = await axios.patch(
        'http://localhost:8000/api/users/profile/',
        {
          name,
          email: formData.email,
          phone: formData.phone,
        },
        { withCredentials: true }
      );
      const updatedUser = response.data.user;
      dispatch(setUser({
        ...user,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
      }));
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      console.log(error);
      if (error.response?.status === 401) {
        dispatch(logout());
        toast.error('Session expired, please log in');
      } else {
        toast.error(error.response?.data?.detail || 'Failed to update profile');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    loading ? (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    ) : (
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
    )
  );
  
};

export default PersonalInfo;