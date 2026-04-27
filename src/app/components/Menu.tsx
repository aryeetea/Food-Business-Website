import { useState } from 'react';
import { Plus, Sparkles } from 'lucide-react';
import { useCart, MenuItem as MenuItemType } from './CartContext';
import { toast } from 'sonner';
import { Toaster } from './ui/sonner';

export function Menu() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { addItem } = useCart();

  const categories = [
    { id: 'all', name: 'All Items', emoji: '🍽️' },
    { id: 'gobe', name: 'Gobe Combos', emoji: '⭐' },
    { id: 'rice', name: 'Rice Dishes', emoji: '🍚' },
    { id: 'extras', name: 'Extras', emoji: '🥑' },
  ];

  const menuItems: MenuItemType[] = [
    // Gobe Combos
    { id: '1', name: 'Gobe Combo', price: 35, category: 'gobe', description: 'Beans/plantain/chilli/egg/sausage/garnished oil' },
    { id: '2', name: 'Special Gobe Combo', price: 45, category: 'gobe', description: 'Beans/assorted mix/plantain/egg/sausage/garnished oil' },

    // Rice Dishes
    { id: '3', name: 'Assorted Jollof rice', price: 80, category: 'rice', description: 'Assorted Jollof rice' },
    { id: '4', name: 'Assorted Fried rice', price: 80, category: 'rice', description: 'Assorted Fried rice' },

    // Extras
    { id: '5', name: 'Beans', price: 10, category: 'extras', description: 'Extra beans' },
    { id: '6', name: 'Rice', price: 5, category: 'extras', description: 'Per scoop' },
    { id: '7', name: 'Plantain', price: 2, category: 'extras', description: 'Extra plantain' },
    { id: '8', name: 'Egg', price: 3.5, category: 'extras', description: 'Extra egg' },
    { id: '9', name: 'Gizzard', price: 5, category: 'extras', description: 'Extra gizzard' },
    { id: '10', name: 'Sausage', price: 3.5, category: 'extras', description: 'Extra sausage' },
    { id: '11', name: 'Avocado', price: 5, category: 'extras', description: 'Per cut or slice' },
    { id: '12', name: 'Chilli Pepper', price: 3, category: 'extras', description: 'Extra chilli pepper' },
    { id: '13', name: 'Coconut Oil', price: 5, category: 'extras', description: 'Extra coconut oil' },
    { id: '14', name: 'Shito', price: 5, category: 'extras', description: 'Extra shito' },
  ];

  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const handleAddToCart = (item: MenuItemType) => {
    addItem(item);
    toast.success(`${item.name} added to cart!`, {
      icon: '✅',
    });
  };

  return (
    <div className="min-h-screen">
      <Toaster position="top-center" />
      
      {/* Header */}
      <div className="relative bg-gradient-to-br from-[#de6f12] via-[#c95f09] to-[#a94900] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-4">
            <span className="bg-white/15 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">
              🍽️ Our Delicious Menu
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl mb-4 font-black">Our Menu</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Delicious, affordable, and nutritious meals prepared fresh daily
          </p>
        </div>
      </div>

      {/* Category Filters */}
      <div className="bg-white border-b border-gray-200 sticky top-20 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto py-4 space-x-3 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl whitespace-nowrap transition-all font-semibold ${
                  selectedCategory === category.id
                    ? 'bg-[#de6f12] text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{category.emoji}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {selectedCategory === 'gobe' && (
          <div className="mb-12 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-orange-200 rounded-3xl p-8 text-center">
            <Sparkles className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-orange-900 mb-2">Our Gobe Combos</h2>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border border-gray-100 hover:-translate-y-1"
            >
              <div className="bg-gradient-to-br from-[#de6f12] to-[#b85600] h-3"></div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-800 group-hover:text-[#de6f12] transition-colors">
                    {item.name}
                  </h3>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">from</div>
                    <div className="text-3xl font-black text-[#de6f12]">
                      ₵{item.price}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">{item.description}</p>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="w-full bg-[#de6f12] text-white py-4 rounded-2xl font-bold hover:shadow-xl transition-all flex items-center justify-center space-x-2 group-hover:scale-105"
                >
                  <Plus className="h-5 w-5" />
                  <span>Add to Order</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">No items found in this category.</p>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl mb-4 font-bold">
            Can't find what you're looking for?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Contact us directly for custom orders or special requests
          </p>
          <a
            href="https://wa.me/233553312217"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#25D366] text-white px-10 py-4 rounded-2xl font-bold hover:shadow-xl transition-all text-lg"
          >
            WhatsApp Us
          </a>
        </div>
      </div>
    </div>
  );
}
