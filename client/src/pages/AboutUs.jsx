import React, { useEffect } from 'react';

const AboutUs = () => {
  useEffect(() => {
    console.log('About Us component mounted');
    document.title = 'About Us - His & Her Essentials';
  }, []);

  return (
    <section className="w-full min-h-screen bg-gray-50">
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              About His & Her Essentials
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Your one-stop destination for premium fashion and lifestyle products
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
                <p className="text-lg text-gray-500">
                  Founded with a passion for bringing quality fashion to everyone, His & Her Essentials 
                  has grown from a small boutique to a comprehensive online destination for fashion 
                  enthusiasts. We believe that everyone deserves access to high-quality, stylish 
                  clothing and accessories that make them feel confident and comfortable.
                </p>
              </div>

              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
                <p className="text-lg text-gray-500">
                  We strive to provide our customers with carefully curated collections that blend 
                  timeless elegance with contemporary trends. Our commitment to quality, sustainability, 
                  and customer satisfaction drives everything we do.
                </p>
              </div>
            </div>

            <div className="mt-16">
              <h2 className="text-3xl font-bold text-gray-900 text-center">Our Values</h2>
              <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900">Quality</h3>
                  <p className="mt-4 text-gray-500">
                    We source only the finest materials and partner with trusted manufacturers to ensure 
                    premium quality in every product.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900">Sustainability</h3>
                  <p className="mt-4 text-gray-500">
                    We're committed to reducing our environmental impact through eco-friendly practices 
                    and sustainable sourcing.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900">Customer Focus</h3>
                  <p className="mt-4 text-gray-500">
                    Your satisfaction is our priority. We're dedicated to providing exceptional service 
                    and support at every step.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;