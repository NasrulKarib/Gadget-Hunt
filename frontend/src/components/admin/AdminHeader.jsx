import React from 'react';
import { Bell, User, Settings } from 'lucide-react';

const AdminHeader = () => {
  return (
    <header className="bg-white border-b">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-xl font-bold text-orange-500">Admin Dashboard</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Settings size={20} />
            </button>
            
            <div className="flex items-center space-x-2">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=32&h=32&q=80"
                alt="Admin"
                className="w-8 h-8 rounded-full"
              />
              <span className="hidden md:inline-block font-medium">Admin User</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;