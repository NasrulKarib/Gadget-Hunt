import React ,{useState, useEffect}from 'react';
import { ChevronLeft, ChevronRight, Tag, Percent } from 'lucide-react';
import samsung from '../../assets/s25.jpg';
import iphone from '../../assets/iphone16.jpg';
import pixel from '../../assets/pixel.jpg';
import appleWatch from '../../assets/apple-watch.jpg';
import sony from '../../assets/sony-headphones.jpg';

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

  const advertisement = [
    {
      name: "Apple Watch",
      image: appleWatch,
    },
    {
      name: "Sony Headphones",
      image: sony,
    }
  ]
  const offers = [
    {
      title: "Student Discount",
      description: "Get 10% off on all Apple products",
      icon: Tag
    },
    {
      title: "Weekend Sale",
      description: "Up to 30% off on selected items",
      icon: Percent
    },
    {
      title: "Bundle Deal",
      description: "Buy MacBook & get AirPods free",
      icon: Tag
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
    <div className="bg-white py-6">
      <div className="container mx-auto space-y-6">
        {/* Main section with slider and advs */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side - Slider */}
          <div className="lg:w-2/3">
            <div className="relative bg-gray-100 h-[300px] md:h-[400px] overflow-hidden rounded-xl">
              <div 
                className="absolute inset-0 transition-transform duration-500 ease-in-out"
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
                        <div className="h-full flex items-center p-8">
                          <div className="max-w-xl text-white">
                            <h1 className="text-3xl md:text-4xl font-bold mb-2 md:mb-4">{slide.title}</h1>
                            <p className="text-lg md:text-xl mb-4 md:mb-8">{slide.description}</p>
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
              
              {/* Navigation Arrows */}
              <div className="absolute inset-0 flex items-center justify-between p-4">
                <button 
                  className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition"
                  onClick={prevSlide}
                >
                  <ChevronLeft size={24} className="text-white" />
                </button>
                <button 
                  className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition"
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
          </div>

          {/* Right Side - Advertisements */}
          <div className="lg:w-1/3 space-y-6">
                {advertisement.map((ad, index) => (
                  <div 
                    key={index} 
                    className="overflow-hidden rounded-xl relative h-[190px] cursor-pointer"
                  >
                    <img 
                      src={ad.image} 
                      alt={ad.name} 
                      className="absolute w-full h-full object-cover rounded-t-xl"
                    />
                  </div>
                ))}

          </div>
            
        </div>
          
        {/* Offers Section */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {offers.map((offer, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition cursor-pointer"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <offer.icon className="text-orange-500" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{offer.title}</h3>
                    <p className="text-gray-600">{offer.description}</p>
                  </div>
                </div>
              </div>
            ))} 

        </div>
      </div>
    </div>
  );
};

export default HeroSection;