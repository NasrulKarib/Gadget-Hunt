import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import HeroSection from '../components/main/HeroSections';
import FeaturedCategories from '../components/main/FeatureCategories';
import ProductCard from '../components/main/ProductCard';
import BrandMarquee from '../components/main/BrandMarquee';
import UserProfile from '../components/userProfile/UserProfile';
const HomePage = () => (
  <div className="w-full">
    <HeroSection />
    <FeaturedCategories />
    <ProductCard />
    <BrandMarquee />
  </div>
);

const AppRoutes = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen w-full">
        <Header />
        <main className="flex-grow w-full">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default AppRoutes;