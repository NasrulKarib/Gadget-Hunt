import { Outlet } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        toastStyle={{ background: '#363636', color: '#fff' }}
        theme="dark"
        progressStyle={(options) =>
          options.type === 'success'
            ? { background: '#4aed88' }
            : { background: '#ff4b4b' }
        }
      />
    </div>
  );
};

export default AdminDashboard;