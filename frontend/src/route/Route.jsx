import React,{useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet,Navigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/slices/authSlices';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import HeroSection from '../components/main/HeroSections';
import FeaturedCategories from '../components/main/FeatureCategories';
import ProductCard from '../components/main/ProductCard';
import BrandMarquee from '../components/main/BrandMarquee';
import UserProfile from '../components/userProfile/UserProfile';
import Admin from '../components/admin/AdminDashboard';
import Overview from '../components/admin/Overview';
import Products from '../components/admin/Products';
import Orders from '../components/admin/Orders';
import Customers from '../components/admin/Customers'
import Protected from '../components/auth/Protected'

const HomePage = () => (
  <div className="w-full">
    <HeroSection />
    <FeaturedCategories />
    <ProductCard />
    <BrandMarquee />
  </div>
);

const MainLayout = () => (
  <div className="flex flex-col min-h-screen w-full">
    <Header />
    <main className="flex-grow w-full">
      <Outlet /> 
    </main>
    <Footer />
  </div>
);

const AuthRedirect = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  if (user) {
    return <Navigate to={user.role === 'Admin' ? '/admin' : '/'} replace />;
  }
  return children;
};

const AppRoutes = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    const storedUser = localStorage.getItem('user');
    if(storedUser){
      dispatch(setUser(JSON.parse(storedUser)));
    }
  },[dispatch]);

  return (
    <Router>
      <Routes>
        {/* Routes with Header and Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<AuthRedirect> <Login /> </AuthRedirect>} />
          <Route path="/signup" element={<AuthRedirect> <Signup /> </AuthRedirect> } />
          <Route path="/profile" element={<Protected> <UserProfile /> </Protected>} />
        </Route>
   
        {/* Admin Routes */}
        <Route path="/admin" element={<Protected requireAdmin> <Admin /> </Protected>}>
          <Route path="overview" element={<Overview />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path ="customers" element={<Customers />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;