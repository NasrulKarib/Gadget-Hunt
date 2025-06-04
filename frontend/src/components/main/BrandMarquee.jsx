import React from 'react';

const brands = [
  { name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
  { name: 'Samsung', logo: 'https://i.ibb.co.com/TDDJSLf7/samsung.png' },
  { name: 'Sony', logo: 'https://i.ibb.co.com/0yp6GVx1/Sony-Logo-Vector.png' },
  { name: 'Dell', logo: 'https://i.ibb.co.com/rRbFLJkK/Dell-Logo-svg-300x92.png' },
  { name: 'Microsoft', logo: 'https://i.ibb.co.com/V0fWfx4Y/microsoft.png' },
  { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
  { name: 'Huawei', logo: 'https://i.ibb.co.com/zWH6NMpK/huawei.png' },
  { name: 'Xiaomi', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Xiaomi_logo.svg' },
  { name: 'Lenovo', logo: 'https://i.ibb.co.com/KpnK868L/Lenovo-new-Logo-Vector-svg.png' },
  { name: 'HP', logo: 'https://i.ibb.co.com/ks1d34g5/1024px-HP-logo-2012-svg.png' },
  { name: 'Asus', logo: 'https://i.ibb.co.com/MkH68YYH/ASUS-Logo-svg.png' },
  { name: 'Fitbit', logo: 'https://i.ibb.co.com/QzSnyXj/Fitbit-logo-svg.png' },
  { name: 'Amazfit', logo: 'https://i.ibb.co.com/N20stfZ3/amazfit-logo-B549860-C1-A-seeklogo-com.png' },
  { name: 'Anker', logo: 'https://i.ibb.co.com/4RxyjWvr/Anker-logo-svg.png' },
  { name: 'Realme', logo: 'https://i.ibb.co.com/hx4nNg8t/Realme-realme-logo-box-RGB-01-svg.png' },
  { name: 'Vivo', logo: 'https://i.ibb.co.com/V05SRN1F/Vivo-Logo-svg.png' },
  { name: 'OnePlus', logo: 'https://i.ibb.co.com/Q4bgvhp/OP-LU-Reg-1-L-RGB-red-copy-01-svg.png' },
  { name: 'Acer', logo: 'https://i.ibb.co.com/67yHmycq/Acer-2011-svg.png' },
  { name: 'MSI', logo: 'https://i.ibb.co.com/sdp0zgSq/msi.png' },
  { name: 'Nothing', logo: 'https://i.ibb.co.com/MyB8GZqy/Nothing-Phone-Logo-PNG.png' }
];


const BrandMarquee = () => {
  return (
    <div className="bg-white py-12">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Our Trusted Brands</h2>
        <div className="relative flex overflow-hidden">
          {/* First set of brands */}
          <div className="flex items-center animate-marquee">
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