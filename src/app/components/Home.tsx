import { Link } from 'react-router';
import { ArrowRight, Clock, Shield, Sparkles, Heart, Star } from 'lucide-react';
import homeFoodCollage from '../../assets/home-food-collage.png';

export function Home() {
  const features = [
    {
      icon: Sparkles,
      title: 'Authentic Flavors',
      description: 'Traditional Ghanaian recipes passed down through generations',
      color: 'from-[#de6f12] to-[#b85600]',
    },
    {
      icon: Shield,
      title: 'Quality Assured',
      description: 'Fresh ingredients, prepared with highest hygiene standards',
      color: 'from-green-600 to-emerald-700',
    },
    {
      icon: Clock,
      title: 'Fast Delivery',
      description: 'Quick and reliable delivery across Accra',
      color: 'from-blue-600 to-cyan-700',
    },
    {
      icon: Heart,
      title: 'Made with Love',
      description: 'Every meal prepared with care and passion',
      color: 'from-pink-600 to-rose-700',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#de6f12] via-[#c95f09] to-[#a94900]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-block mb-6">
              <span className="bg-white/18 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">
                🍛 Accra's Favorite Food Spot
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl mb-6 text-white font-black leading-tight">
              Welcome to
              <span className="block mt-2 text-white/95">
                Gobɛ Hemaa
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-white/90 mb-4 font-medium italic">
              ...eat local, feel royal
            </p>
            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              Experience authentic Ghanaian cuisine delivered fresh to your doorstep. 
              Delicious, affordable, and made with love.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/menu"
                className="group inline-flex items-center justify-center bg-white text-[#de6f12] px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all shadow-2xl"
              >
                View Menu
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/order"
                className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm border-2 border-white/70 text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all"
              >
                Order Now
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-12 md:h-20">
            <path fill="#fffbeb" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Brand Showcase Section */}
      <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl rounded-[2rem] border-[10px] border-[#2f2b24] bg-[linear-gradient(180deg,#fff8eb,#f6edd9)] p-3 shadow-[0_24px_60px_rgba(47,43,36,0.2)]">
            <div className="overflow-hidden rounded-[1.5rem] ring-1 ring-orange-200/70">
              <img
                src={homeFoodCollage}
                alt="Gobɛ Hemaa food collage featuring beans, eggs, gizzard, avocado, plantain, and rice"
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4 font-black text-[#de6f12]">
              Why Choose Us?
            </h2>
            <p className="text-xl text-gray-600">
              Fast-growing indigenous food business you can trust
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl mb-6 shadow-lg`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Items Section */}
      <section className="py-20 bg-gradient-to-br from-[#de6f12] via-[#c95f09] to-[#a94900]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4 text-white font-black">
              Fan Favorites
            </h2>
            <p className="text-xl text-white/90">
              Customer favorites that keep them coming back
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Gobe Combo', price: '35', details: ['Beans', 'Plantain', 'Chilli', 'Egg', 'Sausage', 'Garnished oil'], rating: 5 },
              { name: 'Special Gobe Combo', price: '45', details: ['Beans', 'Assorted mix', 'Plantain', 'Egg', 'Sausage', 'Garnished oil'], rating: 5 },
              { name: 'Assorted Jollof rice', price: '80', details: ['Assorted Jollof rice'], rating: 5 },
            ].map((item, index) => (
              <div
                key={index}
                className="group bg-white/10 backdrop-blur-lg rounded-3xl p-8 hover:bg-white/20 transition-all hover:scale-105 border border-white/20"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-white text-white" />
                  ))}
                </div>
                <h3 className="text-3xl font-bold mb-2 text-white">{item.name}</h3>
                <p className="text-4xl mb-4 font-black text-white">GH₵ {item.price}</p>
                <ul className="space-y-2 text-white/90 text-lg">
                  {item.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-2">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-white"></span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/menu"
              className="inline-flex items-center bg-white text-[#de6f12] px-10 py-4 rounded-2xl font-bold hover:scale-105 transition-all shadow-2xl text-lg"
            >
              See Full Menu
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl mb-6 font-black text-[#de6f12]">
            Ready to experience royalty in a local dish?
          </h2>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            Order now and let us deliver delicious, nutritious meals right to your doorstep.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/order"
              className="inline-flex items-center justify-center bg-[#de6f12] text-white px-10 py-4 rounded-2xl font-bold hover:shadow-xl transition-all text-lg"
            >
              Order Now
            </Link>
            <a
              href="https://wa.me/233553312217"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[#25D366] text-white px-10 py-4 rounded-2xl font-bold hover:shadow-xl transition-all text-lg"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
