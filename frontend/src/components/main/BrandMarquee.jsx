import React from 'react';

const brands = [
  { name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
  { name: 'Samsung', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg' },
  { name: 'Sony', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Sony_logo.svg' },
  { name: 'Dell', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Dell_Logo.svg' },
  { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
  { name: 'Intel', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Intel-logo.svg' },
  { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
  { name: 'Huawei', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/06/Huawei_logo_%282019%29.svg' },
  { name: 'Xiaomi', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Xiaomi_logo.svg' },
  { name: 'Lenovo', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/06/Lenovo_logo_2015.svg' },
  { name: 'HP', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/HP_logo_2012.svg' },
  { name: 'Asus', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/AsusTek-black-logo.svg' },
  { name: 'Garmin', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Garmin_logo.svg' },
  { name: 'Fitbit', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Fitbit_logo.svg' },
  { name: 'Amazfit', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Amazfit_logo.svg' },
  { name: 'Jabra', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Jabra_logo.svg' },
  { name: 'Anker', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Anker_Logo.svg' },
  { name: 'Bose', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Bose_logo.svg' }
];

const BrandMarquee = () => {
  return (
    <div className="bg-white py-12">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Our Trusted Brands</h2>
        <div className="relative flex overflow-hidden">
          {/* First set of brands */}
          <div className="flex animate-marquee">
            {brands.map((brand, index) => (
              <div
                key={`brand-1-${index}`}
                className="flex items-center justify-center mx-8 min-w-[150px]"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-12 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
          
          {/* Second set of brands for seamless loop */}
          <div className="flex animate-marquee">
            {brands.map((brand, index) => (
              <div
                key={`brand-2-${index}`}
                className="flex items-center justify-center mx-8 min-w-[150px]"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-12 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandMarquee;