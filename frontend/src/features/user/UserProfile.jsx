import React, { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { logout } from '../auth/authSlices';
import PersonalInfo from './PersonalInfo';
import OrderHistory from './OrderHistory';
import AddressManager from './AddressManager';
import PasswordUpdate from './PasswordUpdate';
import Sidebar from './Sidebar';

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('personal');
  
  useEffect(()=>{
    const fetchProfile = async ()=>{
      try{
        const res = await axios.get(`${API_BASE_URL}/api/users/profile/`,{
          withCredentials: true,
        });
      }
      catch(err){
        if(err.res?.status == 401){
          dispatch(logout())
          navigate('/login');
        }
      }
    };

    fetchProfile();
  },[dispatch,navigate]);

  const renderContent = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalInfo />;
      case 'orders':
        return <OrderHistory />;
      case 'addresses':
        return <AddressManager />;
      case 'password':
        return <PasswordUpdate />;
      default:
        return <PersonalInfo />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-1/4">
          <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
