import React ,{useState, useEffect}from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import samsung from '../../assets/s25.jpg';
import iphone from '../../assets/iphone16.jpg';
import pixel from '../../assets/pixel.jpg';

const HeroSection = () => {
  const slides = [
    {
      image: samsung,
      title: "Galaxy S25 Ultra",
      description: "Experience the future with Galaxy AI"
    },
    {
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=1920",
      title: "MacBook Pro M3",
      description: "Unleash your creativity with power"
    },
    {
      image: iphone,
      title: "iPhone 16",
      description: "Build for Apple Intelligence"
    },
    {
      image: pixel,
      title: "Pixel 9 Pro XL",
      description: "Capture the unseen with Pixel AI"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative  mt-10 bg-gray-100 h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
      {/* Slides */}
      <div 
        className="absolute inset-0 transition-transform duration-900 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        <div className="flex h-full" style={{ width: `${slides.length * 100}%` }}>
          {slides.map((slide, index) => (
            <div 
              key={index} 
              className="relative h-full"
              style={{ width: `${100 / slides.length}%` }}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent">
                <div className="container mx-auto px-4 h-full flex items-center">
                  <div className="max-w-xl text-white">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4">{slide.title}</h1>
                    <p className="text-lg md:text-xl lg:text-2xl mb-4 md:mb-8">{slide.description}</p>
                    <button className="bg-orange-500 text-white px-6 md:px-8 py-2 md:py-3 rounded-full hover:bg-orange-600 transition">
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation Arrows - Hidden on mobile */}
      <div className="hidden md:block">
        <button 
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 p-2 rounded-full hover:bg-white/30 transition"
          onClick={prevSlide}
        >
          <ChevronLeft size={24} className="text-white" />
        </button>
        <button 
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 p-2 rounded-full hover:bg-white/30 transition"
          onClick={nextSlide}
        >
          <ChevronRight size={24} className="text-white" />
        </button>
      </div>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              currentSlide === index ? 'bg-orange-500' : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;

