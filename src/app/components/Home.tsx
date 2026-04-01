import { Link } from 'react-router';
import { ArrowRight, Clock, Shield, Sparkles, Heart, Star } from 'lucide-react';
import bannerImage from "../../assets/main.png";

export function Home() {
  const features = [
    {
      icon: Sparkles,
      title: 'Authentic Flavors',
      description: 'Traditional Ghanaian recipes passed down through generations',
      color: 'from-[#7d3d2b] to-[#5a2a1e]',
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
      <section className="relative overflow-hidden bg-gradient-to-br from-[#7d3d2b] via-[#6a3424] to-[#5a2a1e]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-block mb-6">
              <span className="bg-[#ffd700]/20 backdrop-blur-sm text-[#ffd700] px-4 py-2 rounded-full text-sm font-semibold">
                🍛 Accra's Favorite Food Spot
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl mb-6 text-white font-black leading-tight">
              Welcome to
              <span className="block mt-2 text-[#ffd700]">
                Gobɛ Hemaa
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-[#ffd700] mb-4 font-medium italic">
              ...the life saver
            </p>
            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              Experience authentic Ghanaian cuisine delivered fresh to your doorstep. 
              Delicious, affordable, and made with love.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/menu"
                className="group inline-flex items-center justify-center bg-[#ffd700] text-[#7d3d2b] px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all shadow-2xl"
              >
                View Menu
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/order"
                className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm border-2 border-[#ffd700] text-[#ffd700] px-8 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all"
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

      {/* Banner Image Section */}
      <section className="py-16 bg-gradient-to-br from-amber-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src={bannerImage} 
              alt="Gobɛ Hemaa - Authentic Ghanaian Food" 
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
              <div className="p-8 text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">Fresh. Authentic. Delicious.</h2>
                <p className="text-lg text-white/90">Made daily with the finest ingredients</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4 font-black text-[#7d3d2b]">
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
      <section className="py-20 bg-gradient-to-br from-[#7d3d2b] via-[#6a3424] to-[#5a2a1e]">
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
              { name: 'Gobɛ Special', price: '35', description: 'Beans with ripe plantain', rating: 5 },
              { name: 'Jollof Rice', price: '30', description: 'With your choice of protein', rating: 5 },
              { name: 'Fried Rice', price: '30', description: 'Served with chicken or fish', rating: 5 },
            ].map((item, index) => (
              <div
                key={index}
                className="group bg-white/10 backdrop-blur-lg rounded-3xl p-8 hover:bg-white/20 transition-all hover:scale-105 border border-white/20"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-[#ffd700] text-[#ffd700]" />
                  ))}
                </div>
                <h3 className="text-3xl font-bold mb-2 text-white">{item.name}</h3>
                <p className="text-4xl mb-4 font-black text-[#ffd700]">GH₵ {item.price}</p>
                <p className="text-white/90 text-lg">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/menu"
              className="inline-flex items-center bg-[#ffd700] text-[#7d3d2b] px-10 py-4 rounded-2xl font-bold hover:scale-105 transition-all shadow-2xl text-lg"
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
          <h2 className="text-4xl md:text-5xl mb-6 font-black text-[#7d3d2b]">
            Ready to Experience the Life Saver?
          </h2>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            Order now and let us deliver delicious, nutritious meals right to your doorstep.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/order"
              className="inline-flex items-center justify-center bg-[#7d3d2b] text-[#ffd700] px-10 py-4 rounded-2xl font-bold hover:shadow-xl transition-all text-lg"
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
