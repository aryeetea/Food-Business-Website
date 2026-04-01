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
    { id: 'gobe', name: 'Gobɛ Special', emoji: '⭐' },
    { id: 'rice', name: 'Rice Dishes', emoji: '🍚' },
    { id: 'proteins', name: 'Proteins', emoji: '🍗' },
    { id: 'extras', name: 'Extras', emoji: '🥑' },
  ];

  const menuItems: MenuItemType[] = [
    // Gobɛ Special
    { id: '5', name: 'Gobɛ Special', price: 35, category: 'gobe', description: 'Beans with ripe plantain (our signature dish!)' },
    { id: '6', name: 'Gobɛ with Gari', price: 30, category: 'gobe', description: 'Beans with gari and plantain' },
    { id: '7', name: 'Red Red', price: 30, category: 'gobe', description: 'Bean stew with fried plantain' },
    
    // Rice Dishes
    { id: '1', name: 'Jollof Rice', price: 30, category: 'rice', description: 'Classic Ghanaian jollof rice' },
    { id: '2', name: 'Fried Rice', price: 30, category: 'rice', description: 'Delicious fried rice with vegetables' },
    { id: '3', name: 'Plain Rice', price: 15, category: 'rice', description: 'Steamed white rice' },
    { id: '4', name: 'Waakye', price: 25, category: 'rice', description: 'Rice and beans cooked together' },
    
    // Proteins
    { id: '8', name: 'Fried Chicken', price: 25, category: 'proteins', description: 'Crispy fried chicken' },
    { id: '9', name: 'Grilled Chicken', price: 30, category: 'proteins', description: 'Marinated grilled chicken' },
    { id: '10', name: 'Fried Fish', price: 30, category: 'proteins', description: 'Seasoned fried fish' },
    { id: '11', name: 'Grilled Fish', price: 35, category: 'proteins', description: 'Grilled tilapia' },
    { id: '12', name: 'Gizzard', price: 25, category: 'proteins', description: 'Seasoned chicken gizzard' },
    { id: '13', name: 'Boiled Eggs', price: 5, category: 'proteins', description: 'Hard boiled eggs (2 pieces)' },
    { id: '14', name: 'Sausage', price: 10, category: 'proteins', description: 'Grilled sausage' },
    
    // Extras
    { id: '15', name: 'Fried Plantain', price: 10, category: 'extras', description: 'Ripe plantain slices' },
    { id: '16', name: 'Avocado', price: 10, category: 'extras', description: 'Fresh sliced avocado' },
    { id: '17', name: 'Salad', price: 15, category: 'extras', description: 'Fresh vegetable salad' },
    { id: '18', name: 'Shito (Pepper Sauce)', price: 5, category: 'extras', description: 'Spicy Ghanaian pepper sauce' },
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
      <div className="relative bg-gradient-to-br from-[#7d3d2b] via-[#6a3424] to-[#5a2a1e] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-4">
            <span className="bg-[#ffd700]/20 backdrop-blur-sm text-[#ffd700] px-4 py-2 rounded-full text-sm font-semibold">
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
                    ? 'bg-[#7d3d2b] text-[#ffd700] shadow-lg scale-105'
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
            <h2 className="text-2xl font-bold text-orange-900 mb-2">Our Signature Dishes</h2>
            <p className="text-orange-700">The authentic gobɛ that made us famous!</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border border-gray-100 hover:-translate-y-1"
            >
              <div className="bg-gradient-to-br from-[#7d3d2b] to-[#5a2a1e] h-3"></div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-800 group-hover:text-[#7d3d2b] transition-colors">
                    {item.name}
                  </h3>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">from</div>
                    <div className="text-3xl font-black text-[#7d3d2b]">
                      ₵{item.price}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">{item.description}</p>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="w-full bg-[#7d3d2b] text-[#ffd700] py-4 rounded-2xl font-bold hover:shadow-xl transition-all flex items-center justify-center space-x-2 group-hover:scale-105"
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