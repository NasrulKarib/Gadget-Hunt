import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Package,
  Settings,
  HelpCircle
} from 'lucide-react';

const AdminSidebar = () => {
  const menuItems = [
    {
      title: 'Overview',
      icon: LayoutDashboard,
      path: '/admin/overview'
    },
    {
      title: 'Products',
      icon: Package,
      path: '/admin/products'
    },
    {
      title: 'Orders',
      icon: ShoppingBag,
      path: '/admin/orders'
    },
    {
      title: 'Customers',
      icon: Users,
      path: '/admin/customers'
    },
    
  ];

  return (
    <aside className="w-64 bg-white border-r min-h-screen">
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                    isActive
                      ? 'bg-orange-50 text-orange-500'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
              >
                <item.icon size={20} />
                <span>{item.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;