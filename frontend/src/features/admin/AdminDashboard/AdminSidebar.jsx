import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Package,
} from 'lucide-react';

const AdminSidebar = () => {
  const menuItems = [
    {
      title: 'Overview',
      icon: LayoutDashboard,
      path: '/admin/overview'
    },
    {
      title: 'Categories',
      icon: Users,
      path: '/admin/categories'
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
    {
      title: 'Profile',
      icon: Users,
      path: '/admin/profile'
    }
    
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
                  `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-orange-50 text-orange-500 border-r-2 border-orange-500'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <item.icon size={20} />
                <span className="font-medium">{item.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;