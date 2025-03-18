import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import HeroSection from '../components/main/HeroSections';
import FeaturedCategories from '../components/main/FeatureCategories';
import ProductCard from '../components/main/ProductCard';



const HomePage = () => (
  <>
    <HeroSection />
    <FeaturedCategories />
    <ProductCard />
    {/* Add other homepage components here */}
  </>
);

const AppRoutes = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* Add other routes as needed */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default AppRoutes;
