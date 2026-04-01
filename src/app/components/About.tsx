import { Heart, Target, Users, Award } from 'lucide-react';

export function About() {
  const values = [
    {
      icon: Heart,
      title: 'Quality & Hygiene',
      description: 'We maintain the highest standards of food preparation and hygiene in all our operations.',
    },
    {
      icon: Target,
      title: 'Affordability',
      description: 'Delicious, nutritious meals at prices that won\'t break the bank for students and workers.',
    },
    {
      icon: Users,
      title: 'Community Focus',
      description: 'Dedicated to serving students, workers, and residents throughout Accra with care.',
    },
    {
      icon: Award,
      title: 'Traditional Excellence',
      description: 'Authentic Ghanaian recipes prepared with passion and expertise.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#7d3d2b] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl mb-4">
            About <span className="text-[#ffd700]">Gobɛ Hemaa</span>
          </h1>
          <p className="text-xl text-white/80">...the life saver</p>
        </div>
      </div>

      {/* Main Story */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl mb-6 text-[#7d3d2b]">Our Story</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Gobɛ Hemaa is a traditional fast-growing indigenous food business dedicated to providing 
              <strong> healthy, hygienic, affordable, and delicious</strong> gobɛ (beans and ripe plantain) 
              and some assorted dishes to students, workers, and residents within Accra.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The business seeks to serve high-quality, nutritious meals in a clean and customer-friendly 
              environment. We understand the importance of good food in maintaining energy and health, 
              which is why we've earned the name <strong>"the life saver"</strong> among our loyal customers.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our signature dish, gobɛ (beans with ripe plantain), is prepared fresh daily using 
              traditional recipes passed down through generations. Combined with modern hygiene standards 
              and efficient delivery service, we bring authentic Ghanaian flavors right to your doorstep.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-4 text-[#7d3d2b]">Our Values</h2>
            <p className="text-lg text-gray-600">
              What makes Gobɛ Hemaa special
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#7d3d2b] text-[#ffd700] rounded-lg flex items-center justify-center">
                      <value.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl mb-2 text-[#7d3d2b]">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Serve */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl mb-8 text-center text-[#7d3d2b]">
            What We Serve
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-[#7d3d2b] to-[#5a2b1d] text-white p-8 rounded-xl">
              <h3 className="text-2xl mb-4 text-[#ffd700]">Gobɛ Specials</h3>
              <ul className="space-y-2 text-white/90">
                <li>• Traditional gobɛ (beans & ripe plantain)</li>
                <li>• Gobɛ with gari</li>
                <li>• Red red with plantain</li>
                <li>• Custom combinations available</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-[#7d3d2b] to-[#5a2b1d] text-white p-8 rounded-xl">
              <h3 className="text-2xl mb-4 text-[#ffd700]">Rice Dishes & More</h3>
              <ul className="space-y-2 text-white/90">
                <li>• Jollof rice</li>
                <li>• Fried rice</li>
                <li>• Waakye</li>
                <li>• Various proteins and sides</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20 bg-gradient-to-br from-[#7d3d2b] to-[#5a2b1d] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl mb-6 text-[#ffd700]">
            Serving Accra with Pride
          </h2>
          <p className="text-xl text-white/90 mb-8">
            We proudly serve students, workers, and residents across Accra, delivering fresh, 
            delicious meals straight to your doorstep. Whether you're at the office, campus, 
            or home, Gobɛ Hemaa is here to save the day!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/233553312217"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#25D366] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#20BD5A] transition-colors"
            >
              Order on WhatsApp
            </a>
            <a
              href="tel:0505647668"
              className="inline-block bg-[#ffd700] text-[#7d3d2b] px-8 py-3 rounded-lg font-semibold hover:bg-[#ffed4e] transition-colors"
            >
              Call Us Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
