import React from 'react';
import { User, ShoppingBag, Star, MapPin, Key, LogOut } from 'lucide-react';
import {useSelector} from 'react-redux';

const Sidebar = ({ activeSection, onSectionChange }) => {
  const {user} = useSelector(state => state.auth);
  const menuItems = [
    { id: 'personal', icon: User, label: 'Personal Info', count: null },
    { id: 'orders', icon: ShoppingBag, label: 'Orders', count: '12' },
    { id: 'addresses', icon: MapPin, label: 'Addresses', count: null },
    { id: 'password', icon: Key, label: 'Password', count: null },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Profile Summary */}
      <div className="flex items-center gap-4 mb-8">
        <div className="relative">
          <User className="w-15 h-15 text-gray-700" />
          <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
        </div>
        <div>
          <h2 className="text-lg font-semibold">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onSectionChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                  activeSection === item.id
                    ? 'bg-orange-50 text-orange-500'
                    : 'hover:bg-gray-50 ' + (item.className || '')
                }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
                {item.count && (
                  <span className="ml-auto text-sm text-gray-500">{item.count}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;