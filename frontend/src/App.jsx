import React, { useState } from 'react'
import './App.css'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import HeroSection from './components/main/HeroSections'
import FeaturedCategories from './components/main/FeatureCategories'
function App() {

  return (
    <div className="min-h-screen bg-gray-50">
      <Header/>
      <HeroSection/>
      <FeaturedCategories/>
      <Footer/>
    </div>
  )
}

export default App
