import React,{useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet,Navigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {setUser} from '../features/auth/authSlices'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Login from '../features/auth/Login';
import Signup from '../features/auth/Signup';
import HeroSection from '../components/HeroSections';
import FeaturedCategories from '../components/FeatureCategories';
import FeatureProducts from '../components/FeatureProducts';
import ProductList from '../features/products/ProductListing'
import ProductDetails from '../features/products/ProductDetails'
import BrandMarquee from '../components/BrandMarquee';
import UserProfile from '../features/user/UserProfile';
import Admin from '../features/admin/AdminDashboard/AdminDashboard';
import Overview from '../features/admin/AdminFeatures/Overviews/Overview';
import Products from '../features/admin/AdminFeatures/Products/Products';
import Profile from '../features/admin/AdminFeatures/Profile/Profile';
import Categories from '../features/admin/AdminFeatures/Categories/Categories';
import Orders from '../features/admin/AdminFeatures/Orders/Orders';
import Customers from '../features/admin/AdminFeatures/Customers/Customers'
import Protected from '../features/auth/Protected'

const HomePage = () => (
  <div className="w-full">
    <HeroSection />
    <FeaturedCategories />
    <FeatureProducts />
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
    const storedUser = sessionStorage.getItem('user');
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
          <Route path="/category" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Route>
   
        {/* Admin Routes */}
        <Route path="/admin" element={<Navigate to="/admin/overview" replace />} />
        
        <Route path="/admin" element={<Protected requireAdmin> <Admin /> </Protected>}>
          <Route path="overview" element={<Overview />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path ="customers" element={<Customers />} />
          <Route path ="profile" element={<Profile />} />
          <Route path ="categories" element={<Categories />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;